import React, { useState } from 'react'
import './styles/Pet.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import { setSeller } from '../features/userSlice';


const Pet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serializedObj = queryParams.get('obj');
  let receivedObj = null;
  if (serializedObj) {
    receivedObj = JSON.parse(decodeURIComponent(serializedObj));
    console.log(receivedObj);
  }

  return (
    <div className='main'>
      <div className='image'>
        <img src={receivedObj.imageUrl} alt={receivedObj.name}></img>
      </div>
      <div className='name'>
        <h1>{receivedObj.name}</h1>
        <h2>{receivedObj.age}</h2>
        <h3>Price:₹{receivedObj.price}</h3>
      </div>
      <div className='info'>
        <table>
          <tbody>
            <tr>
              <td><h3>Breed:</h3></td>
              <td><h3>{receivedObj.breed}</h3></td>
            </tr>
            <tr>
              <td><h3>Weight:</h3></td>
              <td><h3>{receivedObj.weight}</h3></td>
            </tr>
            <tr>
              <td><h3>Height:</h3></td>
              <td><h3>{receivedObj.height}</h3></td>
            </tr>
            <tr>
              <td><h3>Personality</h3></td>
              <td><h3>{receivedObj.personality}</h3></td>
            </tr>
          </tbody>
        </table>
        <h3>Seller: {receivedObj.Seller.username}</h3>
        {token ? (
          <button 
           onClick={() => {
            setIsOpen(true)
            dispatch(setSeller(receivedObj.Seller.username))
            }}>ENQUIRE</button>
        ) : (
          <button onClick={() => toast("You need to logged in to use this feature")}>ENQUIRE</button>
        )}
        <Sidebar  open={isOpen} onClose={() => setIsOpen(false)}></Sidebar>
      </div>
    </div>
  );
};

export default Pet
