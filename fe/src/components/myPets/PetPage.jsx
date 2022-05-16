import React, { useEffect, useState } from "react";
import { Button, Alert, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import { updatePetStatus } from "../../libs/postPet.js";
import { useNavigate } from "react-router-dom";

function PetPage(props) {
  const { pet, user, token } = useAuth();
  const navigate = useNavigate();
  const [adopted, setIsAdopted] = useState(null);
  const [fostered, setIsFostered] = useState(null);
  const [saved, setIsSaved] = useState(null);
  const [Available, setIsAvailable] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isActiveUser,setIsActiveUser] = useState(null);

  useEffect(()=>{
    token&&setIsActiveUser(true);
  },[])
  
  useEffect(() => {
    switch (pet?.status) {
      case "Adopted":
        setIsAdopted(true);
        break;
      case "Fostered":
        setIsFostered(true);
        break;
      case "Saved":
        setIsSaved(true);
        break;
      case "Available":
        setIsAvailable(true);
    }
  }, [isComplete]);

  const handleClick = async (status) => {
    try {
      const response = await updatePetStatus(token, pet.pet_id, status, user.userId);
      if (response) {
        setIsComplete(true);
        setTimeout(() => {
          navigate("/pets");
        }, 1000);
      }
    } catch (err) {
      setIsError(true);
    }
  };
  return (
    <div>
      <h1>Pet details</h1>
      {isComplete && (
        <Alert variant="success">
          Profile successfully updated. See it in your pets page{" "}
        </Alert>
      )}
      {isError && <Alert variant="danger">Error: {isError} </Alert>}
      {!isActiveUser && <Alert variant="danger">Please login, only users can adopt... </Alert>}
      <Card style={{ width: "70rem", height: "60rem", margin: "auto" }}>
        <Card.Body>
          <Card.Title></Card.Title>
          {pet?.type && <Card.Text>Type: {pet.type}</Card.Text>}
          {pet?.status && <Card.Text>Adoption Status: {pet.status}</Card.Text>}
          {pet?.name && <Card.Text>Name: {pet.name}</Card.Text>}
          {pet?.breed && <Card.Text>Breed: {pet.breed}</Card.Text>}
          {pet?.color && <Card.Text>Color: {pet.color}</Card.Text>}
          {pet?.weight && <Card.Text>Weight: {pet.weight} kg</Card.Text>}
          {pet?.height && <Card.Text>Height: {pet.height} cm</Card.Text>}
          {pet?.hypoallergenic && (
            <Card.Text>Hypoallergenic: {pet.hypoallergenic}</Card.Text>
          )}
          {pet?.restrictions && (
            <Card.Text>Ditery Restrictions: {pet.restrictions}</Card.Text>
          )}
          {pet?.bio && <Card.Text>Bio: {pet.bio}</Card.Text>}
          {user&&<div>
          {(Available ||
            ((saved || fostered) && user.userId == pet.owner_id)) && (
            <Button
              variant="success"
              value="Adopted"
              className="mx-2"
              onClick={(e) => handleClick(e.target.value)}
            >
              Adopt
            </Button>
          )}
          {(Available || (saved && user.userId == pet.owner_id)) && (
            <Button
              variant="success"
              value="Fostered"
              className="mx-2"
              onClick={(e) => handleClick(e.target.value)}
            >
              Foster
            </Button>
          )}
          {Available && (
            <Button
              variant="success"
              value="Saved"
              className="mx-2"
              onClick={(e) => handleClick(e.target.value)}
            >
              Save
            </Button>
          )}
          {(adopted || fostered) && user.userId == pet.owner_id && (
            <Button
              variant="success"
              value="Available"
              className="mx-2"
              onClick={(e) => handleClick(e.target.value)}
            >
              Return
            </Button>
          )}
          {saved && (
            <Button
              variant="success"
              value="Available"
              className="mx-2"
              onClick={(e) => handleClick(e.target.value)}
            >
              Unsave
            </Button>
          )}
          </div>}
          <Card.Text></Card.Text>
          <Card.Img
            variant="top"
            src={pet?.img_url}
            style={{ width: "50rem", height: "30rem" }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default PetPage;
