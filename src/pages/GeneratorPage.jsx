import { useState, useMemo, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft, Download, Copy, Save, Eye, Edit3,
  FileText, Check, RefreshCw, BookMarked
} from 'lucide-react';
import { getTemplateById } from '../data/templates';
import DocumentForm from '../components/forms/DocumentForm';
import DocumentPreview from '../components/templates/DocumentPreview';
import { generatePDF, downloadAsText, copyToClipboard } from '../utils/pdfGenerator';
import { useSavedDocuments } from '../hooks/useLocalStorage';

export default function GeneratorPage() {
  const { templateId } = useParams();
  const template = getTemplateById(templateId);
  const { saveDocument } = useSavedDocuments();

  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('form'); // 'form' | 'preview'
  const [isGenerating, setIsGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!template) return <Navigate to="/templates" replace />;

  const documentText = useMemo(() => {
    return template.generate(formValues);
  }, [formValues, template]);

  const validate = useCallback(() => {
    const newErrors = {};
    template.fields.forEach(field => {
      if (field.required && !formValues[field.id]?.toString().trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formValues, template.fields]);

  const handleDownloadPDF = async () => {
    if (!validate()) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsGenerating(true);
    try {
      await generatePDF(documentText, template.title);
      toast.success('PDF downloaded successfully!');
    } catch (e) {
      toast.error('Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadTxt = () => {
    if (!validate()) {
      toast.error('Please fill in all required fields');
      return;
    }
    downloadAsText(documentText, template.title);
    toast.success('Text file downloaded!');
  };

  const handleCopy = async () => {
    await copyToClipboard(documentText);
    toast.success('Copied to clipboard!');
  };

  const handleSave = () => {
    if (!validate()) {
      toast.error('Please fill in all required fields');
      return;
    }
    saveDocument({
      templateId: template.id,
      templateTitle: template.title,
      formValues,
      documentText,
    });
    setSaved(true);
    toast.success('Document saved!');
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setFormValues({});
    setErrors({});
    setSaved(false);
    toast('Form reset', { icon: '↩️' });
  };

  const filledCount = Object.values(formValues).filter(v => v?.toString().trim()).length;
  const totalRequired = template.fields.filter(f => f.required).length;
  const progress = Math.round((filledCount / template.fields.length) * 100);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pt-6">
          <div className="flex items-center gap-3">
            <Link
              to="/templates"
              className="p-2 hover:bg-ink-900/5 rounded-sm transition-colors text-ink-600/60 hover:text-ink-900"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="tag text-xs">{template.category.replace('-', ' ')}</span>
                <span className="font-mono text-xs text-ink-600/40">{template.estimatedTime}</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl text-ink-900">{template.title}</h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={handleReset} className="p-2.5 border border-ink-700/15 text-ink-600/60 hover:text-ink-900 hover:border-ink-700/40 rounded-sm transition-all" title="Reset form">
              <RefreshCw size={15} />
            </button>
            <button onClick={handleCopy} className="p-2.5 border border-ink-700/15 text-ink-600/60 hover:text-ink-900 hover:border-ink-700/40 rounded-sm transition-all" title="Copy to clipboard">
              <Copy size={15} />
            </button>
            <button onClick={handleSave} className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium rounded-sm border transition-all ${saved ? 'bg-sage-500 border-sage-500 text-white' : 'border-ink-700/15 text-ink-600/60 hover:text-ink-900 hover:border-ink-700/40'}`}>
              {saved ? <Check size={14} /> : <BookMarked size={14} />}
              {saved ? 'Saved' : 'Save'}
            </button>
            <button onClick={handleDownloadTxt} className="btn-secondary text-xs px-4 py-2.5">
              <Download size={14} />
              .txt
            </button>
            <button onClick={handleDownloadPDF} disabled={isGenerating} className="btn-primary text-xs px-4 py-2.5 disabled:opacity-60">
              {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
              Download PDF
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-xs text-ink-600/50">
              {filledCount} of {template.fields.length} fields completed
            </span>
            <span className="font-mono text-xs text-gold-500">{progress}%</span>
          </div>
          <div className="h-1 bg-ink-700/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Mobile Tab Toggle */}
        <div className="flex lg:hidden mb-6 border border-ink-700/15 rounded-sm overflow-hidden">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-all ${activeTab === 'form' ? 'bg-ink-900 text-ivory-50' : 'bg-white text-ink-600/60'}`}
          >
            <Edit3 size={14} />
            Edit Form
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-all ${activeTab === 'preview' ? 'bg-ink-900 text-ivory-50' : 'bg-white text-ink-600/60'}`}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Panel */}
          <AnimatePresence mode="wait">
            {(activeTab === 'form' || window.innerWidth >= 1024) && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${activeTab === 'preview' ? 'hidden lg:block' : ''}`}
              >
                <div className="card p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <Edit3 size={15} className="text-gold-500" />
                    <h2 className="font-body text-sm font-medium text-ink-900 uppercase tracking-wider">Document Details</h2>
                  </div>
                  <DocumentForm
                    fields={template.fields}
                    values={formValues}
                    onChange={setFormValues}
                    errors={errors}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Preview Panel */}
          <AnimatePresence mode="wait">
            {(activeTab === 'preview' || window.innerWidth >= 1024) && (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`${activeTab === 'form' ? 'hidden lg:block' : ''}`}
              >
                <div className="sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye size={15} className="text-gold-500" />
                    <h2 className="font-body text-sm font-medium text-ink-900 uppercase tracking-wider">Live Preview</h2>
                    <span className="ml-auto font-mono text-xs text-ink-600/30">Auto-updates as you type</span>
                  </div>
                  <DocumentPreview text={documentText} title={template.title} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-gold-300/10 border border-gold-300/30 rounded-sm"
        >
          <p className="font-body text-xs text-ink-700/60 leading-relaxed">
            ⚖️ <strong>Legal Disclaimer:</strong> Documents generated by LexDraft are templates for general informational purposes only. 
            They do not constitute legal advice. Please review all documents with a qualified attorney before signing or using in any legal matter.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
