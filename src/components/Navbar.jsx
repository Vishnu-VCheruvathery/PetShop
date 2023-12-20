import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import {Favorite, AccountCircle, Logout, Pets, ChatBubble, Search, Add, Menu} from '@mui/icons-material';
import './Navbar.css'
import { Box, Button, MenuItem, MenuList, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, logout } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'
import toast from 'react-hot-toast';
import Sidebar from './Sidebar';
import axios from 'axios';

const Navbar = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);
    let type = null
    const [ageRange, setAgeRange] = useState({ min: 1000, max: 50000 });
    const [search, setSearch] = useState('')
    const [breed, setBreed] = useState('')
    const [isIndian, setIsIndian] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false)
    useEffect(() => {
        getToken()
    }, [token])

    if(token){
       type = jwtDecode(token).type
    }

     // Step 2: Set up event handlers to update the state
  const handleRadioChange = (event) => {
    // Use event.target.value to get the value of the selected radio button
    const newValue = event.target.value === 'True';
    setIsIndian(newValue);
  };

  const searchPet = async() => {
    try {
      const response = await axios.get(`http://localhost:3000/pets/find?type=${search}`)
      if(response.data.error){
        toast.error(response.data.error)
      }
      // Convert the array of objects to a JSON string and pass it as a parameter
      const arrayAsString = JSON.stringify(response.data);
          
      // Use react-router-dom to navigate to the other component with the array parameter
      history(`/results?array=${encodeURIComponent(arrayAsString)}`);
    } catch (error) {
      console.log(error)
    }
  }

  const filteredPet = async () => {
    try {
      if (search) {
        const response = await axios.get(`http://localhost:3000/pets/filters?type=${search}&age=${ageRange}&breed=${breed}&Indian=${isIndian}`)
        
        if (response.data.error) {
          toast.error(response.data.error);
        } else if (response.data.length === 0) {
          toast.info("No pets found matching the criteria.");
        } else {
          // Convert the array of objects to a JSON string and pass it as a parameter
          const arrayAsString = JSON.stringify(response.data);
          
          // Use react-router-dom to navigate to the other component with the array parameter
          history(`/results?array=${encodeURIComponent(arrayAsString)}`);
          setSearchOpen(false);
        }
      } else {
        toast.error("Please enter a search input");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <div className='navbar'> 
    <Box sx={{
      flex: '60%',
      display: 'flex',
      justifyContent: {xs: 'flex-start', md: 'flex-end'},
      alignItems: 'center',
      gap: '5px'
    }}>
      <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
      <h1>PetShop</h1>
      </Link>
      <Pets />
    </Box>
    <Box sx={{
      display: {xs: 'none', md: 'flex'},
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: '50%'
    }}>
    <Tooltip title="Search">
   <IconButton onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
   <Search sx={{color: 'white'}}/>
   </IconButton>
   </Tooltip>
   {token ? (
  type === 'Seller' ? (
    <Tooltip title="Add Pet">
      <IconButton aria-label="add-pet">
        <Link to='/post'>
          <Add sx={{color: 'white'}} />
        </Link>
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Favourites">
    <IconButton  aria-label="fav">
    <Link to='/favourite'>
      <Favorite sx={{color: 'white'}}/>
      </Link>
   </IconButton>
    </Tooltip>

  )
) : (
  <Tooltip title="Favourites">
    <IconButton onClick={() => toast('You need to be logged in to use this feature')} aria-label="fav">
      <Favorite sx={{color: 'white'}}/>
   </IconButton>
    </Tooltip>

)}
  
   <Tooltip title="Login/Register">
   <IconButton  aria-label="account">
   <Link style={{textDecoration: 'none'}} to='/forms'>
   <AccountCircle sx={{color: 'white'}}/>
   </Link>
   </IconButton>
   </Tooltip>
   {
    token ? (
      <IconButton onClick={() => setIsOpen(true)}>
     <ChatBubble  sx={{color: 'white'}}/>
   </IconButton>
    ) : (
      <IconButton onClick={() => toast("You need to be logged in to use this feature")}>
     <ChatBubble  sx={{color: 'white'}}/>
   </IconButton>
    )
   }
  
   {token ? (
    <Tooltip title="Logout">
    <IconButton onClick={() => dispatch(logout())}  aria-label="account">
    <Link to='/'>
    <Logout sx={{color: 'white'}}/>
    </Link>
   </IconButton>
    </Tooltip>
   ): null}
   
   
    </Box>
    <Button sx={{
      display: {xs: 'flex', md: 'none'},
      width: '50px',
      fontSize: '1.2em',
      color: 'white',
      border: '1px solid white',
      justifyContent: 'center'
      }} onClick={() => setMenuOpen(!menuOpen)}>
     <Menu/>
   </Button>
  </div>
  <Box sx={{display: {xs : menuOpen ? 'block' : 'none', md: 'none'}}}>
    <MenuList>
      <MenuItem onClick={() => setSearchOpen(!searchOpen)}>
       Search
      </MenuItem>
      {
        token ? (
          type === 'Seller' ? (
            <MenuItem>
            <Link to='/post' style={{textDecoration: 'none', color: 'black'}}>
            Add Pet
            </Link>
      </MenuItem>
          ) : (
            <MenuItem>
            <Link to='/favourite' style={{textDecoration: 'none', color: 'black'}}>
            Favourites
            </Link>

      </MenuItem>
          )
        ) : (
          <MenuItem onClick={() => toast("You need to log in to use this feature")}>
      Favourites
      </MenuItem>
        )
      }
     
      <MenuItem>
      <Link to='/forms' style={{textDecoration: 'none', color: 'black'}}>
      Login/Register
      </Link>
      
      </MenuItem>
      {token ? (
        <MenuItem onClick={() => setIsOpen(true)}>
      Chat
      </MenuItem>
      ) : (
        <MenuItem onClick={() => toast("You need to login to use this feature")}>
      Chat
      </MenuItem>
      )}
      {token ? (
        <MenuItem onClick={() => dispatch(logout())}>
        <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
        Logout
        </Link>
      </MenuItem>
      ) : null}
      
    </MenuList>
  </Box>
  <div style={{display: searchOpen ? 'flex' : 'none'}} className='search'>    
  <input 
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <Tooltip title="Search">
   <IconButton onClick={searchPet}  aria-label="Search">
   <Search style={{fontSize: '1.2em'}}/>
   </IconButton>
   </Tooltip>
  </div>
  <div style={{display: searchOpen ? 'flex' : 'none'}} className='filters'>
  <label><h2>Filters:</h2></label>

  <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
  <label><h3>Price:</h3></label>
      <input
        type="number"
        placeholder="Min"
        value={ageRange.min}
        onChange={(e) => setAgeRange({ ...ageRange, min: parseInt(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Max"
        value={ageRange.max}
        onChange={(e) => setAgeRange({ ...ageRange, max: parseInt(e.target.value)})}
      />
    </div>
    <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
       <label><h3>Breed:</h3></label>
      <input 
      value={breed} 
      style={{
          width: '200px'
        }}
      onChange={(e) => setBreed(e.target.value)}></input>
    </div>
    <div  style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <label><h3>Indian:</h3> </label>

      {/* Step 3: Use the state variable to control the radio buttons */}
      <input
        id='true'
        type='radio'
        value='True'
        checked={isIndian === true}
        onChange={handleRadioChange}
        
      />
      <label htmlFor='true'>True</label>

      <input
        id='false'
        type='radio'
        value='False'
        checked={isIndian === false}
        onChange={handleRadioChange}
      />
      <label htmlFor='false'>False</label>
    </div>

     <button 
      style={{padding: '10px',  marginBottom: '20px', width: '150px'}}
     onClick={filteredPet}><h3>Submit</h3></button>
  </div>
  <Sidebar  open={isOpen} onClose={() => setIsOpen(false)}></Sidebar>
    </>
    
  )
}

export default Navbar
