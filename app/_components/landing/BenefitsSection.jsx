import React from "react";
import { Check, X } from "lucide-react";

const comparisons = [
  { feature: "Setup time", formai: "30 seconds", traditional: "2-5 hours" },
  { feature: "Design expertise", formai: "Not required", traditional: "Usually required" },
  { feature: "AI assistance", formai: "Included", traditional: "Not available" },
  { feature: "Mobile readiness", formai: "Automatic", traditional: "Manual work" },
  { feature: "Learning curve", formai: "Low", traditional: "Moderate to high" },
  { feature: "Customization", formai: "Themes and styles", traditional: "Limited options" },
  { feature: "Starting cost", formai: "Free", traditional: "$50+ per month" },
];

function BenefitsSection() {
  return (
    <section className="warm-gradient-bg py-20 sm:py-24">
      <div className="page-shell">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="badge-accent mb-4">Why FormAI</div>
          <h2 className="font-accent text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Faster workflow, cleaner outcomes
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            FormAI removes repetitive setup work so you can focus on collecting useful data.
          </p>
        </div>

        <div className="surface-card overflow-hidden">
          <div className="grid grid-cols-3 border-b border-border bg-secondary/55 px-4 py-4 text-sm font-semibold sm:px-6">
            <span>Feature</span>
            <span className="text-center text-primary">FormAI</span>
            <span className="text-center text-muted-foreground">Traditional tools</span>
          </div>
          {comparisons.map((row, index) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 items-center px-4 py-3.5 text-sm transition-colors hover:bg-secondary/30 sm:px-6 ${
                index < comparisons.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="font-medium text-foreground">{row.feature}</span>
              <div className="flex items-center justify-center gap-1.5 text-emerald-700">
                <Check size={14} className="text-emerald-600" />
                <span className="font-medium">{row.formai}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-rose-500">
                <X size={14} />
                <span>{row.traditional}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
