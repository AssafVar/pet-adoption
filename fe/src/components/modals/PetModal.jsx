import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useAuth } from "../../context/AuthProvider";
import {updatePetStatus} from "../../libs/postPet.js"

function PetModal({ show, pet, onClose }) {

  const auth = useAuth();
  const [petStatus, setPetStatus] = useState();
  const [ownPet,setOwnPet] = useState(false);

  const handleClick = async()=>{
    pet.status = petStatus;
    const response = await updatePetStatus(auth.user.userId,pet);
    console.log(response);
    onClose();
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pet Details</Modal.Title>
        {auth.user&&ownPet&&<Button>Adopt</Button>}
        {auth.user&&ownPet&&<Button>Foster</Button>}
        {auth.user&&<><Form.Select onChange={(e) => setPetStatus(e.target.value)} aria-label="Action" style={{ width: "100px", margin: "0 10px" }}>
          <option>Select</option>
          {pet?.status !== "Adopted" && <option value="Adopted">Adopt</option>}
          {pet?.status !== "Foster" && <option value="Foster">Foster</option>}
          {pet?.status !== "Saved" && <option value="Saved">Save</option>}
          {pet?.status !== "Available" && <option value="Available">Return</option>}
        </Form.Select><Button onClick={handleClick}>Action</Button></>}
      </Modal.Header>
      <Image
        src={pet?.img_url && pet.img_url}
        style={{ width: "auto", height: "15rem" }}
      />
      <Modal.Body>{pet?.type && `Type: ${pet.type}`}</Modal.Body>
      <Modal.Body>{pet?.status && `Adoption Status: ${pet.status}`}</Modal.Body>
      <Modal.Body>{pet?.name && `Name: ${pet.name}`}</Modal.Body>
      <Modal.Body>{pet?.breed && `Breed: ${pet.breed}`}</Modal.Body>
      <Modal.Body>{pet?.color && `Color: ${pet.color}`}</Modal.Body>
      <Modal.Body>{pet?.weight && `Weight: ${pet.weight} kg`}</Modal.Body>
      <Modal.Body>{pet?.height && `Height: ${pet.height} cm`}</Modal.Body>
      <Modal.Body>
        {pet?.hypoallergenic && `Hypoallergenic: ${pet.hypoallergenic}`}
      </Modal.Body>
      <Modal.Body>
        {pet?.restrictions && `Ditery Restrictions: ${pet.restrictions}`}
      </Modal.Body>
      <Modal.Body>{pet?.bio && `Bio: ${pet.bio}`}</Modal.Body>
    </Modal>
  );
}

export default PetModal;
