"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const prompts = [
  "Create a customer feedback form for my restaurant",
  "Build a registration form for my coding bootcamp",
  "Make a survey for my college research project",
  "Design a contact form for my freelance website",
];

function HeroSection() {
  const [typingText, setTypingText] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const activePrompt = prompts[currentPrompt];
    let index = 0;
    setTypingText("");
    setTyping(true);

    const typeInterval = setInterval(() => {
      if (index < activePrompt.length) {
        setTypingText(activePrompt.slice(0, index + 1));
        index += 1;
      } else {
        setTyping(false);
        clearInterval(typeInterval);
        setTimeout(() => setCurrentPrompt((prev) => (prev + 1) % prompts.length), 1800);
      }
    }, 34);

    return () => clearInterval(typeInterval);
  }, [currentPrompt]);

  return (
    <section className="hero-gradient relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="page-shell relative py-14 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up badge-primary mb-6 gap-2">
            <Sparkles size={14} />
            AI Form Builder
          </div>

          <h1 className="animate-fade-in-up delay-100 font-accent text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build production-ready forms
            <span className="block text-primary">from plain language</span>
          </h1>

          <p className="animate-fade-in-up delay-200 mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Tell FormAI what you need. It generates a complete form in seconds, then lets you style, share, and collect responses instantly.
          </p>

          <div className="animate-fade-in-up delay-300 mt-8 rounded-3xl border border-border bg-white/90 p-4 shadow-elevated backdrop-blur">
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2 text-left text-xs font-semibold text-primary sm:text-sm">
              <Zap size={14} />
              Prompt preview
            </div>
            <p className="min-h-14 text-left font-mono text-sm text-foreground sm:text-base">
              {typingText}
              {typing ? <span className="animate-pulse text-primary">|</span> : null}
            </p>
            <div className="mt-4 flex justify-end">
              <Link href="/dashboard">
                <Button className="rounded-full px-6">
                  Start Building
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>

          <div className="animate-fade-in-up delay-400 mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {["Feedback form", "Event registration", "Contact form", "Job application", "Customer survey"].map((chip) => (
              <Link key={chip} href="/dashboard" className="chip">
                {chip}
              </Link>
            ))}
          </div>

          <div className="animate-fade-in-up delay-500 mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { value: "10k+", label: "forms generated" },
              { value: "50k+", label: "responses collected" },
              { value: "0.3s", label: "average generation time" },
            ].map((item) => (
              <div key={item.label} className="surface-card px-5 py-4 text-left">
                <p className="text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
