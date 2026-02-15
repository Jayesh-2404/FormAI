"use client";

import React, { useState } from "react";
import FormList from "./_components/FormList";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Loader2, MessageSquareQuote, Sparkles, UserRoundPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { generateForm } from "@/actions/generateAiForm";
import { toast } from "sonner";
import PageHeader from "@/components/layout/PageHeader";

const suggestionItems = [
  { label: "Contact form", icon: UserRoundPlus },
  { label: "Job application", icon: Sparkles },
  { label: "Customer feedback", icon: MessageSquareQuote },
  { label: "Event registration", icon: CalendarCheck },
];

function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onCreateForm = async () => {
    if (!userInput) return;
    setLoading(true);

    try {
      const result = await generateForm(userInput, user?.primaryEmailAddress?.emailAddress);
      if (result?.success && result?.data?.id) {
        toast.success("Form created successfully.");
        router.push("/edit_form/" + result.data.id);
        return;
      }

      toast.error(result?.error || "Could not create the form.");
    } catch (error) {
      toast.error(error?.message || "Unexpected error while creating the form.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <PageHeader title="My Forms" subtitle="Generate, edit, and share your forms from one dashboard." />

      <section className="surface-card relative mb-8 overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-secondary/70 to-transparent" />
        <div className="relative z-10">
          <div className="badge-primary mb-4 inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            AI Form Builder
          </div>
          <h2 className="font-accent text-2xl font-semibold text-foreground sm:text-3xl">What form should we build today?</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Describe your form in plain language and FormAI will generate fields, structure, and defaults for you.
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-white p-2 shadow-soft transition-all focus-within:ring-2 focus-within:ring-primary/20">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onCreateForm()}
                placeholder="Example: A registration form for a coding workshop with name, email, and experience level."
                className="h-11 w-full rounded-xl border-none bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                disabled={loading}
              />
              <Button onClick={onCreateForm} disabled={loading || !userInput} className="h-11 rounded-xl px-5">
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Generate
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {suggestionItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setUserInput(item.label)}
                className="chip text-muted-foreground hover:text-foreground"
                type="button"
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-accent text-xl font-semibold text-foreground">Your forms</h3>
      </div>

      <FormList />
    </div>
  );
}

export default Dashboard;
