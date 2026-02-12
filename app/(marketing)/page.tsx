"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/home/hero-section";
import { ValuePropositions } from "@/components/home/value-propositions";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HowItWorks } from "@/components/home/how-it-works";
import { StatsSection } from "@/components/home/stats-section";
import { CtaSection } from "@/components/home/cta-section";
import { PersonalizedHome } from "@/components/home/personalized-home";

export default function HomePage() {
  // Demo toggle — in production, this would be based on auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {/* Demo toggle button */}
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="rounded-full border-primary/30 bg-white text-xs shadow-lg"
        >
          {isLoggedIn ? "비로그인 뷰" : "로그인 뷰"} 전환
        </Button>
      </div>

      {isLoggedIn ? (
        <PersonalizedHome />
      ) : (
        <>
          <HeroSection />
          <ValuePropositions />
          <FeaturedProducts />
          <StatsSection />
          <HowItWorks />
          <CtaSection />
        </>
      )}
    </>
  );
}
