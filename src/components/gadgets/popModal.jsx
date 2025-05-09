import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DisplayData } from '../PPT/displayData';

export const PopModal = ({ showPopup, onClickDisplayData, pptData }) => {


  return (
    <>

      <Modal show={showPopup} size='xl'>
        <Modal.Header onClick={() => onClickDisplayData(false)} closeButton>
          <Modal.Title>PPT Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisplayData pptData={pptData} />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}


