import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, Briefcase, Award, Trophy, FileText } from 'lucide-react';
import { portfolioApi } from '@/api/portfolioApi';
import CareerHero from '@/components/Career/CareerHero';
import ExperienceCard from '@/components/Career/ExperienceCard';
import ExperienceDetail from '@/components/Career/ExperienceDetail';
import CertificateCategory from '@/components/Career/CertificateCategory';
import CertificateDetail from '@/components/Career/CertificateDetail';
import AchievementCard from '@/components/Career/AchievementCard';
import OfferCard from '@/components/Career/OfferCard';
import OfferDetail from '@/components/Career/OfferDetail';

const TABS = [
  { id: 'internships', label: 'Internship', icon: Briefcase },
  { id: 'experiences', label: 'Experiences', icon: Briefcase },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'achievements', label: 'Achievement', icon: Trophy },
  { id: 'offers', label: 'Offer Letters', icon: FileText },
];

export default function Career() {
  const [activeTab, setActiveTab] = useState('internships');
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    Promise.all([
      portfolioApi.entities.CareerExperience.list('order', 100).catch(() => []),
      portfolioApi.entities.Certificate.list('order', 100).catch(() => []),
      portfolioApi.entities.Achievement.list('order', 100).catch(() => []),
      portfolioApi.entities.OfferLetter.list('order', 100).catch(() => []),
    ]).then(([exp, certs, achs, offs]) => {
      setExperiences(exp);
      setCertificates(certs);
      setAchievements(achs);
      setOffers(offs);
      setLoading(false);
    });
  }, []);

  const internships = useMemo(() => experiences.filter((e) => e.is_internship), [experiences]);
  const regularExperiences = useMemo(() => experiences.filter((e) => !e.is_internship), [experiences]);

  const certSections = useMemo(() => {
    const featured = certificates.filter((c) => c.featured);
    const byCategory = {};
    certificates.forEach((c) => {
      if (c.featured) return;
      const cat = c.category || 'Other';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(c);
    });
    return { featured, byCategory };
  }, [certificates]);

  const tabCounts = {
    internships: internships.length,
    experiences: regularExperiences.length,
    certificates: certificates.length,
    achievements: achievements.length,
    offers: offers.length,
  };

  const renderExperiences = (list, emptyIcon, emptyText) => {
    if (list.length > 0) {
      return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {list.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onClick={() => setSelectedExp(exp)}
              index={i}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="text-center py-24">
        {emptyIcon}
        <p className="text-lg font-heading text-obsidian/40">{emptyText}</p>
        <p className="text-sm text-obsidian/30 mt-2">Check back soon for updates.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <CareerHero />

      {/* Tab switcher */}
      <section className="sticky top-0 z-30 bg-ivory/90 backdrop-blur-md border-b border-sand">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const count = tabCounts[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-indigo text-obsidian'
                      : 'border-transparent text-obsidian/40 hover:text-obsidian/70'
                  }`}
                >
                  <Icon size={14} /> {tab.label}
                  {count > 0 && (
                    <span className="text-[10px] bg-sand/60 rounded-full px-1.5 py-0.5">{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 size={24} className="animate-spin text-obsidian/30" />
        </div>
      ) : (
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-[1440px] mx-auto">
            {activeTab === 'internships' && renderExperiences(
              internships,
              <Briefcase size={48} className="mx-auto text-obsidian/15 mb-4" />,
              'No internships listed yet.'
            )}
            {activeTab === 'experiences' && renderExperiences(
              regularExperiences,
              <Briefcase size={48} className="mx-auto text-obsidian/15 mb-4" />,
              'No experiences listed yet.'
            )}
            {activeTab === 'certificates' && (
              certificates.length > 0 ? (
                <>
                  {certSections.featured.length > 0 && (
                    <CertificateCategory
                      title="★ Featured"
                      certificates={certSections.featured}
                      onCardClick={setSelectedCert}
                    />
                  )}
                  {Object.entries(certSections.byCategory).map(([category, certs]) => (
                    <CertificateCategory
                      key={category}
                      title={category}
                      certificates={certs}
                      onCardClick={setSelectedCert}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-24">
                  <Award size={48} className="mx-auto text-obsidian/15 mb-4" />
                  <p className="text-lg font-heading text-obsidian/40">No certificates listed yet.</p>
                  <p className="text-sm text-obsidian/30 mt-2">Check back soon for updates.</p>
                </div>
              )
            )}
            {activeTab === 'achievements' && (
              achievements.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {achievements.map((ach, i) => (
                    <AchievementCard key={ach.id} achievement={ach} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <Trophy size={48} className="mx-auto text-obsidian/15 mb-4" />
                  <p className="text-lg font-heading text-obsidian/40">No achievements listed yet.</p>
                  <p className="text-sm text-obsidian/30 mt-2">Check back soon for updates.</p>
                </div>
              )
            )}
            {activeTab === 'offers' && (
              offers.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {offers.map((offer, i) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      onClick={() => setSelectedOffer(offer)}
                      index={i}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24">
                  <FileText size={48} className="mx-auto text-obsidian/15 mb-4" />
                  <p className="text-lg font-heading text-obsidian/40">No offer letters listed yet.</p>
                  <p className="text-sm text-obsidian/30 mt-2">Check back soon for updates.</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      <ExperienceDetail
        experience={selectedExp}
        open={!!selectedExp}
        onOpenChange={(open) => !open && setSelectedExp(null)}
      />
      <CertificateDetail
        cert={selectedCert}
        open={!!selectedCert}
        onOpenChange={(open) => !open && setSelectedCert(null)}
      />
      <OfferDetail
        offer={selectedOffer}
        open={!!selectedOffer}
        onOpenChange={(open) => !open && setSelectedOffer(null)}
      />
    </div>
  );
}