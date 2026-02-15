import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="hero-gradient flex min-h-screen items-center justify-center px-4">
      <div className="surface-card w-full max-w-lg p-8 text-center sm:p-10">
        <p className="badge-primary mb-4">404</p>
        <h2 className="font-accent text-3xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-3 text-muted-foreground">The page you requested does not exist or may have been moved.</p>
        <div className="mt-6">
          <Link href="/">
            <Button className="rounded-full px-6">Return home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
