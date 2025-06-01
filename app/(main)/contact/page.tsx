import Link from 'next/link'
import { Mail, Phone, Building2 } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Get in touch
            </h1>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Have questions about our platform? We're here to help. Reach out to our team for support or sales inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-6 sm:p-8 lg:flex-auto lg:flex lg:flex-col lg:justify-center">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Contact Information</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Choose the best way to reach us based on your needs.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex gap-x-4">
                <Mail className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Email Support</h3>
                  <p className="mt-1 text-sm text-gray-600">support@tms.com</p>
                  <p className="mt-1 text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <Phone className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Phone Support</h3>
                  <p className="mt-1 text-sm text-gray-600">+1 (555) 123-4567</p>
                  <p className="mt-1 text-sm text-gray-600">Mon-Fri, 9am-5pm EST</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <Building2 className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Office Location</h3>
                  <p className="mt-1 text-sm text-gray-600">123 Education St</p>
                  <p className="mt-1 text-sm text-gray-600">New York, NY 10001</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="h-5 w-5 flex-none" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Business Hours</h3>
                  <p className="mt-1 text-sm text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                  <p className="mt-1 text-sm text-gray-600">Saturday - Sunday: Closed</p>
                  <p className="mt-1 text-xs text-gray-600">
                    For urgent matters outside business hours, please email support@tms.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-16 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:items-center">
              <div className="mx-auto max-w-xs px-8">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Get Started Today</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Join thousands of educators who are already using our platform.
                </p>
                <div className="mt-6">
                  <Link
                    href="/signup"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Start free trial
                  </Link>
                </div>
              </div>
            </div>
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
            <Link href="/pricing" className="text-sm font-semibold leading-6 text-white">
              View pricing <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 