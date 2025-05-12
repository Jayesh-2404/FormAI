import { AtomIcon, Edit, Share2, Sparkles } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="mx-auto max-w-screen-xl px-4 pt-24 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-600">AI-Powered Form Builder</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Create Forms with AI
            <span className="block text-primary mt-2">In Seconds, Not Hours</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into professional forms instantly. Our AI understands your requirements and generates perfectly structured forms ready to collect responses.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
              href="/dashboard"
            >
              Start Creating Forms
            </a>

            <a
              className="rounded-lg border border-gray-300 px-8 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
              href="#features"
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Create, customize, and share your forms in three simple steps
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <AtomIcon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">Describe Your Form</h3>

              <p className="mt-2 text-gray-600">
                Simply tell our AI what kind of form you need. Whether it's a survey, registration form, or feedback form, we'll understand your requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Edit className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">Customize & Refine</h3>

              <p className="mt-2 text-gray-600">
                Fine-tune your form with our intuitive editor. Add, remove, or modify fields to match your exact needs.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Share2 className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mt-4 text-xl font-bold text-gray-900">Share & Collect</h3>

              <p className="mt-2 text-gray-600">
                Get a unique link to share your form. Start collecting responses immediately and view real-time analytics.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="/sign-in"
              className="inline-flex items-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Create Your First Form
            </a>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Hero