'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function VerifyPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Check your email
            </h1>
            <p className="mt-2 text-base leading-7 text-gray-600">
              We've sent you a verification link. Please check your email to complete your registration.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl bg-gray-50 py-8 text-center ring-1 ring-inset ring-gray-900/5">
            <div className="mx-auto max-w-xs px-8">
              <Mail className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold tracking-tight text-gray-900">Verify your email</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                We've sent a verification link to your email address. Please click the link to complete your registration.
              </p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Return to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 