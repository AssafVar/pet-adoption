import React, { useState,useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PetCard from "../components/myPets/PetCard";
import {getPetdata} from "../libs/postPet.js"
import { useAuth } from "../context/AuthProvider";

function MyPetsPage(props) {

  const [petsList, setPetsList] = useState();
  const auth = useAuth();
  const petContext = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchMyPets = async()=>{
      const search = {
        owner_id:auth.user.userId
      }
      const response = await getPetdata(search);
      setPetsList(response.data);
    }
    fetchMyPets()
  },[]);

  const moveToPetPage = (pet)=>{
    petContext.changePet(pet);
    navigate("/petPage");
  }

  return (
    <Container>
        <h1 className="my-3">My pets</h1>
        {!petsList?.length && (
          <h4>You currently do not own or foster any pets</h4>
        )}
      <Row>
        {!!petsList &&
          petsList.map((pet) => (
            <Col lg={3} md={4} key={pet.pet_id}>
              <PetCard pet={pet} onOpenCard={() => moveToPetPage(pet)} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default MyPetsPage;
