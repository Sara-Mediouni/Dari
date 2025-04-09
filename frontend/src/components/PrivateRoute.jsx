// PrivateRoute.js
import { useContext } from "react";
import { AuthContext } from "../functions/Auth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return <Loader/>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/signin" />;
};



PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;