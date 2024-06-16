
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
// const AuthContext = createContext();
export const AuthContext = createContext([{}, () => {}])

// Provide the authentication context to children components
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safely retrieve user data from local storage
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage", error);
        localStorage.removeItem("Users");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// Export AuthProvider as default export
export default AuthProvider;



