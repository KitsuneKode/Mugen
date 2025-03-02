import ChatbotSection from '@/components/chatbot-section';
import FeaturesSection from '@/components/features-section';
import Hero from '@/components/hero';
import PricingSection from '../components/pricing-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background/30 to-secondary/10 -z-10" />

      <Hero />
      <FeaturesSection />
      <ChatbotSection />
      <PricingSection />
    </div>
  );
}
