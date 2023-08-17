import React, { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Tokens = localStorage.getItem("authTokens");
    if (Tokens === "" || Tokens === null) {
      logout();
    } else {
      setRefresh(JSON.parse(Tokens));
      setUser(jwt_decode(Tokens).user_id);
    }
  }, []);

  async function updatetoken() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/refresh/",
        {
          refresh: refresh.refresh,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        localStorage.setItem(
          "authTokens",
          JSON.stringify({ access: response.data.access, refresh: refresh.refresh })
        );
        setRefresh({ access: response.data.access, refresh: refresh.refresh });
      }
    } catch (error) {
      logout();
    }
  }

  useEffect(() => {
    let Time = 1000 * 60 * 60 * 5;

    let interval = setInterval(() => {
      let Tok = localStorage.getItem("authTokens");
      console.log('check')
      if (Tok === null || Tok === "") {
        logout();
      }
      setRefresh(JSON.parse(Tok));
      if (refresh) {
        updatetoken();
      } else {
        logout();
      }
    }, Time);
    return () => clearInterval(interval);
  }, [refresh,navigate]);

  function logout() {
    localStorage.removeItem("authTokens");
    localStorage.clear();
    navigate("/auth/login/");
  }

  const value = {
    user,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
