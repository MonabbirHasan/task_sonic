import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage
  useEffect(() => {
    const loadUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("user_data"));
      if (savedUser) {
        setAuthUser(savedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Set user data and store it in localStorage
  const login = (userData) => {
    localStorage.setItem("user_data", JSON.stringify(userData));
    setAuthUser(userData);
    setIsAuthenticated(true);
    return { success: true, user: userData };
  };

  // Clear user data from localStorage and state
  const logout = () => {
    localStorage.removeItem("user_data");
    setAuthUser(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  // return context values
  return (
    <AuthContext.Provider value={{ authUser, isAuthenticated, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
