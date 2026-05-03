import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Download, FileText, Star, ChevronRight } from 'lucide-react';
import { documentTemplates, documentCategories } from '../data/templates';
import TemplateCard from '../components/templates/TemplateCard';

const appName = import.meta.env.VITE_APP_NAME || 'LexDraft';

const features = [
  {
    icon: FileText,
    title: 'Professional Templates',
    desc: 'Lawyer-drafted templates for all common legal needs — NDAs, contracts, leases, and more.',
  },
  {
    icon: Clock,
    title: 'Generate in Minutes',
    desc: 'Fill in a simple form and get a complete, customized legal document instantly.',
  },
  {
    icon: Download,
    title: 'Download as PDF',
    desc: 'Export your documents as professionally formatted PDFs ready for signing.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    desc: 'Your documents are stored locally in your browser. No data is sent to any server.',
  },
];

const stats = [
  { label: 'Document Types', value: '7+' },
  { label: 'Minutes to Generate', value: '< 5' },
  { label: 'Export Formats', value: '3' },
  { label: 'Cost', value: 'Free' },
];

export default function HomePage() {
  const popularTemplates = documentTemplates.filter(t => t.popular).slice(0, 4);

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gold-300/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sage-400/5 rounded-full blur-3xl" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(#0F0E0A 1px, transparent 1px), linear-gradient(90deg, #0F0E0A 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="tag">Professional Legal Documents</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ink-900 leading-none mb-6"
            >
              Legal documents
              <br />
              <span className="text-gradient italic">made simple.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body text-lg md:text-xl text-ink-700/60 max-w-2xl leading-relaxed mb-10"
            >
              Generate professional-grade legal documents in minutes. 
              Choose from our curated template library, fill in your details, 
              and download a polished PDF — no legal expertise required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/templates" className="btn-primary px-8 py-3.5 text-sm">
                Browse Templates
                <ArrowRight size={16} />
              </Link>
              <Link to="/generate/nda" className="btn-secondary px-8 py-3.5 text-sm">
                Try NDA Template
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 flex flex-wrap gap-8"
            >
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-display text-2xl md:text-3xl text-gold-500">{stat.value}</div>
                  <div className="font-body text-xs uppercase tracking-widest text-ink-600/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating document visual */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 w-72"
        >
          <div className="bg-white border border-ink-700/15 shadow-2xl rounded-sm overflow-hidden animate-float">
            <div className="bg-ink-900 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-crimson-400/60" />
                <div className="w-2 h-2 rounded-full bg-gold-400/60" />
                <div className="w-2 h-2 rounded-full bg-sage-400/60" />
                <span className="ml-2 font-mono text-xs text-ivory-50/40">nda_agreement.pdf</span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-center mb-4">
                <div className="h-3 w-40 bg-ink-900/80 rounded-sm mx-auto mb-2" />
                <div className="h-2 w-28 bg-ink-900/30 rounded-sm mx-auto" />
              </div>
              {[70, 90, 80, 60, 85, 55, 90, 70].map((w, i) => (
                <div key={i} className={`h-1.5 bg-ink-900/10 rounded-sm mb-2 ${i % 3 === 0 ? 'mt-4' : ''}`} style={{ width: `${w}%` }} />
              ))}
              <div className="mt-6 pt-4 border-t border-ink-700/10">
                <div className="flex justify-between">
                  <div>
                    <div className="h-1.5 w-20 bg-ink-900/20 rounded-sm mb-1" />
                    <div className="h-3 w-24 bg-ink-900/10 rounded-sm" />
                  </div>
                  <div>
                    <div className="h-1.5 w-20 bg-ink-900/20 rounded-sm mb-1" />
                    <div className="h-3 w-24 bg-ink-900/10 rounded-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 bg-ink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block font-mono text-xs text-gold-400/70 uppercase tracking-widest mb-4">Why LexDraft</span>
            <h2 className="font-display text-4xl md:text-5xl text-ivory-50 mb-4">
              Everything you need to create legal documents
            </h2>
            <p className="font-body text-ivory-100/40 max-w-xl mx-auto">
              Skip the expensive lawyers for standard documents. Get professional results in minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-ivory-100/5 border border-ivory-100/8 rounded-sm p-6 hover:border-gold-500/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/20 rounded-sm flex items-center justify-center mb-4">
                  <feature.icon size={18} className="text-gold-400" />
                </div>
                <h3 className="font-display text-lg text-ivory-50 mb-2">{feature.title}</h3>
                <p className="font-body text-sm text-ivory-100/40 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <span className="font-mono text-xs text-gold-500/60 uppercase tracking-widest block mb-3">Most Used</span>
              <h2 className="font-display text-4xl md:text-5xl text-ink-900">Popular Templates</h2>
            </div>
            <Link
              to="/templates"
              className="flex items-center gap-2 font-body text-sm text-gold-500 hover:text-gold-600 transition-colors"
            >
              View all templates
              <ChevronRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTemplates.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ivory-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-4">
              Ready to draft your document?
            </h2>
            <p className="font-body text-ink-600/60 mb-8 max-w-md mx-auto">
              Choose from our library of professional templates and create your document in under 5 minutes.
            </p>
            <Link to="/templates" className="btn-gold px-10 py-4">
              Get Started — It's Free
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
