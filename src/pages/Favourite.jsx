import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css'
import SaveCard from '../components/saveCard';
import { Favorite } from '@mui/icons-material';

const Favourite = () => {
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate()
  const [pets, setPets] = useState([])
  let id = null
  if(token){
    id = jwtDecode(token).id
  }
  const getPets = async({id}) => {
       try {
        const response = await axios.get(`https://petshop-api-gahi.onrender.com/pets/favs/${id}`)
        if(response.data.error){
          toast.error(response.data.error)
        }
        console.log(response.data)
        setPets(response.data)
        return response.data
       } catch (error) {
        console.log(error)
       }
  }

    useEffect(() => {
      if(!token){
        navigate('/')
      }
    }, [token])

   useEffect(() => {
      if(token){
        getPets({id})
      } 
   }, [token])

 

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
    <h1 style={{ margin: '5px auto' }}>Favorites <Favorite /></h1>
    <div className='cards' style={{display: pets.length > 0 ? 'grid' : 'flex'}}>
      {pets.length > 0 ? (
        pets.map((pet) => (
          <SaveCard card={pet} />
        ))
    
      ) : (
          <h1>No Favourites</h1> 
         
      )}
      </div> 
  </div>
    
  )
}

export default Favourite
