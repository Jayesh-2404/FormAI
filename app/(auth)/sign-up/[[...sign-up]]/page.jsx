import { SignUp } from "@clerk/nextjs";
import { Rocket } from "lucide-react";

export default function Page() {
  return (
    <section className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      <div className="hero-gradient relative hidden overflow-hidden border-r border-border lg:flex lg:items-center lg:justify-center lg:p-12">
        <div className="relative z-10 max-w-md">
          <div className="badge-primary mb-7 inline-flex items-center gap-2">
            <Rocket size={14} />
            Start with FormAI
          </div>
          <h1 className="font-accent text-4xl font-semibold tracking-tight text-foreground">Create forms faster</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Build polished forms with AI prompts, customize the look, and share instantly from one dashboard.
          </p>
          <div className="mt-8 space-y-2 text-sm text-foreground">
            <div className="surface-card flex items-center gap-3 px-4 py-3">AI-generated form structures</div>
            <div className="surface-card flex items-center gap-3 px-4 py-3">Built-in themes and gradients</div>
            <div className="surface-card flex items-center gap-3 px-4 py-3">Exportable response data</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="surface-card w-full max-w-md p-4 sm:p-6">
          <div className="mb-6 text-center lg:hidden">
            <h2 className="font-accent text-2xl font-semibold text-foreground">Create your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Get started with AI-powered forms in minutes.</p>
          </div>
          <SignUp
            path="/sign-up"
            afterSignUpUrl="/dashboard"
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
