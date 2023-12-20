import React, { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import './styles/Post.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Post = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.token)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [breed, setBreed] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [personality, setPersonality] = useState('')
  const [Indian, setIndian] = useState('')
  const [age, setAge] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  let Seller = null
  if(token){
    Seller = jwtDecode(token).id
  }

  const Post = async() => {
     try {
       const response = await axios.post('https://petshop-api-gahi.onrender.com/pets', {
        name, price, type, breed, weight, height, personality, Indian, age, imageUrl,Seller
       })
       toast.success('Pet added successfully')
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

  return (
    <>
      <div className='form'>
    <label>Enter name:</label>
      <input 
      value={name}
      onChange={(e) => setName(e.target.value)}
      ></input>
    <label>Enter price:</label>
      <input
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      ></input>
    <label>Enter type:</label>
      <input
      value={type}
      onChange={(e) => setType(e.target.value)}
      ></input>
    <label>Enter breed:</label>
      <input
      value={breed}
      onChange={(e) => setBreed(e.target.value)}
      ></input>
    <label>Enter weight:</label>
      <input
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
      ></input>
    <label>Enter height:</label>
      <input
      value={height}
      onChange={(e) => setHeight(e.target.value)}
      ></input>
    <label>Enter personality:</label>
      <input
      value={personality}
      onChange={(e) => setPersonality(e.target.value)}
      ></input>
    <label>Enter Indian:</label>
      <input
      value={Indian}
      onChange={(e) => setIndian(e.target.value)}
      ></input>
    <label>Enter age:</label>
      <input
      value={age}
      onChange={(e) => setAge(e.target.value)}
      ></input>
    <label>Enter imageUrl:</label>
      <input
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      ></input>
      <button onClick={Post}>SUBMIT</button>
    </div>
   
      
    </>
    
  )
}

export default Post
