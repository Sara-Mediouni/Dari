import React, { useEffect } from 'react'

import {useNavigate, useSearchParams} from 'react-router-dom'

import axios from 'axios';


const Verify = () => {
    const [searchParams, setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get('orderId');
    const navigate=useNavigate();
    
    const verifyPayment=async()=>{
    const response=await axios.post("http://localhost:5000/api/order/verify",{success,orderId})
    if (response.data.success){
     localStorage.removeItem('cart');
     navigate("/myorders")
    }
    else{
        navigate("/checkout")
    }
    }

    useEffect(()=>{
        verifyPayment();
    })


  return (
    <div>
     
    </div>
  )
}

export default Verify