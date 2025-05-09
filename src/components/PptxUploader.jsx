import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { PopModal } from './gadgets/popModal';
import { DisplayData } from './PPT/displayData';

export const PptxUploader = ({
  pptxFile,
  handleFileChange,
  inputValue,
  setInputValue,
  handleSubmit,
  jsonOutput
}) => {
  const onDrop = (acceptedFiles) => {
    handleFileChange(acceptedFiles[0]);
  };

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
  };

  return (
    <Card className="shadow border-0">
      <Card.Body>
        <h4 className="mb-4 text-primary fw-bold">Upload PPTX File</h4>
        <div
          {...getRootProps()}
          className="border border-secondary rounded text-center py-5 px-3 mb-4 bg-white"
          style={{ cursor: 'pointer' }}
        >
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

        {pptxFile && (
          <Form className="mb-4" onSubmit={handleSubmit}>
            <Form.Group controlId="inputValue">
              <Form.Label>Additional Input</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter some text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        )}

        {data && (
          <div className="mt-4">
            <h5 className="fw-bold">Generated JSON:</h5>
            <pre className="bg-light p-3 rounded border" style={{ maxHeight: '350px', overflowY: 'auto' }}>
              <Button variant="secondary" onClick={() => setDisplayData(!displayData)}> {'Preview'} </Button>
                { displayData && <PopModal showPopup={displayData}/> }
               {/* { displayData && <DisplayData pptData={data} /> } */}
            </pre>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

