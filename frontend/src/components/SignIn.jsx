import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../functions/Auth';
import { useNavigate } from 'react-router-dom';
import image from '../assets/images/sidi-bou-said-tunisie.jpg'

import { toast } from "react-toastify";
export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('')
  const navigate = useNavigate(); 
  
    const { signIn  } = useContext(AuthContext);
    const handleSubmit = async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
      try {
        await signIn(email, password);
        toast.success('Connected!');
        navigate("/");
      } catch (err) {
        switch (err.code) {
          case 'auth/user-not-found':
            setError("Account doesn't exist");
            break;
          case 'auth/wrong-password':
            setError("Incorrect password");
            break;
          case 'auth/invalid-email':
            setError("Invalid email address");
            break;
          default:
            setError("Something went wrong. Please try again.");
        }
      }
    };
    
 useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // or setError('') if you prefer
      }, 5000); // 3000ms = 3 seconds

      return () => clearTimeout(timer); // Clean up the timer if component unmounts
    }
  }, [error]);
  
  return (
    <div className="flex flex-col items-center my-10 ">
       <div className="grid grid-cols-1 md:grid-cols-2 border-green-900 border-4 shadow-lg my-20 w-[90%] max-w-4xl rounded-2xl bg-white dark:text-white overflow-hidden">
         
         {/* Partie Formulaire */}
         <div className="p-8 flex flex-col justify-center">
           <h2 className="text-3xl  text-green-700 ">
             Welcome Back
           </h2>
          
     
           <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
             
     
             <div className="flex flex-col space-y-2">
               <label className="text-sm  font-medium text-green-700 ">
                 Email Address
               </label>
               <input
               required
                 className="w-full rounded-lg text-black h-[45px] border border-green-900 p-4 focus:outline-none focus:ring-2 focus:ring-white"
                 placeholder="Email"
                 type="email"
                 onChange={(e) => setEmail(e.target.value)}
               />
             </div>
     
             <div className="flex flex-col space-y-2">
               <label className="text-sm font-medium text-green-700 ">
                 Password
               </label>
               <input
                 className="w-full rounded-lg text-black h-[45px] border border-green-900 p-4 focus:outline-none focus:ring-2 "
                 placeholder="Password"
                 type="password"
                 
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
             </div>
             
             <div className="relative text-center">
               <a href="/signup" className="text-green-700 text-sm hover:underline">
                 Don't have an account, yet?
               </a>
             </div>
             {error && (
              <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-lg text-center">
                {error}
              </div>
            )}
             <div className="flex justify-center mt-6">
               <button type="submit" className="p-4 bg-green-900 text-white rounded-full">
               Login
               </button>
             </div>
           </form>
         </div>
     
         {/* Partie Image */}
         <div className="relative md:block">
           <img
             src={image}
             className="h-64 md:h-full w-full object-cover"
             alt="Illustration"
           />
         </div>
       </div>
     </div>
  )
}



