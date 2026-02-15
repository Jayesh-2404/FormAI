import React from "react";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For trying FormAI and small projects",
    features: ["Up to 3 forms", "50 responses per form", "AI form generation", "Basic themes", "Share by link"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For professionals and growing teams",
    features: [
      "Unlimited forms",
      "Unlimited responses",
      "AI form generation",
      "Premium themes",
      "Analytics dashboard",
      "Export to Excel",
      "Custom branding",
      "Priority support",
    ],
    cta: "Try Pro",
    featured: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "per month",
    description: "For organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Advanced analytics",
      "API access",
      "Custom domains",
      "Webhook integrations",
      "SLA support",
      "Dedicated onboarding",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-20 sm:py-24">
      <div className="page-shell">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="badge-primary mb-4">Pricing</div>
          <h2 className="font-accent text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Simple plans that scale with you</h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">Start for free, then upgrade when your form volume grows.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? "pricing-card-featured" : "pricing-card"}>
              {plan.featured ? (
                <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white shadow-glow">
                  <Sparkles size={12} />
                  Most popular
                </div>
              ) : null}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="font-accent text-4xl font-semibold text-foreground">{plan.price}</span>
                  <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <Link href="/dashboard">
                <Button variant={plan.featured ? "default" : "secondary"} className="mb-6 w-full rounded-full">
                  {plan.cta}
                </Button>
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${plan.featured ? "bg-primary/10" : "bg-secondary"}`}>
                      <Check size={12} className={plan.featured ? "text-primary" : "text-foreground"} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
