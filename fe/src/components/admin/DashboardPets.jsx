import React, { useEffect, useState } from "react";
import { Container, Spinner, Col, Row, Form, Image} from "react-bootstrap";
import { getPetdata } from "../../libs/postPet.js";
import AddPet from "./AddPet";
import "./admin.css";

function DashboardPets(props) {
    
    const [petInfo, setPetInfo] = useState(null);
    const [petNow, setPetNow] =useState(null);
    const [petsList, setPetsList] = useState([]);
    const [isPetFetch, setIsPetFetch] = useState(false);

    useEffect(() => {
        setIsPetFetch(true);
        const fetchPetsList = async () => {
          const response = await getPetdata({});
          setPetsList(response.data);
        };
        fetchPetsList();
        setIsPetFetch(false);

      },[]);  
    
      useEffect(()=>{
        const selectedPet = petsList.filter((pet)=>{
          return pet.pet_id===petNow;
        })
        setPetInfo(selectedPet[0]);
      },[petNow]);

    return (
        <Container>
            <Row>
        <Col xs={2} className="dashboard-users">
          {isPetFetch && <Spinner animation="grow" />}
          <h4>Pets List</h4>
          <Row>
          <Form.Control as="select" onChange={(e)=>setPetNow(e.target.value)} >
                <option value={''}>Select Pet</option>
                {!!petsList.length&&petsList.map(pet => (
                  <option key={pet.pet_id} value={pet.pet_id}>Name:{pet.name} {pet.type}</option>
                ))}
               </Form.Control>
          </Row>
          <Row>
          {petInfo?.img_url&&<Image className="mt-5" style={{height:"150px", width:"100%"}} alt="Pet-image" float="true" src={petInfo?.img_url}/>}
          </Row>
        </Col>
        <Col xs={6} className="dashboard-pets mx-5 flex-grow-1 d-flex justify-content-center">
        <h4>Update pet information</h4>
          <AddPet pet={petInfo} />
        </Col>
        </Row>
        </Container>
    );
}

export default DashboardPets;