import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider.js";
import { Button, FloatingLabel, Form, Alert } from "react-bootstrap";
import { postPet } from "../../libs/postPet.js";
import "./admin.css";

function AddPetPage({pet}) {
  const [isSend, setIsSend] = useState(false);
  const [validated, setValidated] = useState(false);
  const [type, setType] = useState(pet?.type?pet.type:'');
  const [name, setName] = useState(pet?.name?pet.name:'');
  const [height, setHeight] = useState(pet?.height?pet.height:'');
  const [weight, setWeight] = useState(pet?.weight?pet.weight:'');
  const [color, setColor] = useState(pet?.color?pet.color:'');
  const [restrictions, setRestrictions] = useState(pet?.restrictions?pet.restrictions:'');
  const [breed, setBreed] = useState(pet?.breed?pet.breed:'');
  const [status,setStatus] = useState(pet?.status?pet.breed:'Available')
  const [hypoallergenic, setHypoallergenic] = useState(pet?.hypoallergenic?pet.hypoallergenic:'');
  const [bio,setBio] = useState(pet?.bio?pet.bio:'');
  const [id,setId] = useState(pet?.id?pet.id:'');
  const [valid, setIsValid] = useState(false);

  const fileImgRef = useRef();
  const auth = useAuth();

  useEffect(()=>{
    setIsSend(false);
    pet?.type?setType(pet.type):setType('');
    pet?.name?setName(pet.name):setName('');
    pet?.height?setHeight(pet.height):setHeight('');
    pet?.weight?setWeight(pet.weight):setWeight('');
    pet?.color?setColor(pet.color):setColor('');
    pet?.restrictions?setRestrictions(pet.restrictions):setRestrictions('');
    pet?.breed?setBreed(pet.breed):setBreed('');
    pet?.hypoallergenic?setHypoallergenic(pet.hypoallergenic):setHypoallergenic('');
    pet?.bio?setBio(pet.bio):setBio('');
    pet?.pet_id?setId(pet.pet_id):setId('');
  },[pet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSend(false)
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true)
      setIsValid("Missing required fields");
    } else {
      const petInfo = {type, name, height, weight, color, restrictions, breed, hypoallergenic, status, bio,id }
      setValidated(true);
      const resposne = await postPet(auth.token, petInfo, fileImgRef.current.files[0]);
      if (resposne){
        setIsSend("Pet profile updated successfully");
      }else{
        setIsValid("could not update the pet information")
      }
      fileImgRef.current.value = null;
      setIsValid(false);
      setValidated(false);
    }
  };

  return (
        <Form onSubmit={handleSubmit} noValidate validated={validated} >
          {valid && (
            <Alert variant="danger">{valid} </Alert>
          )}
          {isSend && (
            <Alert variant="success"> {isSend} </Alert>
          )}
        <FloatingLabel label="Animal type">
          <Form.Select
            required
            value={type}
            onChange={(e)=>setType(e.target.value)}
            aria-label="Type"
            className="mb-3"
          >
            <option ></option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="name" label="Name" className="mb-3">
            <Form.Control
              required
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter name..."
            />
            <Form.Control.Feedback type="invalid">
              Please provide name
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="height" label="Height (cm)" className="mb-3">
            <Form.Control
              required
              value={height}
              type="number"
              onChange={(e)=>setHeight(e.target.value)}
              placeholder="Enter height..."
            />
            <Form.Control.Feedback type="invalid">
              Please provide height in cm
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="weight" label="Weight (kg)" className="mb-3">
            <Form.Control
              required
              value={weight}
              type="number"
              onChange={(e)=>setWeight(e.target.value)}
              placeholder="Enter weight..."
            />
            <Form.Control.Feedback type="invalid">
              Please provide weight in kg.
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="color" label="Color" className="mb-3">
            <Form.Control
              required
              value={color}
              onChange={(e)=>setColor(e.target.value)}
              placeholder="Enter color..."
            />
            <Form.Control.Feedback type="invalid">
              Please provide color
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="restrictions"
            label="Dietary restrictions"
            className="mb-3"
          >
            <Form.Control
              required
              value={restrictions}
              onChange={(e)=>setRestrictions(e.target.value)}
              placeholder="Enter Dietary restrictions..."
            />
            <Form.Control.Feedback type="invalid">
              Please provide dietary restrictions
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="breed" label="Breed" className="mb-3">
            <Form.Control
              required
              value={breed}
              onChange={(e)=>setBreed(e.target.value)}
              placeholder="Enter Breed..."
            />
            <Form.Control.Feedback type="invalid">
              Please provide breed
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Hypoallergenic">
          <Form.Select
            required
            value={hypoallergenic}
            onChange={(e)=>setHypoallergenic(e.target.value)}
            aria-label="Hypoallergenic"
            className="mb-3"
          >
            <option ></option>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="bio"
            label="Short Biography"
          >
            <Form.Control
              as="textarea"
              value={bio}
              onChange={(e)=>setBio(e.target.value)}
              placeholder="Leave a Short bio here (up to 500 letters)..."
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Form.Group controlId="petImage" className="mb-3">
            <Form.Label>Pet Image</Form.Label>
            <Form.Control
              required
              ref={fileImgRef}
              type="file"
              accept="image/*"
            />
          </Form.Group>
          <Button variant="success" type="submit" >Submit</Button>
        </Form>
  );
}

export default AddPetPage;
