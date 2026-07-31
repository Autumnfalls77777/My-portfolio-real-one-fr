import React from 'react';
import ContactHero from '@/components/Contact/ContactHero';
import SocialCards from '@/components/Contact/SocialCards';
import ContactForm from '@/components/Contact/ContactForm';
import FAQ from '@/components/Contact/FAQ';

export default function Contact() {
  return (
    <div className="min-h-screen">
      <ContactHero />
      <SocialCards />
      <ContactForm />
      <FAQ />
    </div>
  );
}