import { Box, Drawer, IconButton, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp, query, orderBy, where, onSnapshot, limit, getDoc } from 'firebase/firestore';
import { createPortal } from 'react-dom';
import {jwtDecode} from 'jwt-decode'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'
import axios from 'axios';



const Sidebar = ({open, onClose}) => {
  const token = useSelector((state) => state.user.token);
  const [sellers, setSellers] = useState([])
  const [buyers, setBuyers] = useState([])
  const [agent, setAgent] = useState('')
  const [message, setMessage] = useState("");
  const [incomingMessages, setIncomingMessages] = useState([])
  const [view, setView] = useState(false)
  let conversationId = null
  let username = null
  let id = null
  let type = 'Buyer'
  if(token){
    username = jwtDecode(token).username
    id = jwtDecode(token).id
    type = jwtDecode(token).type
    const participants = [username, agent].sort();
    conversationId = participants.join('');
  } 

   const getSellers = async() => {
        try {
          const response = await axios.get('http://localhost:3000/users/sellers')
          setSellers(response.data)
          console.log(response.data)
        } catch (error) {
          console.log(error)
        }
   }

   const getBuyers = async() => {
    try {
      const response = await axios.get('http://localhost:3000/users/buyers')
      setBuyers(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
   }

  const sendMessage = async(event) => {
    event.preventDefault();
    if(message.trim() === ""){
      toast.error("Enter valid message");
      return;
    }
      await addDoc(collection(db, "conversations", conversationId, "messages"), {
        text: message,
        sender: username,
        receiver: agent,
        createdAt: serverTimestamp(),
      });
    setMessage("")
  }

  useEffect(() => {
    if (!conversationId) {
      return; // If conversationId is null or undefined, do nothing
    }
    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setIncomingMessages(sortedMessages);
    });
  
    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
      if(type === 'Seller'){
        getBuyers()
      }else{
        getSellers()
      }
  }, [type, token])

   const handleClick = ({user, value}) => {
        setAgent(user)
        setView(value)
   }


  return createPortal(
    <>
      <Drawer open={open} anchor="left">
        <Stack  direction={'column'} sx={{width: '300px'}}>
            <div style={{width: '300px', 
            backgroundColor: 'blue',
            position: 'fixed',
            height: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            padding: '5px',
            top: 0
            }}>
            <h2>Chat</h2>
            <button style={{fontSize: '1.5em', 
            padding: '5px', 
            backgroundColor: 'red', 
            color: 'white',
            borderRadius: '0.5em'
            }} onClick={onClose}>X</button>
            </div>           
              <div style={{
                marginTop: '60px',
                paddingLeft: '5px', 
                paddingRight: '5px', 
                display: 'flex',
                overflowY: 'scroll',
                height: '550px', 
                flexDirection: 'column',
                gap: '10px'
                }}>
              {type === 'Buyer' ? (
                sellers.map((seller) => (
                  <div
                    style={{
                      border: '1px solid gray',
                      width: '100%',
                      cursor: 'pointer',
                      color: 'black',
                      height: '60px',
                      padding: '10px',
                      display: view ? 'none' : 'block'
                    }}
                    onClick={() => handleClick({user: seller.username, value: true})}
                  >
                    <p><h2>{seller.username}</h2></p>
                  </div>
                ))
              ) : (
                buyers.map((buyer) => (
                  <div
                    style={{
                      border: '1px solid gray',
                      width: '100%',
                      cursor: 'pointer',
                      color: 'black',
                      height: '60px',
                      padding: '10px',
                      margin: '5px 0',
                      display: view ? 'none' : 'block'
                    }}
                    onClick={() => handleClick({user: buyer.username, value: true})}
                  >
                    <p><h2>{buyer.username}</h2></p>
                  </div>
                ))
              )}
              <div style={{display: view ? 'block' : 'none', cursor: 'pointer'}} onClick={() => setView(false)}><ArrowBackIcon/></div>
              {
                incomingMessages.map((message) => (
                  <div style={{display: view ? 'block' : 'none'}}>
                  <h3>{message.sender}:</h3>
                  <h3>{message.text}</h3>
                  </div>
                ))
              }

                </div>           
             <div style={{
              width: '300px',
              backgroundColor: 'black',
              position: 'fixed',
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50px'
             }}>
             <form className='send-message'>
             <input
              style={{
                  padding: '10px',
                  fontSize: '1em',
              }}
              type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
              ></input>
              <button
              type='submit'
              style={{
                  padding: '11.5px',
              
              }}
              onClick={sendMessage}
              >SEND</button>
             </form>
             </div>
        </Stack>
      
      </Drawer>
    </>,

    document.getElementById('portal')
  );
}

export default Sidebar
