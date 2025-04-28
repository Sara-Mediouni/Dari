import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { AuthContext } from "../functions/Auth";

import { CartContext } from "../functions/CartContext";
const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [Idorder, setIdOrder] = useState(null);
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { cartTotal, syncCartWithBackend } = useContext(CartContext);

  const handleCheckout = async (userId) => {
    try {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];

      const itemsToSend = localCart.map((item) => ({
        productId: item.item._id,
        quantity: item.item.quantity,
      }));

      const response = await axios.post(
        `http://localhost:5000/api/order/checkout/${userId}`,
        {
          userId,
          items: itemsToSend,
        }
      );

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
    getCart();
  }, []);

  return (
    <div className="bg-green-700 font-general  text-white  border mt-40 border-gray-300 rounded-lg mx-10 my-10 relative">
      {/* Header */}
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-3xl font-bold text-green-700">
          Dari
        </a>
      </div>

      {/* Order Summary */}
      <div className="relative p-10 sm:px-10 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-2xl font-bold">Order Summary</p>
          <p className="text-white">
            Check your items. And select a suitable shipping method.
          </p>

          <div className="mt-8 rounded-lg bg-pink-3 px-2 py-4 sm:px-6 overflow-y-auto h-[400px] w-full">
            <div className="grid gap-4">
              <div className="grid grid-cols-5 gap-x-8 font-semibold text-white">
                <h2>Image</h2>
                <h2>Name</h2>
                <h2>Price</h2>
                <h2>Category</h2>
                <h2>Remove</h2>
              </div>
              <hr className="border-white/20 my-2" />

              {cartItems?.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-x-8 items-center text-white"
                >
                  <img
                    src={`http://localhost:5000/images/${item.item.image}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <p>{item.item.name}</p>
                  <p>$ {item.item.totalPrice}</p>
                  <p>{item.item.category}</p>
                  <button
                    onClick={() => removeFromCart(item.item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-5 justify-items-center my-5 px-12">
        <div className="font-bold text-xl text-white space-y-2">
          <p>Total Order</p>
          <p>Shipping Fee</p>
          <p>Total</p>
        </div>
        <div className="text-white space-y-2">
          <p>TND {cartTotal}</p>
          <p>TND 7</p>
          <p>TND {cartTotal + 7}</p>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="flex  items-center justify-center mb-10">
        <button
          className="bg-green-900 p-5 rounded-full text-white font-bold"
          onClick={() => handleCheckout(user.uid)}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
