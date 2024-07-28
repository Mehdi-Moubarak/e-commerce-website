import { createContext, useEffect, useState } from "react";
import { axios } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("/user").then((result) => {
        setUser(result.data);
      });
    }
  }, []);

  const login = (userData) => {
    axios
      .post("http://127.0.0.1:8000/api/login", userData)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        setUser(result.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const register = async (userData) => {
    await axios
      .post("http://127.0.0.1:8000/api/register", userData)
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        setUser(result.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    axios
      .post("/logout")
      .then(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
