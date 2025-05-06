import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.pptx',
  });

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

        {jsonOutput && (
          <div className="mt-4">
            <h5 className="fw-bold">Generated JSON:</h5>
            <pre className="bg-light p-3 rounded border" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {JSON.stringify(jsonOutput, null, 2)}
            </pre>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

