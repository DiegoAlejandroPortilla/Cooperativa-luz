import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, registerRequestRRHH, loginRequest, verifyTokenRequest, getUsuariosRequest } from "../api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      console.log(res.data);
    } catch (error) {
      console.log(error)
      setErrors(error.response.data);
    }
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      return res;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const signuprrhh = async (user) => {
    try {
      const res = await registerRequestRRHH(user);
      setUser(res.data);
      return res;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  const getUsuarios = async () => {
    try {
      const res = await getUsuariosRequest();
      return res;
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await  verifyTokenRequest(cookies.token);
        //console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };
 
  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
        signin,
        logout,
        signuprrhh,
        getUsuarios,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext