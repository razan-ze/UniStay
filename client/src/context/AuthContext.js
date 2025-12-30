import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUserState] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  // Helper to set user in state AND localStorage
  const setUser = (userData) => {
    setUserState(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };


  // LOGIN
  const login = async (username, password, role) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password,
        role,
      });

      if (res.data.success) {
        const loggedUser = res.data.user;
        if (loggedUser.role !== role) {
          alert(`No account found for role: ${role}`);
          return false;
        }
        setUser(loggedUser); // persist in localStorage too
        return true;
      }
      alert("Invalid credentials");
      return false;
    } catch (err) {
      console.error(err);
      alert("Login failed");
      return false;
    }
  };

  
  // SIGNUP
  const signup = async (username, password, role, address, phone) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        username,
        password,
        role,
        address,
        phone,
      });

      if (res.data.success) {
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };


  // LOGOUT
  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
