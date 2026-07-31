import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Calendar, Building2, Download, ExternalLink, FileText } from 'lucide-react';

export default function OfferDetail({ offer, open, onOpenChange }) {
  if (!offer) return null;

  const isPdf = offer.file_url && offer.file_url.toLowerCase().endsWith('.pdf') || offer.file_url && offer.file_url.includes('.pdf');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-ivory border-sand">
        {offer.file_url ? (
          <div className="w-full bg-white border-b border-sand flex flex-col justify-center items-center">
            {isPdf || offer.file_url.includes('dummy.pdf') ? (
              <iframe
                src={offer.file_url}
                className="w-full h-[50vh] sm:h-[60vh] border-0"
                title={`${offer.company} Offer Letter`}
              />
            ) : (
              <img
                src={offer.file_url}
                alt={`${offer.company} Offer Letter`}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-sand/10 flex items-center justify-center border-b border-sand/30">
            <FileText size={48} className="text-obsidian/20" />
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-medium bg-sand/40 rounded-full text-obsidian/60">
              Offer Letter
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-obsidian mt-2">{offer.role}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-sand/40 py-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo/5 border border-indigo/10 flex items-center justify-center">
                <Building2 size={14} className="text-indigo" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-obsidian/30 font-medium">Company</p>
                <p className="text-sm font-semibold text-obsidian">{offer.company}</p>
              </div>
            </div>
            {offer.date && (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo/5 border border-indigo/10 flex items-center justify-center">
                  <Calendar size={14} className="text-indigo" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-obsidian/30 font-medium">Date Received</p>
                  <p className="text-sm font-semibold text-obsidian">{offer.date}</p>
                </div>
              </div>
            )}
          </div>

          {offer.description && (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-obsidian/45 font-semibold mb-2">Details</h3>
              <p className="text-sm text-obsidian/80 leading-relaxed">{offer.description}</p>
            </div>
          )}

          {offer.file_url && (
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={offer.file_url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-obsidian text-ivory rounded-full hover:bg-charcoal transition-colors font-medium shadow-sm"
              >
                <Download size={14} /> Download Letter
              </a>
              <a
                href={offer.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm border border-sand hover:bg-white/80 rounded-full text-obsidian transition-colors font-medium"
              >
                <ExternalLink size={14} /> Open in New Tab
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
