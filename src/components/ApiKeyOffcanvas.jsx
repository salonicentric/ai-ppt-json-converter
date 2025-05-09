import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { ApiKeyForm } from './ApiKeyForm';

function ApiKeyOffcanvas({ show, handleClose, apiKey, setApiKey, onSave, invalidFields }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>API Keys</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ApiKeyForm
          apiKey={apiKey}
          setApiKey={setApiKey}
          onSave={onSave}
          invalidFields={invalidFields}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ApiKeyOffcanvas;
