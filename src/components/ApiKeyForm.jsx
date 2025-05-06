import React from 'react';
import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

export const ApiKeyForm = ({apiKey, setApiKey, onSave}) => {
    return (
        <Card className="shadow border-0">
        <Card.Body>
          <h4 className="mb-4 text-primary fw-bold">API Keys</h4>
          <Form>
               {/* Anthropic API Key */}
               <Form.Group controlId="anthropicApiKey">
              <Form.Label>Anthropic API Key</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Enter your Anthropic API Key"
                  value={apiKey.anthropic}
                  onChange={(e) => setApiKey({ ...apiKey, anthropic: e.target.value })}
                />
              </InputGroup>
            </Form.Group>

            {/* OpenAI API Key */}
            <Form.Group controlId="openaiApiKey" className="mt-3">
              <Form.Label>OpenAI API Key</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Enter your OpenAI API Key"
                  value={apiKey.openai}
                  onChange={(e) => setApiKey({ ...apiKey, openai: e.target.value })}
                />
              </InputGroup>
            </Form.Group>
  
            {/* Groq API Key */}
            <Form.Group controlId="groqApiKey" className="mt-3">
              <Form.Label>Groq API Key</Form.Label>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="Enter your Groq API Key"
                  value={apiKey.groq}
                  onChange={(e) => setApiKey({ ...apiKey, groq: e.target.value })}
                />
              </InputGroup>
            </Form.Group>
  
            
            <Button 
              variant="primary" 
              className="mt-4"
              onClick={onSave}
            >
              Save API Keys
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  };
  