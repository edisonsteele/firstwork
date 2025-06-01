import { Play, Award, Clock, Heart, Star, CheckCircle, Check } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero section - Full viewport height */}
      <div className="h-screen relative isolate overflow-hidden bg-gradient-to-b from-primary/20">
        <div className="h-full flex items-center">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Work-Based Learning Management System
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A comprehensive platform for managing work-based learning programs, tracking student progress, and facilitating meaningful educational experiences.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/pricing"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Get started
                </Link>
                <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Learning Management
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides all the tools you need to manage work-based learning programs effectively.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Play className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                Interactive Learning
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Engage students with interactive learning experiences and real-time progress tracking.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Award className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                Achievement Tracking
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Monitor and celebrate student achievements with our comprehensive tracking system.</p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Clock className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                Time Management
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">Efficiently manage work sessions and track time spent on learning activities.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Testimonial section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by educators worldwide
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join thousands of educators who are transforming their work-based learning programs with our platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/pricing"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Pricing section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Start with a single device or scale up as you grow. Bulk pricing available for teams.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Pricing Plans */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center gap-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">One Student</h3>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$12.99</p>
              <p className="mt-1 text-sm text-gray-500">per month</p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">1 student</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Email support</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center gap-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Small Class</h3>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$19.99</p>
              <p className="mt-1 text-sm text-gray-500">per month</p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">5 devices</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Priority support</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center gap-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Full Class</h3>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">$79.99</p>
              <p className="mt-1 text-sm text-gray-500">per month</p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">20 devices</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Priority support</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all hover:shadow-xl">
              <div className="flex items-center gap-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Enterprise</h3>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Custom</p>
              <p className="mt-1 text-sm text-gray-500">per month</p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">100+ devices</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Core features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none text-primary" />
                  <span className="text-sm text-gray-600">Priority support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Free Trial Card */}
          <div className="flex flex-col justify-center">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-lg">
              <div className="flex items-center gap-x-4">
                <div className="rounded-full bg-white/10 p-2">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold leading-8">Free Trial</h3>
              </div>
              <p className="mt-4 text-3xl font-bold">14 Days</p>
              <p className="mt-1 text-sm text-white/80">No credit card</p>
              <ul className="mt-6 space-y-3">
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none" />
                  <span className="text-sm">All features</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none" />
                  <span className="text-sm">Cancel anytime</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-5 w-5 flex-none" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <Link
                href="/pricing"
                className="mt-8 block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-primary shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View all plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 