import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { PopModal } from './gadgets/popModal';
import { DisplayData } from './PPT/displayData';

export const PptxUploader = ({ pptxFile, handleFileChange, inputValue, setInputValue, handleSubmit, jsonOutput, apiKey }) => {
    const [extraInput, setExtraInput] = useState('');
    const [dropdown1, setDropdown1] = useState('');
    const [dropdown2, setDropdown2] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onDrop = (acceptedFiles) => handleFileChange(acceptedFiles[0]);
    const [displayData, setDisplayData] = useState(false);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.pptx',
    });

    const data = {
        title: "Sample Title",
        content: "This is a sample content extracted from the PPTX file.",
        slides: [
            { slideNumber: 1, text: "Slide 1 text", title: "Sample Title" },
            { slideNumber: 2, text: "Slide 2 text", title: "Sample Title" },
            { slideNumber: 3, text: "Slide 3 text", title: "Sample Title" },
            { slideNumber: 4, text: "Slide 4 text", title: "Sample Title" }
        ]
    }

    const modelOptions = {
        openai: ['gpt-4', 'gpt-3.5'],
        anthropic: ['claude-3', 'claude-instant'],
        groq: ['mixtral', 'llama3']
    };


    return (
        <Card className="shadow border-0">
            <Card.Body>
                <h5 className="text-primary">Upload PowerPoint Template</h5>
                {/* Drag and Drop Zone */}
                <div {...getRootProps()} className="border border-secondary rounded text-center py-5 px-3 mb-4 bg-white" style={{ cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    <p className="mb-3">Drag and drop a .pptx file here, or click to browse</p>
                    <Button variant="outline-secondary" onClick={() => document.getElementById("fileInput").click()}>
                        Browse Files
                    </Button>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".pptx"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                </div>


                <Form className="mb-4">
                    <Form.Group controlId="extraInput" className="mt-3">
                        <Form.Label>Content Requirements</Form.Label>
                        <Form.Control type="text" value={extraInput} onChange={(e) => setExtraInput(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="dropdown1" className="mt-3">
                        <Form.Label>Select LLM Provider</Form.Label>
                        <Form.Select
                            value={dropdown1}
                            onChange={(e) => setDropdown1(e.target.value)}
                            disabled={!apiKey.anthropic && !apiKey.openai && !apiKey.groq}
                        >
                            {!(apiKey.anthropic || apiKey.openai || apiKey.groq) ? (
                                <option value="">Please set API keys first</option>
                            ) : (
                                <>
                                    <option value="">Select an option</option>
                                    {apiKey.openai && <option value="openai">OpenAI</option>}
                                    {apiKey.anthropic && <option value="anthropic">Anthropic</option>}
                                    {apiKey.groq && <option value="groq">Groq</option>}
                                </>
                            )}
                        </Form.Select>
                    </Form.Group>



                    <Form.Group controlId="dropdown2" className="mt-3">
                        <Form.Label>Select Model</Form.Label>
                        <Form.Select
                            value={dropdown2}
                            onChange={(e) => setDropdown2(e.target.value)}
                            disabled={!dropdown1}
                        >
                            <option value="">{dropdown1 ? "Select a model" : "Please select a provider first"}</option>
                            {dropdown1 &&
                                modelOptions[dropdown1].map((model) => (
                                    <option key={model} value={model}>{model}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-4" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Submitting...
                            </>
                        ) : (
                            'Generate Content'
                        )}
                    </Button>
                </Form>
                {/* JSON Output */}
        { (
          <div className="mt-4">
            <h5 className="fw-bold">Generated JSON:</h5>
            <pre className="bg-light p-3 rounded border" style={{ maxHeight: '350px', overflowY: 'auto' }}>
              <Button variant="secondary" onClick={() => setDisplayData(!displayData)}> {'Preview'} </Button>
                { displayData && <PopModal showPopup={displayData} onClickDisplayData={setDisplayData} pptData={data}/> }
            </pre>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};