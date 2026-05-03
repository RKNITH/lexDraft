import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function DocumentPreview({ text, title }) {
  if (!text) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-ink-900/5 rounded-sm flex items-center justify-center mb-4">
          <FileText size={28} className="text-ink-600/30" />
        </div>
        <p className="font-body text-sm text-ink-600/40">
          Fill in the form to see your document preview here
        </p>
      </div>
    );
  }

  const lines = text.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      {/* Paper */}
      <div className="bg-white border border-ink-700/10 shadow-md rounded-sm overflow-hidden">
        {/* Document header bar */}
        <div className="bg-ink-900 px-6 py-3 flex items-center justify-between">
          <span className="font-mono text-xs text-gold-400">LexDraft</span>
          <span className="font-mono text-xs text-ivory-50/40">
            {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
        </div>

        {/* Content */}
        <div className="px-8 py-8 font-mono text-xs leading-relaxed text-ink-800 overflow-auto max-h-[600px] scroll-smooth">
          {lines.map((line, i) => {
            const trimmed = line.trim();
            const isTitle = i === 0 && trimmed.length > 0;
            const isSectionHeader = /^\d+\.\s+[A-Z\s]+$/.test(trimmed) || 
              (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.match(/^\d/) && trimmed.length < 50);
            const isPartyLabel = /^(EMPLOYER|EMPLOYEE|LANDLORD|TENANT|ASSIGNOR|ASSIGNEE|PARTNER|PRINCIPAL|AGENT|FREELANCER|CLIENT|DISCLOSING|RECEIVING)\s*(PARTY)?:/.test(trimmed);

            return (
              <div
                key={i}
                className={`
                  ${isTitle ? 'text-sm font-bold text-ink-900 text-center mb-4 uppercase tracking-widest' : ''}
                  ${isSectionHeader && !isTitle ? 'font-bold text-ink-900 mt-5 mb-1.5' : ''}
                  ${isPartyLabel ? 'font-bold text-gold-600' : ''}
                  ${!isTitle && !isSectionHeader && !isPartyLabel ? 'text-ink-700' : ''}
                  ${trimmed === '' ? 'h-3' : ''}
                `}
              >
                {line || '\u00A0'}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
