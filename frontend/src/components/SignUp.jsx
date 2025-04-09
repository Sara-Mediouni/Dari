
import React, { useContext, useState } from "react";
import { Label } from "../ui/label";
import clsx from "clsx";
import MagicButton from "../ui/MagicButton";
import image from '../assets/images/sidi-bou-said-tunisie.jpg'
import { useNavigate } from "react-router-dom";
import { AuthContext} from "../functions/Auth";
import { Bounce, toast } from "react-toastify";
import axios from "axios";



export function SignUp() {


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate(); // Hook de navigation
  const { signUp  } = useContext(AuthContext);
 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      // Crée un UID via Firebase Auth (si nécessaire)
      const uid = await signUp(name, email, password); // Prend l'UID de Firebase
  
      // Prépare les données à envoyer à MongoDB
      const userData = {
        name: name,
        email: email,
        password: password,
        uid: uid
      };
  
      console.log("Données envoyées à MongoDB : ", userData); // Debug pour vérifier les données
  
      // Envoie les données à MongoDB
      const response = await axios.post("http://localhost:5000/api/user/signup", userData);
      
      console.log("Réponse de MongoDB : ", response); // Debug pour vérifier la réponse
      
      // Affiche une notification de succès
      toast.success('Inscription réussie!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      
      // Redirige l'utilisateur vers la page de connexion
      navigate("/signin");
      
    } catch (error) {
      console.error("Erreur lors de l'inscription : ", error); // Affiche l'erreur
      toast.error(error.message || "Erreur d'inscription", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  
 
  return (
   
   
<div className="grid grid-cols-2 shadow-lg my-40 w-[80%] max-w-4xl rounded-2xl bg-white dark:bg-stone300 overflow-hidden">
  {/* Partie Formulaire */}
  <div className="p-8 flex flex-col justify-center">
    <h2 className="text-3xl font-Rangile text-green700 dark:text-neutral-200">
      Welcome to Dari
    </h2>
    <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300"></p>

    <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
      <LabelInputContainer>
        <Label htmlFor="Name">First name</Label>
        <input
          id="Name"
          className="w-full rounded-lg h-[45px] border border-stone300 p-5"
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </LabelInputContainer>

      <LabelInputContainer>
        <Label htmlFor="email">Email Address</Label>
        <input
          id="email"
          placeholder="Email"
          className="w-full rounded-lg h-[45px] border border-stone300 p-5"
          onChange={(e) => setEmail(e.target.value)}
        />
      </LabelInputContainer>

      <LabelInputContainer>
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          className="w-full rounded-lg h-[45px] border border-stone300 p-5"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </LabelInputContainer>
      <div className="relative">
       <a href='/signin' className="text-green900 my-2 mx-2">Already having account?</a></div>
      <div className="flex justify-center mt-6">
       <button type="submit"><MagicButton name="Sign up" /></button> 
      </div>
    </form>
  </div>

  {/* Partie Image */}
  <div className="relative">
    <img
      src={image}
      className="h-full w-full object-cover"
      alt="Illustration"
    />
  </div>
</div>

  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={clsx("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
