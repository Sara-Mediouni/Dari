import React, { useContext, useEffect, useRef, useState } from "react";
import { navItems } from "../data";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { gsap } from "gsap";
import { useWindowScroll } from "react-use";
import { RiLogoutBoxRFill } from "react-icons/ri";

import { MdLogout, MdOutlineInventory2 } from "react-icons/md";
import { AuthContext } from "../functions/Auth";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/Hovercard";
import MagicButton from "../ui/MagicButton";
import { FaShoppingBag } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../functions/CartContext";
import { MdDeleteForever } from "react-icons/md";

const Navbar = () => {
  const [order, setOrder] = useState(null);
  const { logOut, user } = useContext(AuthContext);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { y: currentScrollY } = useWindowScroll();
  const navContainerRef = useRef(null);
  const [idPanier, setidPanier] = useState();
  const [lastScrollY, setLastScrollY] = useState(0);
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
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);
  useEffect(() => {
      // Charger les items depuis localStorage au premier chargement
      const storedCart = JSON.parse(localStorage.getItem('cart'));
      if (storedCart) {
        setCartItems(storedCart);  // Si des items existent dans localStorage, les charger
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
  
      const response = await axios.post('http://localhost:5000/api/cart/sync', payload);
      console.log("✅ Panier synchronisé :", response.data);
    } catch (error) {
      console.error("❌ Erreur lors de la synchronisation du panier :", error);
    }}
  const handleRemoveCart = (id) => {
    removeFromCart(id);
  };
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });

    console.log(order);
  }, [isNavVisible]);
  useEffect(() => {
    // Cela peut être utile si tu veux faire quelque chose chaque fois que le panier change
    console.log("Cart updated:", cartItems);
  }, [cartItems]);

  return (
    <>
      <div className="relative flex justify-center items-center">
        <div
          ref={navContainerRef}
          className="flex text-bold max-w-fit md:min-w-[70vw]
         lg:min-w-fit fixed z-[5000] top-10 inset-x-0 
         mx-auto px-10 py-5 rounded-lg border
          border-stone300 
          shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4"
        >
          {navItems.map((navItem, idx) => (
            <a
              key={`${idx}`}
              href={navItem.link}
              className="relative font-Rangile font-bold dark:text-white items-center flex space-x-1 text-white dark:hover:text-white hover:text-white"
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="!cursor-pointer text-sm">{navItem.name}</span>
            </a>
          ))}
        </div>
        <div className="fixed justify-center right-[50px] z-[5000] top-[50px] flex items-center">
          {user ? (
            <>
              <div className="grid grid-cols-2 gap-10">
                <Menu as="div" className="relative text-left">
                  <div>
                    <MenuButton className="inline-flex w-[full] justify-center  rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ">
                      <CgProfile size={30} color="white" />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0  mt-2 w-42 rounded-md bg-white shadow-lg ring-black/5 focus:outline-hidden  "
                  >
                    <div className="py-1">
                      <MenuItem>
                        <a
                          href="/myorders"
                          className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          <FaClipboardList size={20} color="#87986a" /> Orders
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          onClick={handleLogout}
                          className="flex gap-2 px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                          <RiLogoutBoxRFill size={20} color="#87986a" /> Logout
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <button>
                      <FaShoppingBag size={30} color="white" />
                    </button>
                  </HoverCardTrigger>

                  <HoverCardContent className="w-80 p-3 m-2">
                    <span className="flex justify-center items-center font-bold font-Rangile text-2xl m-4">
                      Cart
                    </span>
                    <div className="overflow-y-auto h-[200px] overflow-x-hidden">
                      {cartItems && cartItems?.length > 0 ? (
                        cartItems.map((item, index) => (
                          <div className="" key={index}>
                            <div className="grid relative grid-cols-2 mt-10">
                              <img
                                className="h-[100px] w-[100px] mx-5"
                                src={`http://localhost:5000/images/${item.item.image}`}
                                alt={item.name}
                              />
                              <div className="flex justify-start items-start relative font-general text-md ">
                                <ul>
                                  <li className="my-2 font-bold text-lg">
                                    <span className="words-wrap ">
                                      {item.item.name}
                                    </span>
                                  </li>
                                  <li className="my-2 ">
                                    <span className="words-wrap ">
                                      {item.item.quantity}
                                    </span>
                                  </li>

                                  <li className="my-2 grid grid-cols-2 gap-10">
                                    <span>{item.item.totalPrice + " DT"}</span>{" "}
                                    <button
                                      onClick={() =>
                                        handleRemoveCart(item.item._id)
                                      }
                                    >
                                      <MdDeleteForever
                                        size={25}
                                        color="#87986a"
                                      />
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>Empty cart</div>
                      )}{" "}
                    </div>
                    {cartItems && cartItems?.length > 0 ? (
                      <span className="flex items-center justify-center mt-10 text-lg font-bold">
                        Total ${cartTotal}
                      </span>
                    ) : (
                      <></>
                    )}

                    <div className="justify-center relative flex items-center m-6">
                      <a
                        href="/checkout"
                        onClick={() => syncCartWithBackend(user.uid)}
                      >
                        {" "}
                        <MagicButton name="checkout" />
                      </a>
                    </div>
                  </HoverCardContent>
                </HoverCard>{" "}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-10">
              <button onClick={handlesignup}>
                <CgProfile size={30} color="white" />
              </button>
            </div>
          )}
          <></>
        </div>
      </div>
    </>
  );
};

export default Navbar;
