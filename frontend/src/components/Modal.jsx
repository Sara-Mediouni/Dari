import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../functions/Auth";
import { CartContext } from "../functions/CartContext";

export function DialogWithForm({id, category, name, price, image}) {


  const [quantity, setQuantity] = useState(1);
    const {addToCart}=useContext(CartContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const navigate=useNavigate();

  



  const handlechange=()=>{
    navigate('/checkout')
  }

  /*const findcart = () => {
    axios.get(`http://localhost:5000/api/cart/findcart/${user.uid}`)
    .then(function (response) {
      console.log(response);
      setCart(response.data.panier)
     console.log(cart)
     setIdPanier(cart._id)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 */
 
  const handleAddToCart = () => {
    const item={_id:id,name:name,price:price,image:image,category:category}
    addToCart(item, quantity);
   
  };
      
  
  
  useEffect(()=>{
        
      },[])
  


  return (
    <>
      
      <Card className="mx-auto mt-20  font-bold max-w-[50rem] text-white text-white shadow-md rounded-lg">
  <CardBody className="p-6 space-y-8">
    <h1 className="text-center text-3xl font-bold">Order Details</h1>

    <table className="w-full table-auto">
      <thead>
        <tr className="text-left text-lg border-b border-gray-300">
          <th className="pb-3">Product Details</th>
          <th className="pb-3">Quantity</th>
          <th className="pb-3">Total</th>
          <th className="pb-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-200 py-4">
          <td className="py-4">
            <div className="flex gap-4">
              <img src={`http://localhost:5000/images/${image}`} className="w-[90px] rounded-md" />
              <div>
                <div className="font-bold text-lg">{name}</div>
                <div className="text-sm text-gray-600">{category}</div>
                <div className="mt-2 text-green-700 font-semibold">{price} DT</div>
              </div>
            </div>
          </td>
          <td>
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border border-green-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
            >
              {[...Array(9).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </td>
          <td className="text-pink-2 font-bold">{price * quantity} DT</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </CardBody>

  <CardFooter className="border-t border-gray-200 pt-6">
    <div className="grid grid-cols-2 w-full px-6 text-lg">
      <ul className="space-y-4">
        <li>Subtotal</li>
        <li>Shipping</li>
      </ul>
      <ul className="space-y-4 text-right">
        <li>{price * quantity} DT</li>
        <li>7 DT</li>
      </ul>
    </div>

    <div className="flex justify-center items-center mt-10 gap-6">
      <button
        onClick={handlechange}
        className="px-6 py-2 rounded-xl border border-pink-2 text-pink-2 bg-white font-bold hover:bg-green-700 hover:text-white transition"
      >
        Checkout
      </button>
      <button
        onClick={handleAddToCart}
        className="px-6 py-2 rounded-xl border border-green-700 text-white bg-green-700 font-bold  transition"
      >
        Continue Shopping
      </button>
    </div>
  </CardFooter>
</Card>



      
    </>
  );
}
