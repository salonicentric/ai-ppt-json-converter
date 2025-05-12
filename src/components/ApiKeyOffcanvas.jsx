import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { ApiKeyForm } from './ApiKeyForm';

function ApiKeyOffcanvas({ show, handleClose, apiKey, setApiKey, onSave }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        {/* <Offcanvas.Title>API Keys</Offcanvas.Title> */}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ApiKeyForm apiKey={apiKey} setApiKey={setApiKey} onSave={onSave} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ApiKeyOffcanvas;
