import React, { Children, createContext, useEffect, useState } from 'react'
import api, { clearAccessToken, refreshAccessToken, setAccessToken } from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await refreshAccessToken();

        const response = await api.get("/users/me");

        setUser(response.data.data.user);
      } catch(error){
        clearAccessToken();
        setUser(null);
      } finally{
        setLoading(false);
      }
    }; 
     restoreSession();  
  },[]);

  const login = async (email,password) => {
    const response = await api.post("/auth/login",{
      email,
      password
    });
    const {accessToken , data} = response.data;

    setAccessToken(accessToken);
    setUser(data.user);

    return data.user;
  };

  const register = async (name , email,password) => {
    const response = await api.post("/auth/register",{
      name,
      email,
      password
    })
    const {accessToken,data} = response.data;
    setAccessToken(accessToken);
    setUser(data.user);

    return data.user;
  };

  const logout = async() => {
    try {
      await api.post("/auth/login");
    } finally{
      clearAccessToken();
      setUser(null);
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      clearAccessToken();
      setUser(null);
    };
    window.addEventListener("auth:logout",handleLogout);

    return () => {
      window.removeEventListener("auth:logout",handleLogout);
    }
  },[]);

  return (
    <AuthContext.Provider
    value = {{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  return useContext(AuthContext);
}
