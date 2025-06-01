'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { Check } from 'lucide-react'

export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [referralCode, setReferralCode] = useState('')

  const handleCheckout = async (priceId: string, quantity: number) => {
    try {
      setLoading(true)

      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          quantity,
          referralCode: referralCode.trim() || undefined,
        }),
      })

      const { url } = await response.json()
      if (url) {
        router.push(url)
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
          {/* One Student Plan */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-gray-900">One Student</h2>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$12.99</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>1 student</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Email support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="mt-8 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started today
            </Link>
          </div>

          {/* Small Class Plan */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-gray-900">Small Class</h2>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$19.99</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>5 devices</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="mt-8 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started today
            </Link>
          </div>

          {/* Full Class Plan */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-gray-900">Full Class</h2>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$79.99</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>20 devices</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="mt-8 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started today
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-gray-900">Enterprise</h2>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">Custom</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>100+ devices</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Contact sales
            </Link>
          </div>

          {/* Free Trial Card */}
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 ring-1 ring-primary/10 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-white">Free Trial</h2>
              </div>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">14 Days</span>
              </p>
              <p className="mt-1 text-sm text-white/80">No credit card</p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-white/90">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                  <span>All features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                  <span>Cancel anytime</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                  <span>Email support</span>
                </li>
              </ul>
            </div>
            <Link
              href="/signup"
              className="mt-8 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start free trial
            </Link>
          </div>

          {/* Referral Program */}
          <div className="flex flex-col justify-between rounded-3xl bg-primary p-8 ring-1 ring-primary/10 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-white">Referral Program</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/90">Earn rewards by referring others to our platform.</p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-white/90">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                  <span>Earn rewards for each referral</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                  <span>Exclusive benefits for referrers</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                  <span>No limit on referrals</span>
                </li>
              </ul>
            </div>
            <Link
              href="/referral"
              className="mt-8 block rounded-md bg-white px-3 py-2 text-center text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-xl font-bold tracking-tight text-white sm:text-2xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-300">
            Join thousands of educators who are already using our platform to enhance their work-based learning programs.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <Link
              href="/signup"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start free trial
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
              Contact sales <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 