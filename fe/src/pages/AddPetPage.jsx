import React from 'react';
import AddPet from "../components/admin/AddPet";

function AddPetPage(props) {
    return (
        <div>
        <h4 className='my-3'>Add New Pet</h4>
        <div className="add-pet-page">
            <AddPet />
        </div>
        </div>
    );
}

export default AddPetPage;