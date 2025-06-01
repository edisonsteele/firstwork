import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function POST(request: Request) {
  try {
    const { studentId, referralCode } = await request.json()

    // Get the current user
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate the referral code
    const { data: referrer } = await supabase
      .from('users')
      .select('id')
      .eq('id', referralCode)
      .single()

    if (!referrer) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 400 }
      )
    }

    // Update student preferences with the referral code
    const { error: updateError } = await supabase
      .from('students')
      .update({
        preferences: {
          referral_code: referralCode,
        },
      })
      .eq('id', studentId)

    if (updateError) throw updateError

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Error applying referral code:', error)
    return NextResponse.json(
      { error: 'Failed to apply referral code' },
      { status: 500 }
    )
  }
} 