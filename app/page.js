import BenefitsSection from "./_components/landing/BenefitsSection";
import FeaturesSection from "./_components/landing/FeaturesSection";
import Footer from "./_components/landing/Footer";
import HeroSection from "./_components/landing/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* The main wrapper with gradient and blobs */}
      <div
        className="relative flex-grow flex items-start justify-center overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
        </div>
        <main className="relative z-10 w-full pt-16">
          <HeroSection />
          <FeaturesSection />
          <BenefitsSection />
        </main>
      </div>
      <Footer />
    </div>
  );
}