import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import contactData from '@/data/contact.json';

const { faq } = contactData;

export default function FAQ() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-obsidian/40 font-medium mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">
            Frequently asked <span className="italic text-obsidian/50">questions.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-sand/80 rounded-xl px-5 bg-white/30 hover:bg-white/50 transition-colors duration-300 data-[state=open]:bg-white/60 data-[state=open]:border-sand"
              >
                <AccordionTrigger className="text-left text-sm font-heading font-semibold hover:no-underline py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-obsidian/60 leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}