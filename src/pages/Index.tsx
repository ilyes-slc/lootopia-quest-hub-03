import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { FeaturedHunts } from "@/components/sections/FeaturedHunts";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedHunts />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
