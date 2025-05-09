import './App.css';
import React, { useState } from 'react';
import { PptxUploader } from './components/PptxUploader';
import AppNavbar from './components/AppNavbar';
import ApiKeyOffcanvas from './components/ApiKeyOffcanvas';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
  
  return (
    <>
      <AppNavbar onSetApiKeys={() => setShowOffcanvas(true)} />
      <PptxUploader
        pptxFile={pptxFile}
        handleFileChange={handleFileChange}
        inputValue={inputValue}
        setInputValue={setInputValue}
        jsonOutput={jsonOutput}
        apiKey={apiKey}
      />
      <ApiKeyOffcanvas
        show={showOffcanvas}
        handleClose={() => setShowOffcanvas(false)}
        apiKey={tempApiKey}
        setApiKey={setTempApiKey}
        onSave={handleSave}
      />
    </>
  );
}

export default App;
