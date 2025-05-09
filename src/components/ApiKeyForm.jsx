import React, { useState } from 'react';
import {
    Card,
    Form,
    InputGroup,
    FormControl,
    Button
} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const ApiKeyForm = ({ apiKey, setApiKey, onSave }) => {
    const [showKeys, setShowKeys] = useState({
        anthropic: false,
        openai: false,
        groq: false
    });

    const [showValidationError, setShowValidationError] = useState(false);

    const toggleVisibility = (key) => {
        setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveClick = () => {
        const hasAnyKey = apiKey.anthropic || apiKey.openai || apiKey.groq;
        setShowValidationError(!hasAnyKey); // Show validation if no keys are present

        if (hasAnyKey) {
            onSave(); // Submit to parent
            setShowValidationError(false); // Hide validation error on successful save
        }
    };

    return (
        <Card className="shadow border-0">
            <Card.Body>
                <h4 className="mb-4 text-primary fw-bold">API Key Configuration</h4>

                {showValidationError && (
                    <div className="alert alert-warning">
                        At least one API key must be provided.
                    </div>
                )}

                <Form>
                    {/* Anthropic API Key */}
                    <Form.Group controlId="anthropicApiKey">
                        <Form.Label>Anthropic API Key</Form.Label>
                        <InputGroup>
                            <FormControl
                                type={showKeys.anthropic ? 'text' : 'password'}
                                placeholder="Enter your Anthropic API Key"
                                value={apiKey.anthropic}
                                onChange={(e) =>
                                    setApiKey({ ...apiKey, anthropic: e.target.value })
                                }
                            />
                            <InputGroup.Text
                                onClick={() => toggleVisibility('anthropic')}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className={`bi ${showKeys.anthropic ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {/* OpenAI API Key */}
                    <Form.Group controlId="openaiApiKey" className="mt-3">
                        <Form.Label>OpenAI API Key</Form.Label>
                        <InputGroup>
                            <FormControl
                                type={showKeys.openai ? 'text' : 'password'}
                                placeholder="Enter your OpenAI API Key"
                                value={apiKey.openai}
                                onChange={(e) =>
                                    setApiKey({ ...apiKey, openai: e.target.value })
                                }
                            />
                            <InputGroup.Text
                                onClick={() => toggleVisibility('openai')}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className={`bi ${showKeys.openai ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {/* Groq API Key */}
                    <Form.Group controlId="groqApiKey" className="mt-3">
                        <Form.Label>Groq API Key</Form.Label>
                        <InputGroup>
                            <FormControl
                                type={showKeys.groq ? 'text' : 'password'}
                                placeholder="Enter your Groq API Key"
                                value={apiKey.groq}
                                onChange={(e) =>
                                    setApiKey({ ...apiKey, groq: e.target.value })
                                }
                            />
                            <InputGroup.Text
                                onClick={() => toggleVisibility('groq')}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className={`bi ${showKeys.groq ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Button variant="primary" className="mt-4" onClick={handleSaveClick}>
                        Save API Keys
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
