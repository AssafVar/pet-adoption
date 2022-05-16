import React from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "../homePage/LoginForm";

function LoginModal({isLoginModal,handleLogin}) {

  return (
    <Modal show={isLoginModal} onHide={handleLogin}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleLogin = {handleLogin}/>
        </Modal.Body>
      </Modal.Dialog>
      </Modal>
  );
}

export default LoginModal;
