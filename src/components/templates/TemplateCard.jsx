import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star } from 'lucide-react';

const categoryColors = {
  business: 'bg-gold-300/15 text-gold-600 border-gold-300/30',
  employment: 'bg-sage-400/15 text-sage-600 border-sage-400/30',
  'real-estate': 'bg-crimson-400/15 text-crimson-500 border-crimson-400/30',
  personal: 'bg-gold-300/15 text-gold-600 border-gold-300/30',
  ip: 'bg-sage-400/15 text-sage-600 border-sage-400/30',
};

export default function TemplateCard({ template, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/generate/${template.id}`}
        className="group block card p-6 hover:shadow-md hover:border-gold-300/40 transition-all duration-300 h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium border rounded-sm ${categoryColors[template.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
              {template.category.replace('-', ' ')}
            </span>
            {template.popular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-gold-500 text-ivory-50 rounded-sm">
                <Star size={10} fill="currentColor" />
                Popular
              </span>
            )}
          </div>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gold-500"
            whileHover={{ x: 4 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        </div>

        <h3 className="font-display text-lg text-ink-900 mb-2 group-hover:text-gold-600 transition-colors duration-200 leading-snug">
          {template.title}
        </h3>
        <p className="font-body text-sm text-ink-600/60 leading-relaxed mb-5">
          {template.description}
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-ink-700/8">
          <div className="flex items-center gap-1.5 text-xs text-ink-600/50 font-body">
            <Clock size={12} />
            <span>{template.estimatedTime}</span>
          </div>
          <div className="text-xs text-ink-600/50 font-body">
            {template.fields.length} fields
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
