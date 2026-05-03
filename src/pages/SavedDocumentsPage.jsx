import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { BookMarked, Trash2, Download, Eye, Plus, Clock, FileText, X } from 'lucide-react';
import { useSavedDocuments } from '../hooks/useLocalStorage';
import { generatePDF, downloadAsText } from '../utils/pdfGenerator';
import DocumentPreview from '../components/templates/DocumentPreview';

export default function SavedDocumentsPage() {
  const { savedDocs, deleteDocument } = useSavedDocuments();
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isGenerating, setIsGenerating] = useState(null);

  const handleDelete = (id, title) => {
    deleteDocument(id);
    toast.success(`"${title}" deleted`);
    if (previewDoc?.id === id) setPreviewDoc(null);
  };

  const handlePDF = async (doc) => {
    setIsGenerating(doc.id);
    try {
      await generatePDF(doc.documentText, doc.templateTitle);
      toast.success('PDF downloaded!');
    } catch {
      toast.error('Failed to generate PDF');
    } finally {
      setIsGenerating(null);
    }
  };

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
          <span className="font-mono text-xs text-gold-500/60 uppercase tracking-widest block mb-3">My Library</span>
          <h1 className="font-display text-5xl md:text-6xl text-ink-900 mb-4">Saved Documents</h1>
          <p className="font-body text-ink-600/60">
            {savedDocs.length > 0
              ? `You have ${savedDocs.length} saved document${savedDocs.length !== 1 ? 's' : ''}`
              : 'Your saved documents will appear here'}
          </p>
        </motion.div>

        {savedDocs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 bg-ink-900/5 rounded-sm flex items-center justify-center mx-auto mb-6">
              <BookMarked size={32} className="text-ink-600/20" />
            </div>
            <h3 className="font-display text-2xl text-ink-900 mb-3">No saved documents yet</h3>
            <p className="font-body text-ink-600/50 mb-8 max-w-sm mx-auto">
              Generate a document from a template and save it to access it here later.
            </p>
            <Link to="/templates" className="btn-primary">
              <Plus size={16} />
              Browse Templates
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {savedDocs.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={`card p-5 hover:border-gold-300/40 transition-all duration-200 cursor-pointer ${previewDoc?.id === doc.id ? 'border-gold-400/50 bg-gold-300/5' : ''}`}
                  onClick={() => setPreviewDoc(previewDoc?.id === doc.id ? null : doc)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 bg-ink-900/5 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText size={16} className="text-gold-500" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-base text-ink-900 truncate">{doc.templateTitle}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={11} className="text-ink-600/40" />
                          <span className="font-body text-xs text-ink-600/40">
                            {new Date(doc.savedAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setPreviewDoc(previewDoc?.id === doc.id ? null : doc)}
                        className="p-2 hover:bg-ink-900/5 rounded-sm transition-colors text-ink-600/50 hover:text-ink-900"
                        title="Preview"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handlePDF(doc)}
                        disabled={isGenerating === doc.id}
                        className="p-2 hover:bg-ink-900/5 rounded-sm transition-colors text-ink-600/50 hover:text-gold-500 disabled:opacity-40"
                        title="Download PDF"
                      >
                        <Download size={14} />
                      </button>
                      <Link
                        to={`/generate/${doc.templateId}`}
                        className="p-2 hover:bg-ink-900/5 rounded-sm transition-colors text-ink-600/50 hover:text-ink-900"
                        title="Edit again"
                      >
                        <Plus size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(doc.id, doc.templateTitle)}
                        className="p-2 hover:bg-crimson-400/10 rounded-sm transition-colors text-ink-600/50 hover:text-crimson-500"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Preview Panel */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                {previewDoc ? (
                  <motion.div
                    key={previewDoc.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="sticky top-24"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-lg text-ink-900">{previewDoc.templateTitle}</h3>
                      <button
                        onClick={() => setPreviewDoc(null)}
                        className="p-1.5 hover:bg-ink-900/5 rounded-sm text-ink-600/50 hover:text-ink-900 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <DocumentPreview text={previewDoc.documentText} title={previewDoc.templateTitle} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="sticky top-24 flex flex-col items-center justify-center h-64 border-2 border-dashed border-ink-700/10 rounded-sm text-center p-8"
                  >
                    <Eye size={24} className="text-ink-600/20 mb-3" />
                    <p className="font-body text-sm text-ink-600/40">
                      Click on a document to preview it here
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
