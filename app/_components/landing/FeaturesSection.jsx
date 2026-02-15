import { BarChart3, Edit3, Send, Share2, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Describe your form",
    description: "Type what you want to collect and FormAI creates structured fields automatically.",
  },
  {
    icon: Edit3,
    title: "Edit instantly",
    description: "Fine-tune labels, placeholders, options, themes, and layout without touching code.",
  },
  {
    icon: Send,
    title: "Share in seconds",
    description: "Publish your form link immediately and start collecting responses right away.",
  },
  {
    icon: BarChart3,
    title: "Track performance",
    description: "Monitor response volume and form engagement from a unified analytics screen.",
  },
  {
    icon: Shield,
    title: "Secure by default",
    description: "Add sign-in requirements when needed and protect submissions with authenticated flows.",
  },
  {
    icon: Share2,
    title: "Theme your forms",
    description: "Use built-in themes, gradient backgrounds, and styles to match your brand identity.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="page-shell">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="badge-primary mb-4">Features</div>
          <h2 className="font-accent text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything you need to build better forms
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            From AI generation to exports and analytics, every step is fast and easy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="surface-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
                <feature.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
