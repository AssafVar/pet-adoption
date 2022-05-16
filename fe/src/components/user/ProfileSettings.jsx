import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import postUser from "../../libs/postUser.js";
import "./profile.css";

function Profile({ handleSettings }) {
  const auth = useAuth();
  const [userFirstName, setUserFirstName] = useState(auth.user.userFirstName);
  const [userLastName, setUserLastName] = useState(auth.user.userLastName);
  const [userEmail, setUserEmail] = useState(auth.user.userEmail);
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [isValidPsw, setIsValidPsw] = useState("");
  const [FormSend, setFormSend] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState(
    `${auth.user.userPhoneNumber}`
  );
  const [error, setError] = useState(false);
  const [userBio, setUserBio] = useState(
    auth.user.userBio ? auth.user.userBio : ""
  );

  const handleSunbmit = async (e) => {
    e.preventDefault();
    if (userPassword === userConfirmPassword && userPassword.length >= 6) {
      setIsValidPsw(false);
      const userId = auth.user.userId;
      const user = {
        userFirstName,
        userLastName,
        userEmail,
        userPassword,
        userConfirmPassword,
        userPhoneNumber,
        userBio,
        userId,
      };
      const response = await postUser.postProfileChanges(user, auth.token);
      if (typeof response.data === "string") {
        setError(response.data);
      } else {
        auth.login(response.data, auth.token);
        setFormSend(true);
        handleSettings();
      }
    } else if (userPassword.length < 6) {
      setIsValidPsw("Password should be at least 6 digits");
      setFormSend(false);
    } else {
      setIsValidPsw(`Passwords dont match`);
      setFormSend(false);
    }
  };

  return (
    <div>
      <div>
        <Container>
          {FormSend && (
            <Alert variant="success">Profile successfully updated </Alert>
          )}
          {error && (
            <Alert variant="danger">{error} </Alert>
          )}
          <Form onSubmit={handleSunbmit}>
            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                value={userFirstName}
                onChange={(e) => {
                  setUserFirstName(e.target.value);
                }}
                type="text"
                placeholder="Enter first name"
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
                placeholder="Enter last name"
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
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUserPhoneNumber">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                value={userPhoneNumber}
                onChange={(e) => {
                  setUserPhoneNumber(e.target.value);
                }}
                type="text"
                placeholder="Enter phone number"
              />
            </Form.Group>
            {isValidPsw && <Alert variant="danger">{isValidPsw}</Alert>}
            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
                type="password"
                autoComplete="off"
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={userConfirmPassword}
                onChange={(e) => {
                  setUserConfirmPassword(e.target.value);
                }}
                type="password"
                autoComplete="off"
                placeholder="Enter password again"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>About me</Form.Label>
              <Form.Control
                value={userBio}
                onChange={(e) => {
                  setUserBio(e.target.value);
                }}
                as="textarea"
                rows={3}
                placeholder="Enter short text about.."
              />
            </Form.Group>
            <Button className="mb-5 mt-2" variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default Profile;
