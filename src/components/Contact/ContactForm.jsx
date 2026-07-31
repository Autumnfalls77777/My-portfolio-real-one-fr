import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Send, CheckCircle2, AlertCircle, Clock, User, Mail, FileText, AlertTriangle } from 'lucide-react';
import { portfolioApi } from '@/api/portfolioApi';
import { sanitizeName, sanitizeEmail, sanitizeMessage } from '@/lib/security';
import contactData from '@/data/contact.json';

const { formReasons } = contactData;
const RATE_LIMIT_KEY = 'contact_last_submit';
const RATE_LIMIT_SECONDS = 60;

function getRateLimitRemaining() {
  const last = localStorage.getItem(RATE_LIMIT_KEY);
  if (!last) return 0;
  const elapsed = (Date.now() - parseInt(last, 10)) / 1000;
  return Math.max(0, Math.ceil(RATE_LIMIT_SECONDS - elapsed));
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', company: '', reason: '', message: '' });
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [status, setStatus] = useState(null); // null | 'success' | 'error' | 'rate'
  const [loading, setLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState(0);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setForm(prev => ({ ...prev, [field]: val }));

    if (field === 'email') {
      if (emailError) setEmailError('');
    }
    if (field === 'name') {
      if (nameError) setNameError('');
    }
  };

  const handleStep1Next = () => {
    if (!form.name.trim()) {
      setNameError('Please enter your name to continue.');
      return;
    }
    setNameError('');
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!form.email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    if (!validateEmail(form.email.trim())) {
      setEmailError("That doesn't seem like a valid email address...");
      return;
    }
    setEmailError('');
    setCurrentStep(3);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!form.reason || !form.message.trim()) {
      return;
    }

    const remaining = getRateLimitRemaining();
    if (remaining > 0) {
      setRateLimited(remaining);
      setStatus('rate');
      return;
    }

    setLoading(true);
    setStatus(null);
    setSubmitError('');

    try {
      await portfolioApi.entities.ContactMessage.create({
        name: sanitizeName(form.name),
        email: sanitizeEmail(form.email),
        company: sanitizeName(form.company),
        reason: form.reason || 'General Inquiry',
        message: sanitizeMessage(form.message),
      });
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      setStatus('success');
    } catch (err) {
      console.error('[ContactForm submit error]', err);
      const isRateLimit = err?.status === 429 || err?.code === 'RATE_LIMIT_EXCEEDED';
      const msg = isRateLimit
        ? 'Maximum limit reached: You can submit up to 5 requests per IP per day. Please try again tomorrow.'
        : (err?.details?.error?.message || err?.message || 'Unable to submit message. Please try again.');
      setSubmitError(msg);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const resetTimeline = () => {
    setForm({ name: '', email: '', company: '', reason: '', message: '' });
    setEmailError('');
    setNameError('');
    setStatus(null);
    setCurrentStep(1);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center sm:text-left"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#C49A6C] font-semibold mb-2">
            Inquiry
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-obsidian">
            Tell me about your <span className="italic text-obsidian/50">project.</span>
          </h2>
        </motion.div>

        {/* Outer Timeline Container Card */}
        <div className="bg-white border border-sand rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">

          {status === 'success' ? (
            /* Success State View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-obsidian">
                Thank you, {form.name || 'there'}!
              </h3>
              <p className="text-sm text-obsidian/60 max-w-md mx-auto leading-relaxed">
                Your inquiry has been received and saved to the admin dashboard. An email notification has been dispatched to <span className="font-semibold text-obsidian">prabaljaiswal69420@gmail.com</span>.
              </p>
              <div className="pt-4">
                <button
                  onClick={resetTimeline}
                  className="px-6 py-3 bg-obsidian text-ivory text-xs font-semibold rounded-full hover:bg-charcoal transition-colors shadow-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              {/* Stepper Nodes Bar */}
              <div className="mb-10 relative">
                {/* Connecting Line */}
                <div className="absolute top-5 left-8 right-8 h-[2px] bg-sand/80 -z-0">
                  <motion.div
                    className="h-full bg-[#C49A6C]"
                    initial={{ width: '0%' }}
                    animate={{
                      width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Stepper Nodes */}
                <div className="flex items-center justify-between relative z-10">
                  {/* Step 1 Node */}
                  <div
                    onClick={() => currentStep > 1 && setCurrentStep(1)}
                    className={`flex flex-col items-center cursor-pointer group ${currentStep >= 1 ? '' : 'pointer-events-none'}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 shadow-sm ${
                        currentStep === 1
                          ? 'bg-[#C49A6C] text-white ring-4 ring-[#C49A6C]/20 scale-110'
                          : currentStep > 1
                          ? 'bg-obsidian text-ivory'
                          : 'bg-white text-obsidian/40 border border-sand'
                      }`}
                    >
                      {currentStep > 1 ? '✓' : '01'}
                    </div>
                    <span className={`text-[11px] font-semibold mt-2 tracking-wide uppercase transition-colors ${
                      currentStep === 1 ? 'text-[#C49A6C]' : 'text-obsidian/40'
                    }`}>
                      About You
                    </span>
                  </div>

                  {/* Step 2 Node */}
                  <div
                    onClick={() => currentStep > 2 && setCurrentStep(2)}
                    className={`flex flex-col items-center cursor-pointer group ${currentStep >= 2 ? '' : 'pointer-events-none'}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 shadow-sm ${
                        currentStep === 2
                          ? 'bg-[#C49A6C] text-white ring-4 ring-[#C49A6C]/20 scale-110'
                          : currentStep > 2
                          ? 'bg-obsidian text-ivory'
                          : 'bg-white text-obsidian/40 border border-sand'
                      }`}
                    >
                      {currentStep > 2 ? '✓' : '02'}
                    </div>
                    <span className={`text-[11px] font-semibold mt-2 tracking-wide uppercase transition-colors ${
                      currentStep === 2 ? 'text-[#C49A6C]' : 'text-obsidian/40'
                    }`}>
                      Contact
                    </span>
                  </div>

                  {/* Step 3 Node */}
                  <div
                    className={`flex flex-col items-center cursor-pointer group ${currentStep === 3 ? '' : 'pointer-events-none'}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 shadow-sm ${
                        currentStep === 3
                          ? 'bg-[#C49A6C] text-white ring-4 ring-[#C49A6C]/20 scale-110'
                          : 'bg-white text-obsidian/40 border border-sand'
                      }`}
                    >
                      03
                    </div>
                    <span className={`text-[11px] font-semibold mt-2 tracking-wide uppercase transition-colors ${
                      currentStep === 3 ? 'text-[#C49A6C]' : 'text-obsidian/40'
                    }`}>
                      Overview
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Alert Banners */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{submitError || 'Unable to submit message. Please try again.'}</span>
                  </motion.div>
                )}
                {status === 'rate' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2"
                  >
                    <Clock size={16} className="flex-shrink-0" />
                    <span>Please wait {rateLimited} seconds before submitting another project message.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step Content */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">

                  {/* ── STEP 1: NAME ── */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C49A6C] font-semibold">
                        <User size={14} />
                        <span>01 — About You</span>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-obsidian">
                        What's your name?
                      </h3>
                      <p className="text-xs text-obsidian/50">
                        Let's start by getting to know who is reaching out for this project.
                      </p>

                      <div className="pt-2">
                        <label className="block text-[10px] uppercase font-bold tracking-widest text-obsidian/40 mb-2">
                          Full Name <span className="text-[#C49A6C]">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={handleChange('name')}
                          onKeyDown={(e) => e.key === 'Enter' && handleStep1Next()}
                          placeholder="e.g. Alex Johnson"
                          autoFocus
                          className={`w-full px-5 py-4 text-sm bg-[#F9F8F6] border rounded-2xl outline-none text-obsidian transition-all ${
                            nameError ? 'border-red-400 focus:border-red-500' : 'border-sand focus:border-[#C49A6C] focus:bg-white'
                          }`}
                        />
                        {nameError && (
                          <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1.5">
                            <AlertTriangle size={13} />
                            <span>{nameError}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={handleStep1Next}
                          className="flex items-center gap-2 px-7 py-3.5 bg-obsidian text-ivory text-xs font-semibold rounded-full hover:bg-charcoal transition-all shadow-md"
                        >
                          <span>Next Step</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 2: EMAIL & COMPANY ── */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C49A6C] font-semibold">
                        <Mail size={14} />
                        <span>02 — Contact Details</span>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-obsidian">
                        Nice to meet you, {form.name || 'there'}!
                      </h3>
                      <p className="text-xs text-obsidian/50">
                        Where should I send project proposals or responses?
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-obsidian/40 mb-2">
                            Email Address <span className="text-[#C49A6C]">*</span>
                          </label>

                          {/* Email Validation Error Message above/below input box */}
                          <input
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                            onKeyDown={(e) => e.key === 'Enter' && handleStep2Next()}
                            placeholder="name@company.com"
                            autoFocus
                            className={`w-full px-5 py-3.5 text-sm bg-[#F9F8F6] border rounded-2xl outline-none text-obsidian transition-all ${
                              emailError ? 'border-red-400 focus:border-red-500 bg-red-50/20' : 'border-sand focus:border-[#C49A6C] focus:bg-white'
                            }`}
                          />
                          {emailError && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1.5"
                            >
                              <AlertTriangle size={13} className="flex-shrink-0" />
                              <span>{emailError}</span>
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-obsidian/40 mb-2">
                            Company / Studio (Optional)
                          </label>
                          <input
                            type="text"
                            value={form.company}
                            onChange={handleChange('company')}
                            placeholder="e.g. Acme Corp"
                            className="w-full px-5 py-3.5 text-sm bg-[#F9F8F6] border border-sand rounded-2xl outline-none focus:border-[#C49A6C] focus:bg-white text-obsidian transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-obsidian/60 hover:text-obsidian transition-colors"
                        >
                          <ArrowLeft size={14} />
                          <span>Back</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleStep2Next}
                          className="flex items-center gap-2 px-7 py-3.5 bg-obsidian text-ivory text-xs font-semibold rounded-full hover:bg-charcoal transition-all shadow-md"
                        >
                          <span>Next Step</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3: REASON & MESSAGE ── */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C49A6C] font-semibold">
                        <FileText size={14} />
                        <span>03 — Project Overview</span>
                      </div>

                      <h3 className="text-xl font-heading font-bold text-obsidian">
                        What are you looking for?
                      </h3>
                      <p className="text-xs text-obsidian/50">
                        Select a category and share details about your project or inquiry.
                      </p>

                      <div className="space-y-4 pt-1">
                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-obsidian/40 mb-2">
                            Project Type / Reason <span className="text-[#C49A6C]">*</span>
                          </label>
                          <select
                            value={form.reason}
                            onChange={handleChange('reason')}
                            className="w-full px-5 py-3.5 text-sm bg-[#F9F8F6] border border-sand rounded-2xl outline-none focus:border-[#C49A6C] focus:bg-white text-obsidian transition-all cursor-pointer"
                          >
                            <option value="" disabled>Select what you are looking for...</option>
                            {formReasons.map(r => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-obsidian/40 mb-2">
                            Project Details & Message <span className="text-[#C49A6C]">*</span>
                          </label>
                          <textarea
                            value={form.message}
                            onChange={handleChange('message')}
                            rows={4}
                            placeholder="Tell me about your goals, timelines, design/code preferences..."
                            className="w-full px-5 py-3.5 text-sm bg-[#F9F8F6] border border-sand rounded-2xl outline-none focus:border-[#C49A6C] focus:bg-white text-obsidian transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center gap-2 px-5 py-3 text-xs font-semibold text-obsidian/60 hover:text-obsidian transition-colors"
                        >
                          <ArrowLeft size={14} />
                          <span>Back</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={!form.reason || !form.message.trim() || loading}
                          className="flex items-center gap-2 px-8 py-3.5 bg-obsidian text-ivory text-xs font-semibold rounded-full hover:bg-charcoal transition-all disabled:opacity-40 shadow-lg"
                        >
                          {loading ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Inquiry</span>
                              <Send size={14} />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}