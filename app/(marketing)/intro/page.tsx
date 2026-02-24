"use client";

import { HeroSection } from "@/components/home/hero-section";
import { ValuePropositions } from "@/components/home/value-propositions";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HowItWorks } from "@/components/home/how-it-works";
import { StatsSection } from "@/components/home/stats-section";
import { CtaSection } from "@/components/home/cta-section";

export default function IntroPage() {
  return (
    <>
      <HeroSection />
      <ValuePropositions />
      <FeaturedProducts />
      <StatsSection />
      <HowItWorks />
      <CtaSection />
    </>
  );
}
