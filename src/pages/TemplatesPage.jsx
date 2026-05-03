import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { documentTemplates, documentCategories } from '../data/templates';
import TemplateCard from '../components/templates/TemplateCard';

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = documentTemplates.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-gold-500/60 uppercase tracking-widest block mb-3">Document Library</span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-900 mb-4">Templates</h1>
          <p className="font-body text-ink-600/60 max-w-lg">
            Choose from our curated collection of professional legal document templates.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-600/40" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 text-xs font-medium font-body uppercase tracking-wider rounded-sm transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-ink-900 text-ivory-50'
                  : 'bg-white border border-ink-700/15 text-ink-700 hover:border-ink-700/40'
              }`}
            >
              All
            </button>
            {documentCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-medium font-body uppercase tracking-wider rounded-sm transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-ink-900 text-ivory-50'
                    : 'bg-white border border-ink-700/15 text-ink-700 hover:border-ink-700/40'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-body text-sm text-ink-600/40 mb-6"
        >
          {filtered.length} template{filtered.length !== 1 ? 's' : ''} found
        </motion.p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((template, i) => (
                <TemplateCard key={template.id} template={template} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-display text-xl text-ink-900 mb-2">No templates found</h3>
              <p className="font-body text-sm text-ink-600/50">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
