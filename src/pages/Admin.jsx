import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutAdmin } from '@/lib/adminAuth';
import EntityManager from '@/components/admin/EntityManager';
import HeroSettings from '@/components/admin/HeroSettings';
import DesignProjectStudio from '@/components/admin/DesignProjectStudio';
import {
  Code2, Trophy, MessageSquare, Wrench, FolderKanban, LayoutGrid,
  Cpu, Palette, FileText, Inbox, LogOut, Briefcase, Award, ArrowLeft, Image as ImageIcon, ChevronRight, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────
   Tab configuration
───────────────────────────────────────────── */
const tabGroups = [
  {
    label: 'Site',
    tabs: [
      {
        id: 'hero', label: 'Hero & Site', icon: ImageIcon, kind: 'settings',
        title: 'Hero & Site', subtitle: 'Manage homepage presentation settings',
      },
    ],
  },
  {
    label: 'Design',
    tabs: [
      {
        id: 'designs', label: 'Design Projects', icon: Palette, kind: 'studio',
        title: 'Design Projects & Collections', subtitle: 'Manage your portfolio design projects, pictures, descriptions and collection tabs',
      },
    ],
  },
  {
    label: 'Software',
    tabs: [
      {
        id: 'software', label: 'Software Projects', icon: Cpu, entityName: 'SoftwareProject',
        title: 'Software Projects', subtitle: 'Manage projects on the Software page',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'project_type', label: 'Project Type', type: 'text' },
          { key: 'category', label: 'Category', type: 'select', options: ['Frontend', 'Backend', 'AI', 'Web', 'Desktop'] },
          { key: 'status', label: 'Status', type: 'select', options: ['Live', 'Open Source', 'In Progress', 'Archived'] },
          { key: 'completion_date', label: 'Completion Date', type: 'text' },
          { key: 'tech_stack', label: 'Tech Stack (one per line)', type: 'array' },
          { key: 'role', label: 'Role', type: 'text' },
          { key: 'team_project', label: 'Team Project', type: 'boolean' },
          { key: 'github_url', label: 'GitHub URL', type: 'text' },
          { key: 'live_demo_url', label: 'Live Demo URL', type: 'text' },
          { key: 'thumbnail', label: 'Thumbnail', type: 'file' },
          { key: 'overview', label: 'Overview', type: 'textarea' },
          { key: 'problem_statement', label: 'Problem Statement', type: 'textarea' },
          { key: 'solution', label: 'Solution', type: 'textarea' },
          { key: 'features', label: 'Features (one per line)', type: 'array' },
          { key: 'challenges', label: 'Challenges (one per line)', type: 'array' },
          { key: 'future_improvements', label: 'Future Improvements (one per line)', type: 'array' },
          { key: 'personal_notes', label: 'Personal Notes', type: 'textarea' },
        ],
      },
      {
        id: 'languages', label: 'Languages', icon: Code2, entityName: 'Language',
        title: 'Languages & Frameworks', subtitle: 'Programming languages shown in the timeline',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'experience', label: 'Experience', type: 'text' },
          { key: 'projects', label: 'Projects Count', type: 'number' },
          { key: 'confidence', label: 'Confidence %', type: 'number' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
    ],
  },
  {
    label: 'Home',
    tabs: [
      {
        id: 'showcase', label: 'Selected Works', icon: LayoutGrid, entityName: 'ShowcaseItem',
        title: 'Selected Works', subtitle: 'Manage the showcase carousel items',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text' },
          { key: 'image_url', label: 'Image', type: 'file' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
      {
        id: 'achievements', label: 'Achievements', icon: Trophy, entityName: 'Achievement',
        title: 'Achievements & Recognition', subtitle: 'Manage achievements shown on the home page',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'year', label: 'Year', type: 'text' },
          { key: 'type', label: 'Type', type: 'select', options: ['publication', 'award', 'leadership', 'competition', 'certification', 'contribution'] },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
      {
        id: 'projects', label: 'Featured Projects', icon: FolderKanban, entityName: 'FeaturedProject',
        title: 'Featured Projects', subtitle: 'Manage the featured projects section',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'tech', label: 'Tech Stack (one per line)', type: 'array' },
          { key: 'github_url', label: 'GitHub URL', type: 'text' },
          { key: 'case_study_url', label: 'Case Study URL', type: 'text' },
          { key: 'image_url', label: 'Image', type: 'file' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
      {
        id: 'testimonials', label: 'Testimonials', icon: MessageSquare, entityName: 'Testimonial',
        title: 'Customer Feedback', subtitle: 'Manage testimonials shown on the home page',
        fields: [
          { key: 'quote', label: 'Quote', type: 'textarea', required: true },
          { key: 'author', label: 'Author Name', type: 'text', required: true },
          { key: 'role', label: 'Role / Company', type: 'text' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
      {
        id: 'techtools', label: 'Tech & Tools', icon: Wrench, entityName: 'TechTool',
        title: 'Tech & Tools', subtitle: 'Manage the horizontally scrolling tools section',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'select', options: ['development', 'design'], required: true },
          { key: 'color', label: 'Color (hex)', type: 'text' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
    ],
  },
  {
    label: 'Career',
    tabs: [
      {
        id: 'career', label: 'Experiences', icon: Briefcase, entityName: 'CareerExperience',
        title: 'Career Experiences', subtitle: 'Manage internships, jobs, and part-time roles',
        fields: [
          { key: 'title', label: 'Job Title', type: 'text', required: true },
          { key: 'company', label: 'Company', type: 'text', required: true },
          { key: 'company_logo', label: 'Company Logo', type: 'file' },
          { key: 'role', label: 'Role Type', type: 'text' },
          { key: 'is_internship', label: 'Is this an Internship?', type: 'boolean' },
          { key: 'duration', label: 'Duration', type: 'text' },
          { key: 'start_date', label: 'Start Date', type: 'text' },
          { key: 'end_date', label: 'End Date', type: 'text' },
          { key: 'location', label: 'Location', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'learnings', label: 'Learnings (one per line)', type: 'array' },
          { key: 'skills', label: 'Skills Gained (one per line)', type: 'array' },
          { key: 'recommended', label: 'Recommended?', type: 'boolean' },
          { key: 'recommendation_text', label: 'Recommendation Text', type: 'textarea' },
          { key: 'recommendation_author', label: 'Recommender Name', type: 'text' },
          { key: 'recommendation_role', label: 'Recommender Role', type: 'text' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
      {
        id: 'certificates', label: 'Certificates', icon: Award, entityName: 'Certificate',
        title: 'Certificates', subtitle: 'Manage certificates showcased on the Career page',
        fields: [
          { key: 'title', label: 'Certificate Title', type: 'text', required: true },
          { key: 'category', label: 'Category', type: 'text', required: true },
          { key: 'image_url', label: 'Certificate Image', type: 'file' },
          { key: 'issuer', label: 'Issued By', type: 'text' },
          { key: 'date', label: 'Date', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'featured', label: 'Featured', type: 'boolean' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
      {
        id: 'offers', label: 'Offer Letters', icon: FileText, entityName: 'OfferLetter',
        title: 'Offer Letters', subtitle: 'Manage offer letters on the Career page',
        fields: [
          { key: 'company', label: 'Company', type: 'text', required: true },
          { key: 'role', label: 'Role / Job Title', type: 'text', required: true },
          { key: 'date', label: 'Date Received', type: 'text' },
          { key: 'file_url', label: 'Offer Letter File', type: 'file', required: true },
          { key: 'description', label: 'Details / Description', type: 'textarea' },
          { key: 'order', label: 'Display Order', type: 'number' },
        ],
      },
      {
        id: 'resume', label: 'Resume', icon: FileText, entityName: 'ResumeDocument',
        title: 'Resume Documents', subtitle: 'Manage resume and CV uploads',
        fields: [
          { key: 'title', label: 'Title', type: 'text', required: true },
          { key: 'file_url', label: 'File', type: 'file', required: true },
          { key: 'type', label: 'Type', type: 'select', options: ['Resume', 'CV'], required: true },
        ],
      },
    ],
  },
  {
    label: 'Inbox',
    tabs: [
      {
        id: 'messages', label: 'Contact Messages', icon: Inbox, entityName: 'ContactMessage',
        title: 'Contact Messages', subtitle: 'Messages submitted through the contact form',
        fields: [
          { key: 'name', label: 'Name', type: 'text' },
          { key: 'email', label: 'Email', type: 'text' },
          { key: 'company', label: 'Company', type: 'text' },
          { key: 'reason', label: 'Reason', type: 'text' },
          { key: 'message', label: 'Message', type: 'textarea' },
        ],
      },
    ],
  },
];

// Flatten for lookup
const allTabs = tabGroups.flatMap(g => g.tabs);

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Admin() {
  const [activeTabId, setActiveTabId] = useState(allTabs[0].id);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const current = allTabs.find(t => t.id === activeTabId) || allTabs[0];

  const handleTabSelect = (id) => {
    setActiveTabId(id);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#F5F3F0' }}>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-64 flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ background: 'linear-gradient(160deg, #1a1a1a 0%, #111111 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="px-5 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#C49A6C' }}>
              <Database size={15} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Prabal</p>
              <p className="text-white/35 text-[10px] mt-0.5 tracking-wide">Content Manager</p>
            </div>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {tabGroups.map(group => (
            <div key={group.label}>
              <p className="px-2 mb-1.5 text-[10px] font-bold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.tabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTabId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabSelect(tab.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 text-left"
                      style={isActive
                        ? { background: 'rgba(196,154,108,0.15)', color: '#C49A6C', border: '1px solid rgba(196,154,108,0.25)' }
                        : { color: 'rgba(255,255,255,0.42)', border: '1px solid transparent' }
                      }
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.42)'; }}
                    >
                      <Icon size={15} />
                      <span className="truncate">{tab.label}</span>
                      {isActive && <ChevronRight size={12} className="ml-auto flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '12px' }}>
          <Link
            to="/"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            <ArrowLeft size={14} />
            <span>Back to Site</span>
          </Link>
          <button
            onClick={logoutAdmin}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <span className="text-sm font-semibold text-gray-800">{current.label}</span>
          <div className="w-9" /> {/* spacer */}
        </div>

        {/* Page content */}
        <div className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
            <Database size={12} />
            <ChevronRight size={10} />
            <span className="text-gray-600 font-medium">{current.label}</span>
          </div>

          {/* Content card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-50">
              <h1 className="text-xl font-bold text-gray-900">{current.title}</h1>
              {current.subtitle && <p className="text-sm text-gray-400 mt-1">{current.subtitle}</p>}
            </div>
            <div className="px-6 sm:px-8 py-6">
              {current.kind === 'settings' ? (
                <HeroSettings key={current.id} />
              ) : current.kind === 'studio' ? (
                <DesignProjectStudio key={current.id} />
              ) : (
                <EntityManager
                  key={current.id}
                  entityName={current.entityName}
                  fields={current.fields}
                  title={current.title}
                  subtitle={current.subtitle}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
