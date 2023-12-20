import React, { useEffect, useState } from 'react'

import './styles/Home.css'
import PetCard from '../components/Card'
import axios from 'axios'

const Home = () => {
   const [pets, setPets] = useState([])
   
   async function getPost(){
      try {
         const response = await axios.get('http://localhost:3000/pets')
         setPets(response.data)
      } catch (error) {
        console.log(error)
      }
   }

   useEffect(() => {
     getPost()
   }, [pets])
  return (
    <div>
        <div className='cards'>
        {pets.map((pet) => (
          <PetCard card={pet} key={pet._id}/>
        ))}
        

        </div>
    </div>
  )
}

export default Home
