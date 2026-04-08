import { createContext, useEffect, useState } from "react";
import { axios } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/user")
        .then((result) => {
          setUser(result.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (userData) => {
    const result = await axios.post("/login", userData);
    localStorage.setItem("token", result.data.token);
    setUser(result.data.user);
  };

  const register = async (userData) => {
    const result = await axios.post("/register", userData);
    localStorage.setItem("token", result.data.token);
    setUser(result.data.user);
  };

  const logout = () => {
    axios
      .post("/logout")
      .then(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
