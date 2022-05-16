import React, { useEffect, useState } from "react";
import { Container, Spinner, Col, Row, Card, Form } from "react-bootstrap";
import postUser from "../../libs/postUser.js";
import { getUserPets} from "../../libs/postPet.js";
import "./admin.css";
import { useAuth } from "../../context/AuthProvider.js";
import UserInfo from "../user/UserInfo.jsx";

function DashoboardUsers(props) {

    const [userList, setUserList] = useState([]);
    const [isUserFetch, setIsUserFetch] = useState(false);
    const [userPetsList, setUserPetsList] = useState([]);
    const [user, setUser] = useState(null);
    const [userNow, setUserNow] =useState(null);

    const auth = useAuth();

    useEffect(() => {
        setIsUserFetch(true);
        const fetchUsersList = async () => {
          const response = await postUser.getUsers(auth.token);
          setUserList(response.data);
        };
        fetchUsersList();
        setIsUserFetch(false);
      }, []);
    
      useEffect(()=>{
        userList&&userList.forEach((user)=>{
          user.userId===userNow&&setUser(user);
        }) 
        const userPets = async()=>{
          const response = await getUserPets(auth.token, userNow);
          setUserPetsList(response.data);
        }
        if(userNow){
          userPets()
        }else{
          setUserPetsList([]);
          setUser(null);
        }
      },[userNow])
    

    return (

<Container>
    <Row className="d-flex">
        <Col xs={2} className="dashboard-users">
          <h4>Users List</h4>
          <Row className="mb-3">
          <Form.Control as="select" onChange={(e)=>setUserNow(e.target.value)} >
                <option defaultChecked value={''}>Select user</option>
                {!!userList.length&&userList.map(user => (
                  <option key={user.userId} value={user.userId}>{user.userFirstName} {user.userLastName}</option>
                ))}
               </Form.Control>
          </Row>
          {isUserFetch && <span>Loading <Spinner animation="grow" /></span>}
          {userNow&&<Row md={12} >
                  <UserInfo user={user}/>
            </Row>}
        </Col>
        <Col xs={8} className="dashboard-pets">
            <Row className="flex-grow-1 ">
              <h4>{user?.userFirstName} {user?.userLastName} pets</h4>
              {!userPetsList.length && <h5>There are no pets to the user</h5>}
              {!!userPetsList &&
                userPetsList.map((pet) => (
                  <Col lg={4} md={6} className="flex-grow-1 d-flex justify-content-center" key={pet.pet_id}>
                    <Card style={{ width: "18rem" }} >
                      <Card.Img variant="top" src={pet.img_url} style={{ width: "auto", height:"10rem" }}/>
                      <Card.Body>
                        {pet?.type && <Card.Text>Type: {pet.type}</Card.Text>}
                        {pet?.status && (
                          <Card.Text>Adoption Status: {pet.status}</Card.Text>
                        )}
                        {pet?.name && <Card.Text>Name: {pet.name}</Card.Text>}
                        {pet?.breed && (
                          <Card.Text>Breed: {pet.breed}</Card.Text>
                        )}
                        {pet?.color && (
                          <Card.Text>Color: {pet.color}</Card.Text>
                        )}
                        {pet?.weight && (
                          <Card.Text>Weight: {pet.weight} kg</Card.Text>
                        )}
                        {pet?.height && (
                          <Card.Text>Height: {pet.height} cm</Card.Text>
                        )}
                        {pet?.hypoallergenic && (
                          <Card.Text>
                            Hypoallergenic: {pet.hypoallergenic}
                          </Card.Text>
                        )}
                        {pet?.restrictions && (
                          <Card.Text>
                            Ditery Restrictions: {pet.restrictions}
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
        </Col>
        </Row>
      </Container>
    );
}

export default DashoboardUsers;