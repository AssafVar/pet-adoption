import React from 'react';
import { Modal } from 'react-bootstrap';
import SignupForm from '../homePage/SignupForm';

function SignupModal({handleSignup,isSignupModal}) {
    return (
        <Modal show={isSignupModal} onHide={handleSignup}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignupForm handleSignup={handleSignup}/>
          </Modal.Body>
        </Modal.Dialog>
        </Modal>
    );
}

export default SignupModal;