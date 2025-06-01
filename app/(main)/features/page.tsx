import { Play, Award, Clock, Users, BarChart, Calendar, Shield, BookOpen, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Powerful Features for Modern Learning
            </h1>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Our comprehensive suite of tools helps educators manage work-based learning programs effectively and helps students achieve their full potential.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-6 sm:p-8 lg:flex-auto">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">Core Features</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Everything you need to manage and enhance your work-based learning program.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex gap-x-4">
                <Play className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Interactive Learning</h3>
                  <p className="mt-1 text-sm text-gray-600">Engage students with interactive learning experiences and real-time progress tracking.</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <Award className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Achievement Tracking</h3>
                  <p className="mt-1 text-sm text-gray-600">Monitor and celebrate student achievements with our comprehensive tracking system.</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <Clock className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Time Management</h3>
                  <p className="mt-1 text-sm text-gray-600">Efficiently manage work sessions and track time spent on learning activities.</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <Users className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Student Management</h3>
                  <p className="mt-1 text-sm text-gray-600">Comprehensive tools for managing student profiles, progress, and performance.</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <BarChart className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Analytics Dashboard</h3>
                  <p className="mt-1 text-sm text-gray-600">Powerful analytics and reporting tools to track program effectiveness.</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <Calendar className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Scheduling Tools</h3>
                  <p className="mt-1 text-sm text-gray-600">Intuitive scheduling tools for managing work sessions and activities.</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <Shield className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Security & Compliance</h3>
                  <p className="mt-1 text-sm text-gray-600">Enterprise-grade security and compliance features to protect student data.</p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <BookOpen className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Resource Library</h3>
                  <p className="mt-1 text-sm text-gray-600">Access to a comprehensive library of learning resources and templates.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-8 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center">
              <div className="mx-auto max-w-xs px-8 flex flex-col justify-center h-full">
                <h3 className="text-sm font-semibold text-gray-900">Additional Benefits</h3>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>• 24/7 Technical Support</p>
                  <p>• Regular Updates & Improvements</p>
                  <p>• Custom Integration Options</p>
                  <p>• Training & Onboarding</p>
                </div>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  All features included in our standard subscription
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-12 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-xl font-bold tracking-tight text-white sm:text-2xl">
            Ready to transform your learning program?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-300">
            Join thousands of educators who are already using our platform to enhance their work-based learning programs.
          </p>
          <div className="mt-6 flex items-center justify-center gap-x-4">
            <Link
              href="/pricing"
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View pricing
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