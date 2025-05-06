
import './App.css';
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ApiKeyForm } from './components/ApiKeyForm'; 
import { PptxUploader } from './components/PptxUploader'; 


function App() {
  
  const [apiKey, setApiKey] = useState({
    openai: '',
    groq: ''
  });

  const handleSave = () => {
    // Handle the save logic here, e.g., API calls to save the keys
    console.log("Saved API Keys:", apiKey);
  };
  const [pptxFile, setPptxFile] = useState(null);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleFileChange = (file) => {
    setPptxFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pptxFile) {
      alert("Please upload a .pptx file.");
      return;
    }
    const dummyJson = {
      fileName: pptxFile.name,
      text: "Example text extracted from slides",
      input: inputValue,
    };
    setJsonOutput(dummyJson);
  };
  
  return (
    <Container fluid style={{ padding: '2rem', backgroundColor: '#f0f2f5' }}>
      <Row>
        <Col sm={4} className="mb-3">
        <ApiKeyForm apiKey={apiKey} setApiKey={setApiKey} onSave={handleSave} />
        </Col>
        <Col sm={8}>
          <PptxUploader
            pptxFile={pptxFile}
            handleFileChange={handleFileChange}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSubmit={handleSubmit}
            jsonOutput={jsonOutput}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
