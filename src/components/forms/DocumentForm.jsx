import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import clsx from 'clsx';

export default function DocumentForm({ fields, values, onChange, errors = {} }) {
  const [focused, setFocused] = useState(null);

  const handleChange = (fieldId, value) => {
    onChange({ ...values, [fieldId]: value });
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.35 }}
          className="group"
        >
          <label className="label-text flex items-center gap-1.5">
            {field.label}
            {field.required && <span className="text-crimson-500 text-sm leading-none">*</span>}
          </label>

          {field.type === 'textarea' ? (
            <textarea
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onFocus={() => setFocused(field.id)}
              onBlur={() => setFocused(null)}
              placeholder={field.placeholder || ''}
              rows={3}
              className={clsx(
                'input-field resize-none',
                errors[field.id] && 'border-crimson-400 ring-1 ring-crimson-400/30',
                focused === field.id && !errors[field.id] && 'border-gold-400 ring-1 ring-gold-400/30'
              )}
            />
          ) : field.type === 'select' ? (
            <select
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onFocus={() => setFocused(field.id)}
              onBlur={() => setFocused(null)}
              className={clsx(
                'input-field appearance-none cursor-pointer',
                errors[field.id] && 'border-crimson-400 ring-1 ring-crimson-400/30',
                focused === field.id && !errors[field.id] && 'border-gold-400 ring-1 ring-gold-400/30'
              )}
            >
              <option value="">Select {field.label}...</option>
              {field.options?.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || 'text'}
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              onFocus={() => setFocused(field.id)}
              onBlur={() => setFocused(null)}
              placeholder={field.placeholder || ''}
              className={clsx(
                'input-field',
                errors[field.id] && 'border-crimson-400 ring-1 ring-crimson-400/30',
                focused === field.id && !errors[field.id] && 'border-gold-400 ring-1 ring-gold-400/30'
              )}
            />
          )}

          {errors[field.id] && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 mt-1.5 text-xs text-crimson-500 font-body"
            >
              <Info size={11} />
              {errors[field.id]}
            </motion.p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
