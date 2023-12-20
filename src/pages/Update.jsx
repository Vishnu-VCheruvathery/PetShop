import React, { useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import './styles/Post.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom';


const Update = () => {
    const {id} = useParams()
    const navigate = useNavigate()
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
   
    const Update = async() => {
        try {
          const response = await axios.put(`https://petshop-api-gahi.onrender.com/pets/${id}`, {
           name, price, type, breed, weight, height, personality, Indian, age, imageUrl
          })
          toast.success('Pet info updated')
          navigate('/')
          return response.data
        } catch (error) {
         console.log(error)
        }
     }

  return (
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
      <button onClick={Update}>SUBMIT</button>
    </div>
  )
}

export default Update
