"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, Play, ArrowRight, Palette, Smartphone } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  const router = useRouter();
  const [typingText, setTypingText] = useState("");
  const [currentDemo, setCurrentDemo] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const demoTexts = [
    "Create a customer feedback form for my restaurant",
    "Build a registration form for my online course",
    "Make a survey for my college project",
    "Design a contact form for my freelance business",
  ];

  const generatedForms = [
    {
      title: "Restaurant Feedback Form",
      fields: ["Name", "Email", "Rating", "Comments", "Visit Date"],
      theme: "warm",
      time: "0.10",
    },
    {
      title: "Course Registration Form",
      fields: ["Full Name", "Email", "Phone", "Course Selection", "Payment Method"],
      theme: "professional",
      time: "0.20",
    },
    {
      title: "College Survey Form",
      fields: ["Student ID", "Major", "Year", "Satisfaction Rating", "Suggestions"],
      theme: "academic",
      time: "0.15",
    },
    {
      title: "Contact Form",
      fields: ["Name", "Email", "Service Needed", "Budget", "Project Details"],
      theme: "creative",
      time: "0.15",
    },
  ];

  useEffect(() => {
    const currentText = demoTexts[currentDemo];
    let index = 0;
    setTypingText("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (index < currentText.length) {
        setTypingText(currentText.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentDemo((prev) => (prev + 1) % demoTexts.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentDemo]);

  const handleStartTrial = () => {
    router.push("/dashboard");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="text-center lg:text-left items-center mt-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 backdrop-blur-sm rounded-full border border-gray-200 mb-4">
              <Sparkles size={18} className="text-black mr-2" />
              <span className="text-xs font-semibold text-gray-800 tracking-wide uppercase">AI-Powered Simplicity</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-black mb-4 leading-tight">
              Create Forms Effortlessly<br className="hidden sm:block" />
              <span className="text-black">— Just Describe, We Build</span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
              Say goodbye to manual form creation. Instantly generate professional forms by simply describing your needs.
            </p>

            <div className="flex justify-center lg:justify-start gap-4 mb-12">
              <a href="#features">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Play className="mr-2 h-5 w-5 text-black" /> See How It Works
                </Button>
              </a>
            </div>
          </div>

          {/* Right Content - Interactive Demo */}
          <div className="relative">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Try it now - Describe your form:</h3>
                <div className="relative">
                  <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200 min-h-[60px] flex items-center">
                    <span className="text-gray-700 font-mono">
                      {typingText}
                      {isTyping && <span className="animate-pulse">|</span>}
                    </span>
                  </div>
                </div>
              </div>

              {/* Generated Form Preview */}
              <div className="bg-gradient-to-br from-gray-100 to-blue-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{generatedForms[currentDemo].title}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Generated in {generatedForms[currentDemo].time}s</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {generatedForms[currentDemo].fields.map((field, index) => (
                    <div key={index} className="bg-white rounded-md p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                      <div className="h-8 bg-gray-100 rounded border"></div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <Palette size={16} className="text-orange-500" />
                    <span className="text-gray-600">Theme: {generatedForms[currentDemo].theme}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Smartphone size={16} className="text-sky-500" />
                    <span className="text-gray-600">Mobile Ready</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Link href="/dashboard" className="w-full">
                  <Button size="lg" className="w-full" onClick={handleStartTrial}>
                    Create Your Form Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-red-200 animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-medium text-red-700">100+ forms created till date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;