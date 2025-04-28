import React, { useContext, useEffect, useState } from "react";
import { navItems } from "../data";

import { AuthContext } from "../functions/Auth";

import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { CartContext } from "../functions/CartContext";
import { MdDeleteForever } from "react-icons/md";
import { assets } from "../assets/assets";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCartMenu, setShowCartMenu] = useState(false);

  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useContext(CartContext);
  const { cartTotal, setCartItems } = useContext(CartContext);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      console.log("Disconnected !");
      navigate("/");
    } catch (error) {
      console.error("Error while disconnecting :", error);
    }
  };

  const handlesignup = async () => {
    try {
      navigate("/signup");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    // Charger les items depuis localStorage au premier chargement
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCartItems(storedCart); // Si des items existent dans localStorage, les charger
    }
  }, []);

  /*const removeItemFromCart = (IdArt) => {
      axios.post(`http://localhost:5000/api/cart/removecart/${IdArt}/${idPanier}`, {
       
      })
      .then(function (response) {
        console.log(response.data);
        
        getCart();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
/*
  const getCart = () => {
    
    axios
      .get(`http://localhost:5000/api/cart/findcart/${user?.uid}`)

      .then((response) => {
        console.log(response.data.panier);
        setOrder(response.data.panier);
        setidPanier(order[0]._id);
        console.log(idPanier)
      })
      .catch((error) => {
        console.error(error);
      });
  };*/
  const syncCartWithBackend = async (userId) => {
    try {
      const payload = {
        userId,
        items: cartItems.map((item) => ({
          productId: item.item._id,
          quantity: item.item.quantity,
        })),
      };

      const response = await axios.post(
        "http://localhost:5000/api/cart/sync",
        payload
      );
      console.log("✅ Panier synchronisé :", response.data);
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation du panier :", error);
    }
  };
  const handleRemoveCart = (id) => {
    removeFromCart(id);
  };

  useEffect(() => {
    // Cela peut être utile si tu veux faire quelque chose chaque fois que le panier change
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  return (
    <>
    <nav className="fixed top-4 inset-x-0 z-50 px-4">
  <div className="max-w-[90vw] bg-green-900 md:max-w-5xl md:mx-auto flex items-center justify-between bg-opacity-90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
    
    {/* LEFT SIDE */}
    <div className="flex items-center gap-4">

      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" className="h-8 w-8 object-contain" />
        <span className="text-white font-bold text-lg hidden md:block">Dari</span>
      </a>

      {/* Mobile menu */}
      <div className="md:hidden relative">
        <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 rounded-lg text-white">
          <HiOutlineMenuAlt3 size={24} />
        </button>

        {showMobileMenu && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            {navItems.map((navItem, idx) => (
              <a key={idx} href={navItem.link} className="block px-4 py-2 text-green-700 hover:bg-violet-100">
                {navItem.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Full nav links */}
      <div className="hidden md:flex items-center gap-3">
        {navItems.map((navItem, idx) => (
          <a key={idx} href={navItem.link} className="flex items-center gap-2 px-3 py-2 rounded-lg text-white hover:bg-pink-1 transition-colors">
            <span className="text-sm font-semibold">{navItem.name}</span>
          </a>
        ))}
      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3 relative">
      {user ? (
        <>
          {/* Profile */}
          <div className="relative">
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="p-1 rounded-full hover:bg-pink-1 transition-colors">
              <CgProfile size={25} className="text-white" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg ring-1 ring-green-700 ring-opacity-5 z-50">
                <a href="/myorders" className="block px-4 py-2 text-green-700 hover:bg-gray-100">Orders</a>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-green-700 hover:bg-gray-100">Logout</button>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <button onClick={() => setShowCartMenu(!showCartMenu)} className="rounded-full">
              <IoBagOutline size={25} className="text-white" />
            </button>

            {showCartMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg ring-1 ring-opacity-5 z-50 p-4">
                <h3 className="text-lg font-bold text-center mb-3">Cart</h3>
                <div className="h-40 overflow-y-auto space-y-3">
                  {cartItems?.length > 0 ? (
                    cartItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={`http://localhost:5000/images/${item.item.image}`} alt={item.item.name} className="w-12 h-12 rounded-md object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm truncate">{item.item.name}</p>
                          <p className="text-xs text-gray-500">{item.item.quantity} pcs</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-medium">{item.item.totalPrice} DT</p>
                          <button onClick={() => handleRemoveCart(item.item._id)}>
                            <MdDeleteForever size={20} className="text-gray-500 hover:text-red-600 transition-colors" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Empty cart</p>
                  )}
                </div>

                {cartItems?.length > 0 && (
                  <div className="mt-4 text-center font-semibold">
                    Total: {cartTotal} DT
                  </div>
                )}

                <div className="mt-4 flex justify-center">
                  <a href="/checkout" onClick={() => syncCartWithBackend(user.uid)} className="bg-green-900 text-white px-4 py-2 rounded-lg hover:bg-pink-3 font-bold transition-colors">
                    Checkout
                  </a>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <button onClick={handlesignup} className="rounded-full transition-colors">
          <CgProfile size={28} className="text-white" />
        </button>
      )}
    </div>

  </div>
</nav>

    </>
  );
};

export default Navbar;
