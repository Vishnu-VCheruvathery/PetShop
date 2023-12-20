import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/Home.css'
import PetCard from '../components/Card';

const Result = () => {
    const location = useLocation()
    const [pets, setPets] = useState([])

    useEffect(() => {
        // Parse the array from the URL parameter
        const arrayAsString = new URLSearchParams(location.search).get('array');
        const array = arrayAsString ? JSON.parse(decodeURIComponent(arrayAsString)) : [];
    
        setPets(array);
      }, [location]);

    
  return (
    <div>
      <h3 style={{marginTop: '10px', marginLeft: '10px'}}>Result:</h3>
      <div className='cards'>
        {pets.map((pet) => (
          <PetCard card={pet} key={pet._id}/>
        ))}
        

        </div>
    </div>
  )
}

export default Result
