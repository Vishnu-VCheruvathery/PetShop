import { Delete } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SaveCard = ({card}) => {
  const token = useSelector((state) => state.user.token);
  let id = null
  if(token){
    id = jwtDecode(token).id
  }
 
   const deleteSavedPet = async({id, petId}) => {
    try {
      const response = await axios.delete(`https://petshop-api-gahi.onrender.com/pets/favs/${id}/${petId}`)
      if(response.data.error){
        toast(response.data.error)
      }
      toast('Pet removed')
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
      <Tooltip title='Remove from favs'>
          <Button size="small" onClick={() => deleteSavedPet({id: id, petId: card._id})}><Delete /></Button>
        </Tooltip>
      </CardActions>
    </Card>
 
   
  ) : (
    <h1>There is no data</h1>
  )
  )
}

export default SaveCard
