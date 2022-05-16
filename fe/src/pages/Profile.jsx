import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import ProfileSettings from "../components/user/ProfileSettings";
import postUser from "../libs/postUser.js"
import "../components/user/profile.css"

function Profile(props) {

  const auth = useAuth();
  const [isSettings, setIsSetting] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  const handleSettings = async()=>{
    const response = await postUser.getUser(auth.token, auth.user.userId);
    setUser(response.data)
    setIsSetting(!isSettings)
  }
  useEffect(()=>{
    const getUserById = async()=>{
      const response = await postUser.getUser(auth.token, auth.user.userId);
      typeof(response.data)=="string"?setError(response.data):setUser(response.data)
    }
    getUserById()
  },[])

  return (
    <Container>
      <Row className="mt-5">
        <Col>
        {error && (
            <Alert variant="danger">{error} </Alert>
          )}
          </Col>
        <Col>
        <h1 className="mb-4">{`My Profile`}</h1>
      <div>
        <h5>{`First name: ${user.userFirstName}`}</h5>
        <h5>{`Last Name: ${user.userLastName}`}</h5>
        <h5>{`Email: ${user.userEmail}`}</h5>
        <h5>{`Phone number: 0${user.phoneNumber}`}</h5>
        <div>
          <h5>{`About me: `}</h5>
          <p>{user.bio}</p>
        </div>
        <Button  variant="success" onClick={(handleSettings)}>{!isSettings?`Profile settings`:`Close profile settings`}</Button>
      </div>
        </Col>
        <Col>
        {isSettings&&<ProfileSettings handleSettings={handleSettings}/>}
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
