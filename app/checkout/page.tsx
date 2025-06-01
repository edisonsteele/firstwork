'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const plans = [
  {
    id: 'price_single',
    name: 'Single Device',
    price: 12.99,
    description: 'Perfect for individual use',
    features: ['1 device access', 'Basic features', 'Email support'],
  },
  {
    id: 'price_small',
    name: 'Small Group',
    price: 19.99,
    description: 'Ideal for small groups',
    features: ['5 device access', 'All features', 'Priority support'],
  },
  {
    id: 'price_medium',
    name: 'Medium Group',
    price: 79.99,
    description: 'Great for medium-sized groups',
    features: ['25 device access', 'All features', 'Priority support', 'Custom branding'],
  },
  {
    id: 'price_large',
    name: 'Large Group',
    price: 299.99,
    description: 'Perfect for large organizations',
    features: ['100 device access', 'All features', '24/7 support', 'Custom branding', 'API access'],
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(plans[0])

  const handleCheckout = async (priceId: string) => {
    try {
      setLoading(true)

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: session.user.id,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise
      
      if (!stripe) throw new Error('Stripe failed to initialize')

      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) throw error

    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Select the plan that best fits your needs. All plans include access to our core features.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 ${
                selectedPlan.id === plan.id ? 'bg-primary/5 ring-primary' : ''
              }`}
            >
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                {plan.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-sm font-semibold leading-6 text-gray-600">
                  /month
                </span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading}
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  selectedPlan.id === plan.id
                    ? 'bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary'
                    : 'bg-white text-primary ring-1 ring-inset ring-primary hover:ring-primary/90'
                }`}
              >
                {loading ? 'Processing...' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 