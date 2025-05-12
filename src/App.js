import './App.css';
import React, { useState, useEffect } from 'react';
import { PptxUploader } from './components/PptxUploader';
import AppNavbar from './components/AppNavbar';
import ApiKeyOffcanvas from './components/ApiKeyOffcanvas';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [tempApiKey, setTempApiKey] = useState({ anthropic: '', openai: '', groq: '' });
  const [apiKey, setApiKey] = useState({ anthropic: '', openai: '', groq: '' });
  const [pptxFile, setPptxFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleFileChange = (file) => {
    setPptxFile(file);
  };

  const handleSave = () => {
    const hasAnyKey = tempApiKey.anthropic || tempApiKey.openai || tempApiKey.groq;
    if (!hasAnyKey) {
      return;
    }
    setApiKey(tempApiKey); // This makes dropdown active now
    setShowOffcanvas(false);
  };

  // Toggle theme and update the data-bs-theme attribute
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme ? 'dark' : 'light');
  };

  // Set the initial theme based on preference or default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(initialTheme);
    document.documentElement.setAttribute('data-bs-theme', initialTheme ? 'dark' : 'light');
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  return (
    <div className="app-background">
            <AppNavbar onSetApiKeys={() => setShowOffcanvas(true)} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PptxUploader
        pptxFile={pptxFile}
        handleFileChange={handleFileChange}
        inputValue={inputValue}
        setInputValue={setInputValue}
        jsonOutput={jsonOutput}
        apiKey={apiKey}
        isDarkMode={isDarkMode} 
      />
      <ApiKeyOffcanvas
        show={showOffcanvas}
        handleClose={() => setShowOffcanvas(false)}
        apiKey={tempApiKey}
        setApiKey={setTempApiKey}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
