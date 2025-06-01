import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: Request) {
  try {
    const { referralId } = await request.json()

    // Get the referral
    const { data: referral, error: referralError } = await supabase
      .from('referrals')
      .select('*')
      .eq('id', referralId)
      .single()

    if (referralError || !referral) {
      return NextResponse.json(
        { error: 'Referral not found' },
        { status: 404 }
      )
    }

    if (referral.reward_claimed) {
      return NextResponse.json(
        { error: 'Reward already claimed' },
        { status: 400 }
      )
    }

    if (referral.status !== 'completed') {
      return NextResponse.json(
        { error: 'Referral not completed' },
        { status: 400 }
      )
    }

    // Start a transaction
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create reward based on type
    let rewardData
    if (referral.reward_type === 'access_token') {
      // Create access token
      const { data: token, error: tokenError } = await supabase
        .from('access_tokens')
        .insert([
          {
            status: 'active',
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
          }
        ])
        .select()
        .single()

      if (tokenError) throw tokenError

      rewardData = {
        referral_id: referralId,
        type: 'access_token',
        value: 1,
        status: 'claimed',
        created_at: new Date().toISOString(),
        claimed_at: new Date().toISOString(),
      }
    } else if (referral.reward_type === 'subscription_discount') {
      rewardData = {
        referral_id: referralId,
        type: 'subscription_discount',
        value: referral.reward_value || 10, // Default 10% discount
        status: 'claimed',
        created_at: new Date().toISOString(),
        claimed_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      }
    }

    // Create reward record
    const { error: rewardError } = await supabase
      .from('referral_rewards')
      .insert([rewardData])

    if (rewardError) throw rewardError

    // Update referral status
    const { error: updateError } = await supabase
      .from('referrals')
      .update({
        reward_claimed: true,
      })
      .eq('id', referralId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
      reward: rewardData,
    })
  } catch (error) {
    console.error('Error claiming reward:', error)
    return NextResponse.json(
      { error: 'Failed to claim reward' },
      { status: 500 }
    )
  }
} 