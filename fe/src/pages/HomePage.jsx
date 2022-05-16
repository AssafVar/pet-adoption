import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.js';
import '../components/homePage/homePage.css'
import pets from '../data/pets.png'

function HomePage() {

    const auth = useAuth();
    return (
        <div className='home-page'>
            <img src={pets} alt="Pets image" />
            {auth.user?<h1>{`Welcome ${auth.user.userFirstName} ${auth.user.userLastName} to your pet adoption platform`}</h1>:<h1>Welcome to your pet adoption platform</h1>}
            {auth.user&&<Link className='pages-link' to="/pets"> My pets</Link>}
            {auth.user&&<Link className='pages-link' to="/profile"> My profile</Link>}
            {auth.user&&<Link className='pages-link' to="/search">Search pet</Link>}
            <div>
                <h3>Our Goal:</h3>
                <p>The pet adoption platform aim to connect people to their best friend, to their pet.<br/> In our website you can look for your favorite pet using advnaces search includes type, name, breed, photes and some more <br/> Enjoy and best luck!  </p>
            </div>
        </div>
    );
}

export default HomePage;