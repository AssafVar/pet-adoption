import React from 'react';
import { Card } from 'react-bootstrap';

function UserInfo({user}) {
    return (
      <Card>
      <Card.Header>User Details</Card.Header>
      <Card.Body>
        <Card.Title>
          User name: {user?.userFirstName} {user?.userLastName}
        </Card.Title>
        <Card.Text> </Card.Text>
        <Card.Text> Email: {user?.userEmail} </Card.Text>
        <Card.Text> phone number: 0{user?.phoneNumber} </Card.Text>
        {user?.bio&&<Card.Text> Biography: {user?.bio} </Card.Text>}
      </Card.Body>
    </Card>
    );
}

export default UserInfo;