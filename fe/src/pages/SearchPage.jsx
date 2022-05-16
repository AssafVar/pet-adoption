import React, { useState } from "react";
import {Button, Container,FloatingLabel,Form,Row,Col,Spinner, ButtonGroup, ToggleButton} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.js";
import {getPetdata} from "../libs/postPet.js"
import PetCard from "../components/myPets/PetCard";
import "../components/search/searchPage.css"

function SearchPage(props) {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [isFetch, setIsFetch] = useState('');
  const [petsList, setPetsList] = useState([]);
  const [search, setSearch] = useState(true);
  const petContext = useAuth();
  const navigate = useNavigate();

  const searchType = [
    { name: 'Basic Search', value: '0' },
    { name: 'Advance Search', value: '1' },
  ];

  const handleSubmit = async() => {
        setIsFetch(true);
    const search = {
      type,
      name,
      status,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
    };
    const results = await getPetdata(search);
    setPetsList(results.data);
    setIsFetch(false);
  };
  const moveToPetPage = (pet)=>{
    petContext.changePet(pet);
    navigate("/petPage");
  }
  return (
      <Container>
        <Row>
        <Row className="mt-5">
        <h5 className="select-search">Select search type</h5>
        </Row>
        <Col >
        <ButtonGroup className="mb-5 float-start">
        {searchType.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            variant={'outline-success'}
            checked={search === radio.value}
            onChange={(e) => setSearch(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </Col>
      </Row>
      <Row>
        <h5 className="select-search">Search Parameters</h5>
        </Row>
          <Row>
        <Col>
        <Form.Select
        style={{height:"50px"}}
          aria-label="Select animal type"
          onChange={(e) => setType(e.target.value)}
        >
          <option value={""}>Pet type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </Form.Select>
        </Col>
        <Col>
        {search==="1"&&<Form.Select
          aria-label="Adoption status"
          style={{height:"50px"}}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={""}>Adoption status</option>
          <option value="Foster">Foster</option>
          <option value="Adopted">Adopted</option>
          <option value="Available">Available</option>
        </Form.Select>}
        </Col>
        <Col>
            {search==="1"&&<FloatingLabel controlId="name" label="Pet name" className="mb-3">
            <Form.Control
              required
              style={{height:"50px"}}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search Name..."
            />
          </FloatingLabel>}
          </Col>
          </Row>
          <Row>
            <Col>
          {search==="1"&&<FloatingLabel controlId="minHeight" label="Min height (cm)" className="mb-3">
            <Form.Control
              required
              style={{height:"50px"}}
              onChange={(e) => setMinHeight(e.target.value)}
              placeholder="Search Height..."
            />
          </FloatingLabel>}
          </Col>
            <Col>
          {search==="1"&&<FloatingLabel controlId="maxHeight" label="Max height (cm)" className="mb-3">
            <Form.Control
              required
              style={{height:"50px"}}
              onChange={(e) => setMaxHeight(e.target.value)}
              placeholder="Search Height..."
            />
          </FloatingLabel>}
          </Col>
          <Col>
          {search==="1"&&<FloatingLabel controlId="mainWeight" label="Min weight (kg)" className="mb-3">
            <Form.Control
              required
              style={{height:"50px"}}
              onChange={(e) => setMinWeight(e.target.value)}
              placeholder="Search Weight..."
            />
          </FloatingLabel>}
          </Col>
          <Col>
          {search==="1"&&<FloatingLabel controlId="maxWeight" label="Max weight (kg)" className="mb-3">
            <Form.Control
              required
              style={{height:"50px"}}
              onChange={(e) => setMaxWeight(e.target.value)}
              placeholder="Search Weight..."
            />
          </FloatingLabel>}
          </Col>
          </Row>
          <Row>
          <Col>
          <Button className="mb-5 mt-3 float-start d-flex fs-5" variant="success" onClick={handleSubmit}>
            Search
            {isFetch && <Spinner className="mx-2" animation="border" role="status" />}
          </Button>
          </Col>
          </Row>

        <Row className="search-pets-list">
          {petsList.map((pet) => {
            return (
              <Col lg={3} md={4} xs={12} key={pet.pet_id}>
                <PetCard pet={pet} onOpenCard={() => moveToPetPage(pet)}>
                  {" "}
                </PetCard>
              </Col>
            );
          })}
        </Row>
      </Container>
  );
}

export default SearchPage;
