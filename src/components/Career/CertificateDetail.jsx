import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Award, Calendar, Building2, ExternalLink } from 'lucide-react';

export default function CertificateDetail({ cert, open, onOpenChange }) {
  if (!cert) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative bg-sand/20 overflow-hidden" style={{ minHeight: '300px' }}>
          {cert.image_url ? (
            <img src={cert.image_url} alt={cert.title} className="w-full h-full object-contain max-h-[60vh]" />
          ) : (
            <div className="w-full min-h-[300px] flex items-center justify-center">
              <Award size={64} className="text-obsidian/15" />
            </div>
          )}
          {cert.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-lime/90 backdrop-blur-sm rounded-full text-obsidian">
                ★ Featured
              </span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium bg-sand/40 rounded-full text-obsidian/60">
              {cert.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-obsidian mt-2">{cert.title}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {cert.issuer && (
              <div className="flex items-center gap-2 text-xs">
                <Building2 size={13} className="text-indigo" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-obsidian/30">Issued By</p>
                  <p className="font-medium text-obsidian">{cert.issuer}</p>
                </div>
              </div>
            )}
            {cert.date && (
              <div className="flex items-center gap-2 text-xs">
                <Calendar size={13} className="text-indigo" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-obsidian/30">Date</p>
                  <p className="font-medium text-obsidian">{cert.date}</p>
                </div>
              </div>
            )}
          </div>

          {cert.description && (
            <div>
              <h3 className="text-sm uppercase tracking-widest text-obsidian/40 font-medium mb-2">About</h3>
              <p className="text-sm text-obsidian/80 leading-relaxed">{cert.description}</p>
            </div>
          )}

          {cert.image_url && (
            <a
              href={cert.image_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-obsidian text-ivory rounded-full hover:bg-charcoal transition-colors"
            >
              <ExternalLink size={14} /> View Full Certificate
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}