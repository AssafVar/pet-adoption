import axios from "axios";
import { nanoid } from "nanoid";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

async function postSignup(
  userFirstName,
  userLastName,
  userEmail,
  userPhoneNumber,
  userPassword,
  userConfirmPassword
) {
  const userId = nanoid();
  try {
    const response = await api.post("/signup", {
      userFirstName,
      userLastName,
      userEmail,
      userPhoneNumber,
      userPassword,
      userConfirmPassword,
      userId
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
}
async function postLogin(userEmail, userPassword) {
  try {
    const response = await api.post("/login", {
      userEmail,
      userPassword,
    });
    return response;
  } catch (err) {
    return err.response.data;
  }
}
const postProfileChanges = async (user, token) => {
  try {
    const response = await api.put(`/user/${user.userId}`, user,{
      headers: { Authorization: token },
    });
    return response;
  } catch (err) {
    return err;
  }
};

async function getUsers(token){
  try{
  const response = await api.get("/user",{
    headers: { Authorization: token },
  });
  return response;
  } catch(err){
    console.log(err);
  }
}

async function getUser(token, userId){
  try{
    const response = await api.get(`user/${userId}`,{
      headers: { Authorization: token },
    });
    return response;
  }catch(err){
    console.log(err);
  }
}

export default { postSignup, postLogin, postProfileChanges, getUsers, getUser};
