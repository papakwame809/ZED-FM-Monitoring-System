import { useState } from "react";
import AuthContext from "./AuthContext";


export function AuthProvider({ children }) {

  const [user, setUser] = useState({
    name: "Papa Kwame",
    role: "Admin",
  });


  function login() {

    setUser({
      name: "Papa Kwame",
      role: "Admin",
    });

  }


  function logout() {

    setUser(null);

  }


  return (

    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}