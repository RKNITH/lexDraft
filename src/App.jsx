import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import GeneratorPage from './pages/GeneratorPage';
import SavedDocumentsPage from './pages/SavedDocumentsPage';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/generate/:templateId" element={<GeneratorPage />} />
            <Route path="/saved" element={<SavedDocumentsPage />} />
            <Route path="*" element={
              <div className="pt-32 pb-20 text-center">
                <h1 className="font-display text-6xl text-ink-900 mb-4">404</h1>
                <p className="font-body text-ink-600/60 mb-8">Page not found</p>
                <a href="/" className="btn-primary">Go Home</a>
              </div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            background: '#1C1A14',
            color: '#FDFCF8',
            borderRadius: '2px',
            border: '1px solid rgba(255,255,255,0.08)',
          },
          success: {
            iconTheme: { primary: '#C9A55A', secondary: '#1C1A14' },
          },
          error: {
            iconTheme: { primary: '#C4544A', secondary: '#FDFCF8' },
          },
        }}
      />
    </div>
  );
}
