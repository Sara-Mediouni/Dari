import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../functions/Auth'






const Orders = () => {
      const [orders, setOrders] = useState([])
      const {user}=useContext(AuthContext)
      const getOrders=async()=>{
        axios.get(`http://localhost:5000/api/order/getorders/${user.uid}`)
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      
      }
  useEffect(()=>{
    getOrders()
    console.log(orders);
    
  },[])


  return (
    <div className='mx-30 text-green-700 mt-40 h-[500px] py-40 relative flex justify-start items-start bg-green900'>
   
   <div className='grid grid-rows relative -mt-20'>
    <div className='px-5 font-bold text-xl text-stone300 mx-5 grid gap-x-12 grid-cols-5 w-full h-full'>
     <p>Items</p>
     <p> Status</p>
     <p> Total Price</p>
     <p> Expected delivery date</p>
     <p>Track Order</p>
    </div>
    <hr/>
    {orders.map((order, index)=>{return(
       <div key={index} className='p-5 m-5 grid gap-12 grid-cols-5 w-full h-full'>
     <ul>
     {order.items.map((i,index)=>
    
    {return(
      <div className='grid grid-cols-2 font-bold gap-2'>
      <li  key={index}>{i.item.item}</li>
      <span className='mx-5'> {i.quantity}</span>
        </div>)})}</ul> 
      
        
      
   
     <p> {order.status}</p>
     <p> ${order.TotalPrice}</p>
     <p> {order.deliveryDate}</p>
     <p><button className='text-stone300 font-bold'>Track Order</button></p>
    </div>)})}
    <hr/>
   
</div>
    </div>
  )
}

export default Orders