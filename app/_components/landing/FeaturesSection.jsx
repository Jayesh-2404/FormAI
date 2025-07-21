import { Sparkles, Edit3, Send } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 bg-gray-50 relative flex items-center justify-center overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Effortless Form Creation</h2>
          <p className="mt-4 text-lg text-gray-700">
            Build, customize, and share forms in just a few clicks. No coding, no hassle.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all bg-white flex flex-col items-center text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 mb-4">
              <Sparkles className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Describe Your Form</h3>
            <p className="text-gray-600">
              Tell our AI what you need—registration, survey, feedback, and more. We’ll handle the structure.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all bg-white flex flex-col items-center text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 mb-4">
              <Edit3 className="h-7 w-7 text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customize Instantly</h3>
            <p className="text-gray-600">
              Refine your form with our easy editor. Add, remove, or tweak fields in seconds.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all bg-white flex flex-col items-center text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 mb-4">
              <Send className="h-7 w-7 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share & Collect</h3>
            <p className="text-gray-600">
              Share your form link and start collecting responses instantly. Track everything in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}