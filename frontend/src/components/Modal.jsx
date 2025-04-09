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
      
      <Card className="mx-auto mt-20 font-general w-full 
      max-w-[50rem] bg-stone300">
  <CardBody className="flex flex-col gap-4">
    <div className="p-5">
    <h1 className="flex items-center justify-center font-bold text-2xl">Order details</h1>
    
      {/* Tableau des détails du produit */}
      <table className="min-w-full table-auto border-separate border-spacing-y-6">
        <thead className="mb-10">
          <tr className="w-full mt-10">
            <th className="text-lg font-bold w-[40%] text-left">Product Details</th>
            <th className="text-lg font-bold w-[20%] text-left">Quantity</th>
            <th className="text-lg font-bold w-[20%] text-left">Total</th>
            <th className="text-lg font-bold w-[20%] text-left">{' '}</th>
          </tr>
        </thead>
        <tbody className="mt-10">
          <tr className="w-full">
            <td className="text-bold text-lg w-[40%]">
              <div className="flex">
                <img
                  src={`http://localhost:5000/images/${image}`}
                  className="w-[90px] mr-4"
                />
                <div>
                  <div className="text-bold">{name}</div>
                  <div className="text-sm text-green800 mt-1">{category}</div>
                  <div className="mt-5 text-bold text-green900">{price}</div>
                </div>
              </div>
            </td>
       
            <td className="text-bold text-lg w-[40%]">
              <div className="inline-block relative w-16">
                <select
                  onClick={(e) => e.stopPropagation()} // Empêche la propagation de l'événement
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))} // Mise à jour de la quantité
                  className="block appearance-none w-full bg-white border border-green700 hover:border-gray-500
                   px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none
                    focus:shadow-outline"
                >
                  {[...Array(9).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4 text-green700"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </td>
            <td className="w-[20%]">{price*quantity+' DT'}</td>
            

          </tr>
        </tbody>
      </table>

    </div>
  </CardBody>

  {/* Footer */}
  <CardFooter className="pt-0">
    <hr className="w-[80%] border-t mx-20 text-green700" />
    <div className="grid grid-cols-2">
      <ul className="mx-10 text-lg w-2/3">
        <li className="mt-10 ">Subtotal</li>
        <li className="mt-10">Shipping</li>
       
      </ul>
      <ul className="mx-10 text-lg w-1/3">
        <li className="mt-10">{price*quantity+' Dt'}</li>
        <li className="mt-10"> 7 Dt</li>
       
      </ul>
    </div>
    <div className="flex justify-center mx-2 items-center mt-20">
      <button
        className="px-4 py-2 mx-2 w-[30%] rounded-xl border border-green900 text-green900 bg-stone300 hover:border-stone300 hover:bg-green900 hover:text-stone300 transition duration-200"
        onClick={handlechange}
      >
        Checkout
      </button>
      <button   onClick={handleAddToCart} className="px-4 py-2 mx-2 w-[30%] rounded-xl border border-stone300 text-stone300 bg-green900 hover:bg-stone300 hover:text-green900 hover:border-stone300 transition duration-200">
        Continue Shopping
      </button>
    </div>
  </CardFooter>
</Card>


      
    </>
  );
}
