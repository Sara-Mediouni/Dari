import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./Auth";

// CartContext.js
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState(() => {
      // Récupérer les articles du panier depuis localStorage (si présents)
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : []; // Si il y a des articles dans le localStorage, on les charge
    });
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    // Sauvegarder les articles dans le localStorage chaque fois que cartItems change
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
 
  useEffect(() => {
   
    const total = cartItems.reduce((total, item) => total + item.item.totalPrice, 0);
    setCartTotal(total);
     localStorage.setItem('cart', JSON.stringify(cartItems)); 
     // Met à jour le total
  }, [cartItems]);


  
  const addToCart = (newItem, selectedQuantity) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.item._id === newItem._id);
      if (existingItem) {
        return prev.map((item) =>
          item.item._id === newItem._id
            ? {
                ...item,
                item: {
                  ...item.item,
                  quantity: item.item.quantity + selectedQuantity, // Met à jour la quantité dans item
                  totalPrice: (item.item.quantity + selectedQuantity) * newItem.price, // Calcule le totalPrice dans item
                },
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            item: {
              _id: newItem._id,
              category:newItem.category,
              name: newItem.name,
              price: newItem.price,
              image: newItem.image,
              quantity: selectedQuantity,
              totalPrice: selectedQuantity * newItem.price, // Définit totalPrice dans item
            },
          },
        ];
      }
    });
  
    console.log(cartItems); // ⚠️ Affiche la version ancienne du panier à cause de l'asynchrone
  };
  

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.item._id !== itemId));
  };
  

  const clearCart = () => setCartItems([]);

  const syncCartWithBackend = async (id) => {
    try {
      const promises = cartItems.map((item) =>
        axios.post('http://localhost:5000/api/cart/createcart', {
          quantity: item.item.quantity,
          productId: item.item._id,
          userId: id,
        })
      );
      
      // Attendre que toutes les requêtes soient terminées
      const responses = await Promise.all(promises);
      responses.forEach((response) => {
        console.log(response);
      });
    } catch (error) {
      console.error("Erreur lors de la synchronisation du panier", error);
    }
  };
     
      
    
      
      
  

  return (
    <CartContext.Provider value={{ cartItems,setCartItems,cartTotal, addToCart, removeFromCart, clearCart, syncCartWithBackend }}>
      {children}
    </CartContext.Provider>
  );
};
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;