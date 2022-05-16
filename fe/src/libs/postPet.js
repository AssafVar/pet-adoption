import axios from "axios";
import { nanoid } from "nanoid";
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

async function postPet(token, petInfo, image) {
  const pet = JSON.parse(JSON.stringify(petInfo));
  if (petInfo.id) {
    const update = await updatePet(token, image, pet);
    return update.changedRows;
  } else {
    pet.id = nanoid();
    const post = await postNewPet(token, image, pet);
    return post.changedRows;
  }
}

async function updatePet(token, petImage, pet) {
  const formData = new FormData();
  formData.append("petData", JSON.stringify(pet));
  formData.append("image", petImage, petImage.name);
  const response = await api.put(`/pet/:${pet.id}`, formData,{
    headers: { Authorization: token },
  });
  return response.data;
}

async function postNewPet(token, petImage, pet) {
  const formData = new FormData();
  formData.append("petData", JSON.stringify(pet));
  formData.append("image", petImage, petImage.name);
  const response = await api.post(`/pet`, formData, {
    headers: { Authorization: token },
  });
  return response.data;
}

const getPetdata = async (search) => {
  const results = await axios.get(`/pet`, {
    headers: {
      search: JSON.stringify(search),
    },
  });
  return results;
};

async function updatePetStatus(token,petId, status, userId) {
  try {
    const response = await api.post(`/pet/${petId}`, { status, userId },{
      headers: { Authorization: token },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

async function getUserPets(token, userId) {
  try {
    const response = await api.get(`pet/user/${userId}`,{
      headers: { Authorization: token },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}
export { postPet, getPetdata, updatePetStatus, getUserPets, updatePet };
