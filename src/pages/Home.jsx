import React from 'react';
import HeroSection from '@/components/Hero/HeroSection';
import About from '@/components/Sections/About';
import Expertise from '@/components/Sections/Expertise';
import Projects from '@/components/Sections/Projects';
import Showcase from '@/components/Sections/Showcase';
import TechStack from '@/components/Sections/TechStack';
import Timeline from '@/components/Sections/Timeline';
import Achievements from '@/components/Sections/Achievements';
import Testimonials from '@/components/Sections/Testimonials';
import CTASection from '@/components/Sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <Expertise />
      <Projects />
      <Showcase />
      <TechStack />
      <Timeline />
      <Achievements />
      <Testimonials />
      <CTASection />
    </>
  );
}
