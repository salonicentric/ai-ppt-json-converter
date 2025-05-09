
import './App.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ApiKeyForm } from './components/ApiKeyForm';
import { PptxUploader } from './components/PptxUploader';
import 'react-toastify/dist/ReactToastify.css';
import { updateApiKeys } from './services/ApiService';
import 'react-toastify/dist/ReactToastify.css';
import AppNavbar from './components/AppNavbar';
import ApiKeyOffcanvas from './components/ApiKeyOffcanvas';


function App() {
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const [invalidFields, setInvalidFields] = useState({
    anthropic: false,
    openai: false,
    groq: false
  });

  const [apiKey, setApiKey] = useState({
    anthropic: '',
    openai: '',
    groq: ''
  });

  const handleSave = async () => {
    const newInvalidFields = {
      anthropic: !apiKey.anthropic,
      openai: !apiKey.openai,
      groq: !apiKey.groq
    };

    setInvalidFields(newInvalidFields);

    if (newInvalidFields.anthropic || newInvalidFields.openai || newInvalidFields.groq) {
      setAlert({
        show: true,
        variant: 'warning',
        message: 'All API keys are required. Please fill in all fields.'
      });
      return;
    }

    try {
      const response = await updateApiKeys(apiKey);
      const { data } = response;

      if (data?.data?.updateApiKeys?.success) {
        setAlert({
          show: true,
          variant: 'success',
          message: 'Your API keys are securely stored in your session and are never shared. They will be used only for the LLM provider you select.'
        });
      } else {
        setAlert({
          show: true,
          variant: 'danger',
          message: 'Failed to update API keys. Please try again.'
        });
      }

      console.log("Saved API Keys:", apiKey);
    } catch (error) {
      console.error("Error saving API keys:", error);
      setAlert({
        show: true,
        variant: 'danger',
        message: 'An error occurred while updating API keys.'
      });
    }
  };




  const [pptxFile, setPptxFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleFileChange = (file) => {
    setPptxFile(file);
  };

  const handleSubmit = ({ inputValue, extraInput, dropdown1, dropdown2 }) => {
    if (!pptxFile) {
      alert("Please upload a .pptx file.");
      return;
    }

  return (
    <>
      <AppNavbar onSetApiKeys={() => setShowOffcanvas(true)} />
      <PptxUploader
        pptxFile={pptxFile}
        handleFileChange={handleFileChange}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSubmit={handleSubmit}
        jsonOutput={jsonOutput}
      />
    <ApiKeyOffcanvas
        show={showOffcanvas}
        handleClose={() => setShowOffcanvas(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        onSave={handleSave}
        invalidFields={invalidFields}
      />
    </>
  );
}
}

export default App;
