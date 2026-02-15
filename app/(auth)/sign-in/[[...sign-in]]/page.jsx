import { SignIn } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <section className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <div className="hero-gradient relative hidden overflow-hidden border-r border-border lg:flex lg:items-center lg:justify-center lg:p-12">
        <div className="relative z-10 max-w-md">
          <div className="badge-primary mb-7 inline-flex items-center gap-2">
            <Sparkles size={14} />
            FormAI
          </div>
          <h1 className="font-accent text-4xl font-semibold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Sign in to manage forms, review responses, and publish updates with a polished workflow.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { value: "10k+", label: "forms" },
              { value: "50k+", label: "responses" },
              { value: "99.9%", label: "uptime" },
            ].map((item) => (
              <div key={item.label} className="surface-card px-4 py-3 text-center">
                <p className="font-accent text-xl font-semibold text-foreground">{item.value}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="surface-card w-full max-w-md p-4 sm:p-6">
          <div className="mb-6 text-center lg:hidden">
            <h2 className="font-accent text-2xl font-semibold text-foreground">Sign in to FormAI</h2>
            <p className="mt-1 text-sm text-muted-foreground">Create and manage AI-powered forms.</p>
          </div>
          <SignIn
            path="/sign-in"
            afterSignInUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none border-0 w-full p-0",
                headerTitle: "text-xl font-semibold text-foreground font-accent",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary hover:bg-primary/90 rounded-xl",
                footerActionLink: "text-primary hover:text-primary/80",
                socialButtonsBlockButton: "rounded-xl border border-input hover:bg-secondary",
                formFieldInput: "rounded-xl border-input shadow-sm",
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
