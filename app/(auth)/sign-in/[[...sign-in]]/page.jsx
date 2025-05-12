import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-2xl overflow-hidden">
        {/* App Preview Image */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center p-8">
          <Image
            src="/default1.png"
            alt="App Preview"
            width={1000}
            height={400}
            className="rounded-xl border border-gray-200 shadow-md"
            priority
          />
        </div>
        {/* Sign In Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Sign in to AI Form Builder</h2>
          <SignIn path="/sign-in" afterSignInUrl="/dashboard" />
        </div>
      </div>
    </section>
  );
}