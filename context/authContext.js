// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         //onAuthStateChanged

//         setTimeout(() => {
//             setIsAuthenticated(true);
//         },3000);
        
//     }, []);

//     const login = async (email, password) => {
//         try{

//         }catch(e){

//         }
//     };
//     const logout = async () => {
//         try{

//         }catch(e){

//         }
//     };
//     const register = async (email, password,username,profileUrl) => {
//         try{

//         }catch(e){

//         }
//     };

//         return(
//             <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
//                 {children}
//             </AuthContext.Provider>
//         );
//     };


// export const useAuth = () => {
//     const value = useContext(AuthContext);
//     if (!value) {
//         throw new Error("useAuth must be used within an AuthContextProvider");
//     }
//     return value;
// }
import { createContext, useContext } from 'react';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const auth = { login: () => console.log('Login') };
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);