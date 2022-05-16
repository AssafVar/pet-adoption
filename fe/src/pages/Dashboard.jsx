import React, { useState } from "react";
import { Container, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import "../components/admin/admin.css";
import { useAuth } from "../context/AuthProvider.js";
import DashoboardUsers from "../components/admin/DashoboardUsers.jsx";
import DashboardPets from "../components/admin/DashboardPets.jsx";

function Dashboard(props) {
  const [search, setSearch] = useState("user");
  const auth = useAuth();
  const searchType = [
    { name: 'Select user', value: 'user' },
    { name: 'select pet', value: 'pet' },
  ];

  return (
    <Container fluid>
      <Row>
      <ButtonGroup className="mb-5 mt-3 float-start">
        {searchType.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            variant={idx % 2 ? 'outline-success' : 'outline-success'}
            checked={search === radio.value}
            onChange={(e) => setSearch(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      </Row>
      {search==="user"&&<Row>
        <DashoboardUsers/>
      </Row>}
      {search==="pet"&&<Row>
        <DashboardPets/>
      </Row>}
    </Container>
  );
}

export default Dashboard;
