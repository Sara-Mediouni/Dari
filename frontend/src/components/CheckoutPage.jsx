import React, { useContext, useEffect, useState } from "react";
import MagicButton from "../ui/MagicButton";
import axios from "axios";
import { AuthContext } from "../functions/Auth";
import { CardItem } from "../ui/card";
import { CartContext } from "../functions/CartContext";
const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [Idorder, setIdOrder] = useState(null);
  const {cartItems, removeFromCart}=useContext(CartContext)
  const {cartTotal, syncCartWithBackend}=useContext(CartContext)
 
const handleCheckout = async (userId) => {
  try {
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];

    const itemsToSend = localCart.map(item => ({
      productId: item.item._id,
      quantity: item.item.quantity,
    }));

    const response = await axios.post(`http://localhost:5000/api/order/checkout/${userId}`, {
      userId,
      items: itemsToSend,
    });

    if (response.data && response.data.session_url) {
      window.location.href = response.data.session_url; // Rediriger vers Stripe Checkout
    }
  } catch (error) {
    console.error("Erreur lors du checkout:", error);
    alert("❌ Une erreur est survenue lors du paiement.");
  }
};

  const getCart = () => {
    
    axios
      .get(`http://localhost:5000/api/order/getorders/${user.uid}`)

      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
        console.log(order);
        setIdOrder(order._id);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
   
   getCart()
  }, []);

  return (
    <div className="bg-stone300 w-full text-black font-general border mt-40 border-stone300 rounded-lg m-20 relative justify-center">
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-3xl font-Rangile text-green900">
          Dari
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    
      <div className=" relative sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 p-12">
        <div className="px-4 pt-8">
          <p className="text-2xl font-bold">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div
            className="mt-8  rounded-lg border-stone300 bg-green700 
    px-2 py-4 sm:px-6 overflow-y-auto h-[400px] w-full "

          > 

<div className="grid grid-rows gap-x-16 gap-y-4 ">
          <div className="grid grid-cols-5 gap-x-16 gap-y-4 ">
          <h2>Image</h2>
          <h2>Name</h2>
          <h2>Price</h2>
          <h2>Category</h2>
          <h2>remove</h2>
          </div>
          <span className="w-full relative"><hr/></span>
          {cartItems?.map((item, index)=>{

          return(
          <div key={index} className="grid grid-cols-5 gap-x-16 gap-y-4 ">
          <p><img src={`http://localhost:5000/images/${item.item.image}`}/></p>
          <p>{item.item.name}</p>
          <p>{item.item.totalPrice}</p>
          <p>{item.item.category}</p>
          <a onClick={()=>removeFromCart(item.item._id)}>x</a>
          </div>
          )})}
          
          
         
          </div>
          
           
          </div>

     
        </div>
       
      </div>
     
        <div className="relative grid grid-cols-2 gap-y-10 gap-x-5 justify-items-center m-5">
        <div className="font-bold text-xl">
        <p>Total Order</p>
        <p>Shipping Fee</p>
        <p>Total</p></div>
        <div>
          <p>$ {cartTotal}</p>
          <p>$ 7</p>
          <p>$ {cartTotal+7}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center my-10">
      <button onClick={() => handleCheckout(user.uid)}> 
      <MagicButton name="Proceed to payment" />
      </button></div>
      </div>
  );
};

export default CheckoutPage;
