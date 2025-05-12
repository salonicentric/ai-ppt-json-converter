import React, { useState } from 'react';
import { Navbar, Container, Overlay, Popover, Button, Form } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

function AppNavbar({ onSetApiKeys, isDarkMode, toggleTheme }) {
  const [showPopover, setShowPopover] = useState(false);
  const [target, setTarget] = useState(null);

  const handleToggle = (event) => {
    setTarget(event.target);
    setShowPopover(!showPopover);
  };

  return (
    <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" className="px-3">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home" className={isDarkMode ? 'text-white' : 'text-dark'}>
          
        </Navbar.Brand>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Form.Check
            type="switch"
            id="theme-switch"
            label={isDarkMode ? 'Dark' : 'Light'}
            checked={isDarkMode}
            onChange={toggleTheme}
          />
          <div style={{ cursor: 'pointer' }} onClick={handleToggle}>
            <InfoCircle size={20} color={isDarkMode ? 'white' : 'black'} />
          </div>
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
