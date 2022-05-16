import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider.js";
import postUser from "../../libs/postUser.js";

function HomePageSignup({handleSignup}) {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const auth = useAuth();

  const validPhoneNumber = ()=>{

    if (userPhoneNumber.slice(0,1)==="0" &&  userPhoneNumber.length<11 && userPhoneNumber.length>8){
      setSignupError("")
      return true;
    }else{
      setSignupError("Please insert valid phone number")
      return false;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validatePhoneNumber = validPhoneNumber();
    if(!validatePhoneNumber){
      return;
    }
    const response = await postUser.postSignup(
      userFirstName,
      userLastName,
      userEmail,
      userPhoneNumber,
      userPassword,
      userConfirmPassword
    );
    if (response?.err) {
      setSignupError(response?.err);
    } else {
      setSignupError("");
      auth.login(response.data.user,response.data.token);
      handleSignup()
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formUserName">
          {signupError && <Alert variant="danger">{signupError}.</Alert>}
          <Form.Label>Your first name</Form.Label>
          <Form.Control
            value={userFirstName}
            onChange={(e) => {
              setUserFirstName(e.target.value);
            }}
            type="text"
            placeholder="Enter first name..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUserLastName">
          <Form.Label>Your last name</Form.Label>
          <Form.Control
            value={userLastName}
            onChange={(e) => {
              setUserLastName(e.target.value);
            }}
            type="text"
            placeholder="Enter last name..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter email..."
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            value={userPhoneNumber}
            onChange={(e) => {
              setUserPhoneNumber(e.target.value);
            }}
            type="phoneNumber"
            autoComplete="off"
            placeholder="Enter phone number..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            type="password"
            autoComplete="off"
            placeholder="Enter password..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={userConfirmPassword}
            onChange={(e) => {
              setUserConfirmPassword(e.target.value);
            }}
            type="password"
            autoComplete="off"
            placeholder="Enter Confirm Password..."
          />
        </Form.Group>
        <Button
          onClick={(e) => handleSubmit(e)}
          variant="success"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default HomePageSignup;
