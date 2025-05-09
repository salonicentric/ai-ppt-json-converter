import React from 'react';
import {
  Navbar,
  Container,
  Image,
  OverlayTrigger,
  Popover,
  Button
} from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

function AppNavbar({ onSetApiKeys }) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">User Settings</Popover.Header>
      <Popover.Body className="d-flex flex-column align-items-start">
        <div className="mb-2">Manage your account settings here.</div>
        <Button variant="primary" onClick={onSetApiKeys}>
          Set API Keys
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar bg="dark" expand="lg" className="px-3">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home" className="text-white">My App</Navbar.Brand>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src="https://via.placeholder.com/30" // You can replace with a real user avatar
              roundedCircle
              style={{ width: '30px', height: '30px' }}
              alt="User Avatar"
            />
            <InfoCircle size={20} color="white" />
          </div>
        </OverlayTrigger>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
