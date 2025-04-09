import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import { assets } from '../../assets/assets';


const Orders = ({url}) => {
  const [orders, setOrders]=useState([]);
  const fetchAllOrders=async()=>{
     axios.get(url+"/api/order/getallorders")
     .then(function (response) {
      console.log(response.data);
      setOrders(response.data)
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  
  



   const statusHandler=async(e, orderId)=>{
     const response=await axios.post(url+'/api/order/status',{
      orderId,
      status:e.target.value
     })
     if (response.data.success){
      await fetchAllOrders();
     }
     else{
      toast.error("Error");
     }
   }


  useEffect(()=>{
    fetchAllOrders()
  },[])
  return (
    <div className='order add'>
      <h3>Orders Page</h3>
      <div className='order-list'>
      {orders.map((order, index)=>{
        return(
        <div key={index} className='order-item'>
         <img src={assets.parcel_icon} alt=""/>
         <div>
         <p className='order-item-food'>
         {order.items.map((item, index)=>{
          if (index===order.items.length-1){
            return item.item.item+ "X" +item.quantity
          }
          else{
            return item.item.item+"X"+item.quantity+", "
          }

         })}

         </p>
         <p className='order-item-name'>{order.userInfo.email}</p>

         
         <p className='order-item-phone'>{order.deliveryDate}</p>
         <p className='order-item-phone'>{order.payment}</p>
         </div>
         <p>Items: {order.items.length}</p>
         <p>${order.TotalPrice}</p>
         <select onChange={(e)=>statusHandler(e, order._id)} value={order.status}>
          <option value="Order Processing">Order Processing</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
         </select>
        </div>
      )})}

      </div>
    </div>
  )
}

export default Orders