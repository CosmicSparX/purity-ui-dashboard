import React, { createContext, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const history = useHistory();

  // Function to decode JWT and set user role
  const decodeAndSetUserRole = (token) => {
    try {
      const decoded = jwtDecode(token);
      // Assuming your JWT has a 'roles' array claim
      const role =
        decoded.roles && decoded.roles.length > 0 ? decoded.roles[0] : null;
      setUserRole(role);
      return role;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      setUserRole(null);
      return null;
    }
  };

  // Login function
  const login = (token) => {
    setAccessToken(token);
    const role = decodeAndSetUserRole(token);
    // Optionally, store token in sessionStorage for persistence across tabs/reloads
    // sessionStorage.setItem('accessToken', token);
    return role;
  };

  // Logout function
  const logout = () => {
    setAccessToken(null);
    setUserRole(null);
    // sessionStorage.removeItem('accessToken');
    history.push("/auth/signin"); // Redirect to login page on logout
  };

  return (
    <AuthContext.Provider value={{ accessToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
