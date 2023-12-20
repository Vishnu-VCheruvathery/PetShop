import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../features/userSlice'
import axios from 'axios'
import toast from 'react-hot-toast'

const Form = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate()
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [loggedUser, setLoggedUser] = useState('')
   const [loggedPassword, setLoggedPassword] = useState('')
   const [type, setType] = useState('')
   const Register = async () => {
    try {
      if (!username || !password || !type) {
        toast.error('Please fill in all the fields.');
        return;
      }
  
      await axios.post('https://petshop-api-gahi.onrender.com/users/register', {
        username: username,
        password: password,
        type: type,
      });
  
      setUsername('');
      setPassword('');
      setType('');
      toast.success('Successfully Registered!');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      console.log(error);
    }
  };
  
  const Login = async () => {
    try {
      if (!loggedUser || !loggedPassword) {
        toast.error('Please fill in all the fields.');
        return;
      }
  
      const response = await axios.post('https://petshop-api-gahi.onrender.com/users/login', {
        username: loggedUser,
        password: loggedPassword,
      });
  
      if (response.status === 200) {
        const token = await response.data.token;
        if (token) {
          localStorage.setItem('authToken', token);
          dispatch(getToken());
          navigate('/');
          toast.success(`Welcome ${loggedUser}`);
        } else {
          toast.error(response.data.error || 'Invalid token');
        }
      } else {
        toast.error(response.data.error || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      console.log(error);
    }
  };


    return (
        <Stack 
        direction={{xs:'column' ,lg: 'row', md: 'row'}} 
        spacing={{xs: 2, lg: 5}}
       sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: {xs: 5, lg: 15}
       }}
        >
          <Box sx={{
            backgroundColor: 'white',
            width: 300,
            height: 350,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            flexDirection: 'column',
            borderRadius: '0.5em',
            gap: 3,
            boxShadow: ' 0 0 10px 5px rgba(0, 0, 0, 0.5)'
          }}>
            <Typography variant='h5' sx={{fontWeight: 100, position: 'absolute', top: 0, marginTop: '10px'}}>Login</Typography>
              <TextField
              required
              id="outlined-required"
              label="Username"
              value={loggedUser}
              onChange={(e) => setLoggedUser(e.target.value)}
              autoComplete='off'
            />
               <TextField
              required
              id="outlined-required"
              label="Password"
              type='password'
              value={loggedPassword}
              onChange={(e) => setLoggedPassword(e.target.value)}
              autoComplete='off'
            />
              <Button variant="contained" sx={{
                backgroundColor:"#2374f7"
              }}
              onClick={Login}
              >
                LOGIN
              </Button>
          </Box>
          <Box sx={{
            backgroundColor: 'white',
            width: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'column',
            borderRadius: '0.5em',
            padding: '10px',
            gap: 3,
            boxShadow: ' 0 0 10px 5px rgba(0, 0, 0, 0.5)'
          }}>
            <Typography variant='h5' sx={{fontWeight: 100}}>Register</Typography>
              <TextField
              required
              id="outlined-required"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete='off'
            />
               <TextField
              required
              id="outlined-required"
              label="Password"
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='off'
            />
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select your type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Select your type"
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value={'Buyer'}>Buyer</MenuItem>
                <MenuItem value={'Seller'}>Seller</MenuItem>
              </Select>
              </FormControl>
              <Button variant="contained" sx={{
                backgroundColor:"#2374f7"
              }}
              onClick={Register}
              >
                REGISTER
              </Button>
          </Box>
        </Stack>
      )
}

export default Form
