import React, { useState } from 'react';
import { Navbar, Container, Overlay, Popover, Button } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

function AppNavbar({ onSetApiKeys }) {
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);

  const handleToggle = (event) => {
    setTarget(event.target);
    setShowPopover(!showPopover);
  };

  return (
    <Navbar bg="dark" expand="lg" className="px-3">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home" className="text-white"></Navbar.Brand>
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} onClick={handleToggle}>
          <InfoCircle size={20} color="white" />
        </div>
        <Overlay
          show={showPopover}
          target={target}
          placement="bottom"
          containerPadding={20}
          rootClose
          onHide={() => setShowPopover(false)}
        >
          <Popover id="popover-basic">
            <Popover.Header as="h3">User Settings</Popover.Header>
            <Popover.Body className="d-flex flex-column align-items-start">
              <div className="mb-2">Manage your account settings here.</div>
              <Button variant="primary" onClick={() => { setShowPopover(false); onSetApiKeys(); }}>
                Set API Keys
              </Button>
            </Popover.Body>
          </Popover>
        </Overlay>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
