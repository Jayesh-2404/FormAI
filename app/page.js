import HeroSection from "./_components/landing/HeroSection";
import FeaturesSection from "./_components/landing/FeaturesSection";
import BenefitsSection from "./_components/landing/BenefitsSection";
import PricingSection from "./_components/landing/PricingSection";
import Footer from "./_components/landing/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}