
import React, { useContext, useEffect, useState } from "react";


import image from '../assets/images/sidi-bou-said-tunisie.jpg'
import { useNavigate } from "react-router-dom";
import { AuthContext} from "../functions/Auth";
import { toast } from "react-toastify";
import axios from "axios";



export function SignUp() {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate(); // Hook de navigation
  const { signUp  } = useContext(AuthContext);
   const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      // Crée un UID via Firebase Auth (si nécessaire)
      const uid = await signUp(name, email, password); // Prend l'UID de Firebase
      toast.success("Account Created")
      navigate("/")
    
      const userData = {
        name,
        email,
        password,
        uid,
      };
  
      await axios.post("http://localhost:5000/api/user/signup", userData)
      .then((response)=>{
        console.log(response)
        
      navigate("/signin");
      }).catch ((err)=>{
      console.err("Error: ", err);
  
      } )
    
    
    
    
    }
      catch(err){
      // Si c'est une erreur Firebase
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('This email is already used.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak.');
            break;
          default:
            setError('An unexpected Firebase error occurred.');
            break;
        }}
        else if (error.response) {
          setError(error.response.data.message || 'Server error.');
        } 
        // Si c'est autre chose (très rare)
        else {
          setError('Something went wrong.');
        }
      // Prépare les données à envoyer à MongoDB
      
      // Si c'est une erreur Axios (backend)
    }
  }
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // or setError('') if you prefer
      }, 5000); // 3000ms = 3 seconds

      return () => clearTimeout(timer); // Clean up the timer if component unmounts
    }
  }, [error]);
  
 
  return (
   
    <div className="flex flex-col items-center my-10">
    <div className="grid grid-cols-1 md:grid-cols-2 border-green-900 border-4  shadow-lg my-20 w-[90%] max-w-4xl rounded-2xl bg-white dark:text-white overflow-hidden">
      
      {/* Partie Formulaire */}
      <div className="p-8 flex flex-col justify-center">
        <h2 className="text-3xl  text-green-700 ">
          Welcome to Dari
        </h2>
       
  
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label className="text-sm  font-medium text-green-700 ">
              First Name
            </label>
            <input
            required
              className="w-full rounded-lg h-[45px] text-black border border-green-900 p-4 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-green-700 ">
              Email Address
            </label>
            <input
            required
              className="w-full rounded-lg  text-black h-[45px] border border-green-900 p-4 focus:outline-none focus:ring-2 focus:ring-white"
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
              className="w-full rounded-lg text-black h-[45px] border border-green-900 p-4 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
              <div className="mt-4 p-3 text-red-600 bg-red-100 rounded-lg text-center">
                {error}
              </div>
            )}
          <div className="relative text-center">
            <a href="/signin" className="text-green-700 text-sm hover:underline">
              Already have an account?
            </a>
          </div>
  
          <div className="flex justify-center mt-6">
            <button type="submit" className="p-4 bg-green-900 text-white rounded-full">
             Sign up
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
  
  );
}


