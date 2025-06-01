'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  items: FAQItem[]
}

const faqData: FAQCategory[] = [
  {
    title: 'General Overview',
    items: [
      {
        question: 'What is FirstWork, and how can it benefit ABA professionals?',
        answer: 'FirstWork is a comprehensive DTT (Discrete Trial Training) platform designed specifically for ABA professionals. It streamlines your workflow, enhances data collection, and provides customizable tools to create effective learning programs for your clients.',
      },
      {
        question: 'How is FirstWork different from other DTT platforms?',
        answer: 'FirstWork stands out with its intuitive interface, comprehensive data collection capabilities, and flexible customization options. Our platform is specifically designed for ABA professionals, with features that support both individual and team-based interventions.',
      },
    ],
  },
  {
    title: 'Features & Functionality',
    items: [
      {
        question: 'How can FirstWork improve my workflow as a BCBA?',
        answer: 'FirstWork streamlines your workflow by providing easy-to-use tools for program creation, data collection, and progress tracking. You can quickly customize lessons, monitor client progress, and generate reports to inform your clinical decisions.',
      },
      {
        question: 'What types of materials and resources are included in FirstWork?',
        answer: 'FirstWork includes a comprehensive library of pre-made programs, customizable templates, and a variety of visual materials. You can also upload your own images and create custom content to meet your specific needs.',
      },
      {
        question: 'Does FirstWork support data collection? If so, how?',
        answer: 'Yes, FirstWork includes robust data collection features. You can track client responses, measure progress over time, and generate detailed reports. The platform supports various data collection methods to suit your specific needs.',
      },
      {
        question: 'Can I customize lesson plans or upload my own images?',
        answer: 'Absolutely! FirstWork allows you to customize existing lesson plans or create new ones from scratch. You can upload your own images, create custom prompts, and tailor programs to meet individual client needs.',
      },
      {
        question: 'Can I save custom DTT programs for repeated use?',
        answer: 'Yes, you can save and reuse custom DTT programs. This feature helps you maintain consistency across sessions and saves time when working with multiple clients.',
      },
      {
        question: 'What learning goals does FirstWork support?',
        answer: 'FirstWork supports a wide range of learning goals across various domains, including communication, social skills, academic skills, and daily living skills. The platform is flexible enough to accommodate both basic and advanced learning objectives.',
      },
      {
        question: 'How does FirstWork\'s focus feature work?',
        answer: 'The focus feature helps maintain client attention by providing a clean, distraction-free interface. It allows you to highlight specific elements and minimize visual clutter during sessions.',
      },
      {
        question: 'How does the reinforcement feature work?',
        answer: 'FirstWork includes customizable reinforcement options that can be tailored to individual client preferences. You can set up various types of reinforcement schedules and track their effectiveness.',
      },
    ],
  },
  {
    title: 'Team & Parent Use',
    items: [
      {
        question: 'Can FirstWork be used collaboratively by teams (e.g., RBTs, BCBAs)?',
        answer: 'Yes, FirstWork is designed for team collaboration. Multiple team members can access and contribute to client programs, share notes, and coordinate interventions effectively.',
      },
      {
        question: 'Can multiple users access the same account?',
        answer: 'Yes, FirstWork supports multiple users per account, making it ideal for teams. Each user can have their own login while maintaining access to shared resources and client information.',
      },
      {
        question: 'Is FirstWork suitable for parents? How can families access it?',
        answer: 'Yes, FirstWork is designed to be user-friendly for parents and families. They can access the platform through their own accounts, view progress reports, and participate in their child\'s learning journey.',
      },
    ],
  },
  {
    title: 'Integration & Data Management',
    items: [
      {
        question: 'Does FirstWork integrate with other ABA or educational platforms?',
        answer: 'FirstWork is designed to work seamlessly with other platforms. We offer various integration options to ensure smooth data flow and compatibility with your existing tools.',
      },
      {
        question: 'Can I import/export data or lesson plans into or out of FirstWork?',
        answer: 'Yes, FirstWork supports importing and exporting data and lesson plans. This allows you to maintain continuity with existing programs and share resources across different platforms.',
      },
    ],
  },
  {
    title: 'Access & Devices',
    items: [
      {
        question: 'Is FirstWork available on all mobile devices (iOS/Android)?',
        answer: 'Yes, FirstWork is accessible on both iOS and Android devices, as well as desktop computers. This ensures you can use the platform wherever and whenever you need it.',
      },
      {
        question: 'How many devices can I use with a single subscription?',
        answer: 'The number of devices depends on your subscription plan. We offer various options to accommodate different needs, from individual practitioners to large organizations.',
      },
    ],
  },
  {
    title: 'Pricing & Trials',
    items: [
      {
        question: 'What is FirstWork\'s pricing structure?',
        answer: 'FirstWork offers flexible pricing plans to suit different needs. We have options for individual practitioners, small teams, and large organizations. Please visit our pricing page for detailed information.',
      },
      {
        question: 'Are there discounts for schools, clinics, or large organizations?',
        answer: 'Yes, we offer special pricing for educational institutions, clinics, and organizations. Contact our sales team to learn more about our group and institutional pricing options.',
      },
      {
        question: 'Can I change my pricing plan after signing up?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
      },
      {
        question: 'How do I start a free trial? Is it full access?',
        answer: 'Starting a free trial is easy! Simply sign up on our website, and you\'ll get full access to all features for 14 days. No credit card required.',
      },
    ],
  },
  {
    title: 'Support & Learning',
    items: [
      {
        question: 'Where can I learn more about how FirstWork works (e.g., tutorials, demos)?',
        answer: 'We offer comprehensive learning resources, including video tutorials, live demos, and detailed documentation. You can access these through our help center or contact our support team for personalized assistance.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({})

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/20">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-base leading-7 text-gray-600">
              Find answers to common questions about FirstWork and how it can help you enhance your ABA practice.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          {faqData.map((category) => (
            <div key={category.title} className="py-8">
              <button
                onClick={() => toggleCategory(category.title)}
                className="flex w-full items-start justify-between text-left"
              >
                <h2 className="text-xl font-semibold leading-7 text-gray-900">{category.title}</h2>
                <span className="ml-6 flex h-7 items-center">
                  <ChevronDown
                    className={`h-6 w-6 transform transition-transform ${
                      openCategories[category.title] ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </button>
              {openCategories[category.title] && (
                <div className="mt-6 space-y-6">
                  {category.items.map((item, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-6">
                      <h3 className="text-base font-semibold leading-7 text-gray-900">{item.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-primary/5">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Still have questions?
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              We're here to help! If you couldn't find the answer you were looking for, our team is ready to assist you.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 