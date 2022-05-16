import React from "react";
import { Button, Card} from "react-bootstrap";
import "./myPets.css";

function PetCard({ pet, onOpenCard }) {
  return (
    <Card className="pet-card mb-5 " style={{ width: "18rem", height: "20rem" }}>
      <Card.Title>Pet Card</Card.Title>
      <Card.Img
        variant="top"
        src={pet.img_url}
        style={{ width: "17.8rem", height: "8rem" }}
      />
      <Card.Body>
        <Card.Text>Name: {pet.name}</Card.Text>
        <Card.Text>Status:{pet.status}</Card.Text>
        <Button onClick={onOpenCard} variant="success">More Info</Button>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
