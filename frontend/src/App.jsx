import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; // 👈 Ajout de useLocation
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Pastry from "./components/Pastry";
import CheckoutPage from "./components/CheckoutPage";
import Clothes from "./components/Clothes";
import Deco from "./components/Decoration";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./functions/Auth";
import Verify from "./components/Verify";
import Orders from "./components/Orders";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutUs";

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // 👈 Récupérer l'URL actuelle
  console.log(user);

  // Vérifier si on est sur les pages SignIn ou SignUp
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <main className="flex-grow overflow-x-hidden">
      <ToastContainer />
      {/* Afficher Navbar SEULEMENT si ce n'est PAS une page d'auth */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/pastry" element={<Pastry />} />
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        <Route path="/deco" element={<Deco />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/myorders" element={<Orders />} />
      </Routes>

      {/* Afficher Footer SEULEMENT si ce n'est PAS une page d'auth */}
      <Footer />
    </main>
  );
}

export default App;
