import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const useSavedDocuments = () => {
  const [savedDocs, setSavedDocs] = useLocalStorage('lexdraft_saved_documents', []);

  const saveDocument = (doc) => {
    const newDoc = {
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      ...doc,
    };
    setSavedDocs(prev => [newDoc, ...prev].slice(0, 20)); // keep last 20
    return newDoc.id;
  };

  const deleteDocument = (id) => {
    setSavedDocs(prev => prev.filter(d => d.id !== id));
  };

  const getDocument = (id) => savedDocs.find(d => d.id === id);

  return { savedDocs, saveDocument, deleteDocument, getDocument };
};
