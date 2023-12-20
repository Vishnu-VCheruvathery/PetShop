import React, { useEffect, useState } from 'react'
import { CardMedia,Card, CardContent, Typography, CardActions, Button, Tooltip } from '@mui/material'
import {Favorite, Delete, Edit} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode'
import axios from 'axios';

const PetCard = ({ card }) => {
  const token = useSelector((state) => state.user.token);
  let id = null
  let type = null
   if(token){
     id = jwtDecode(token).id
     type = jwtDecode(token).type
   }
    const postFav = async({id, petId}) => {
      try {
        const response = await axios.post(`https://petshop-api-gahi.onrender.com/pets/favs/${id}/${petId}`)
        if(response.data.error){
          toast.error(response.data.error)
        }
        toast.success("Added to Favourites")
        console.log(response.data)
        return response.data
      } catch (error) {
        console.log(error)
      }
    }

    const deletePet = async({petId}) => {
         try {
          const response = await axios.delete(`https://petshop-api-gahi.onrender.com/pets/${petId}`)
          toast.success(response.data.message)
          return response.data
         } catch (error) {
          console.log(error)
         }
    }

    

    


  return (
    card ? (
          <Card sx={{width: {xs: '60%', md: '100%'}}}>
          <Link to={{
        pathname: `/pet/${card._id}`,
        search: `?obj=${encodeURIComponent(JSON.stringify(card))}`
      }} 
      style={{textDecoration: 'none', color: 'black'}}>
        <CardMedia
          sx={{ height: 250 }}
          image={card.imageUrl}
        />
          
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant='h5'>{card.name}</Typography>
          <Typography variant='p'>Age: {card.age}</Typography>
          <Typography variant='h6'>₹{card.price}</Typography>
        </CardContent>
        </Link>
        <CardActions>
        
        {token ? (
          <Tooltip title='Add to Favourites'>
          <Button size="small" onClick={() => postFav({id, petId: card._id})}><Favorite /></Button>
        </Tooltip>
        ): (
          <Tooltip title='Add to Favourites'>
          <Button size="small" onClick={() => toast("You need to be logged in to use this feature")}><Favorite /></Button>
        </Tooltip>
        )}
        {token && type === "Seller" ? (
          <Tooltip title='Delete'>
          <Button size="small" onClick={() => deletePet({petId: card._id})}><Delete /></Button>
        </Tooltip>
        ): null}
        {token && type === "Seller" ? (
          <Tooltip title='Edit'>
          <Link to={`/edit/${card._id}`}>
          <Button size="small"><Edit /></Button>
          </Link>
        </Tooltip>
        ): null}
       
        </CardActions>
      </Card>
   
     
    ) : (
      <h1>There is no data</h1>
    )
  );
};

export default PetCard
