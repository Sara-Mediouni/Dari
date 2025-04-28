import { auth, db } from "../firebase";
import { onAuthStateChanged,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

const [loading, setLoading] = useState(true);
const [user, setUser] = useState(null);

const addUserToDatabase = async (uid, name, email) => {
    try {
      await setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        createdAt: new Date()
      });
      console.log("Utilisateur ajouté à Firestore");
    } catch (error) {
      console.error("Erreur lors de l'ajout à Firestore :", error);
    }
  };
  const signUp = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Utilisateur created successfully :", user);
  
      // Ajouter l'utilisateur à Firestore
      await addUserToDatabase(user.uid, name, email);
      
      return user.uid; // 👈 Retourne l'UID de l'utilisateur
    } catch (error) {
      console.error("Error while signing up :", error.message);
      throw error; // 👈 Relancer l'erreur pour qu'elle soit captée dans le handleSubmit
    }
};
  
  // Fonction de connexion
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Utilisateur connecté :", user);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.message);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Utilisateur déconnecté");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authValue = {signIn, signUp, logOut, addUserToDatabase ,user , loading}
  return (
    <AuthContext.Provider value={authValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
  
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;