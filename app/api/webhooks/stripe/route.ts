import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const { userId, referrerId } = session.metadata || {}

        if (!userId) {
          throw new Error('No user ID in session metadata')
        }

        // Create purchase record
        const { data: purchase, error: purchaseError } = await supabase
          .from('purchases')
          .insert([
            {
              user_id: userId,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              plan: 'single', // You might want to determine this based on the price ID
              quantity: session.metadata?.quantity || 1,
              status: 'active',
              created_at: new Date().toISOString(),
            }
          ])
          .select()
          .single()

        if (purchaseError) throw purchaseError

        // If there's a referrer, create referral record
        if (referrerId) {
          const { error: referralError } = await supabase
            .from('referrals')
            .insert([
              {
                referrer_id: referrerId,
                referred_email: session.customer_email,
                purchase_id: purchase.id,
                status: 'completed',
                created_at: new Date().toISOString(),
                completed_at: new Date().toISOString(),
                reward_claimed: false,
                reward_type: 'access_token',
                reward_value: 1,
              }
            ])

          if (referralError) throw referralError
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        // Update purchase status
        const { error: updateError } = await supabase
          .from('purchases')
          .update({
            status: 'cancelled',
            expires_at: new Date(subscription.cancel_at! * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (updateError) throw updateError
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
} 