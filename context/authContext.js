// import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from '../firebaseConfig'; // Adjust the import path as necessary



// export const AuthContext = createContext();

// export const AuthContextProvider = ({children}) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(undefined);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//       const unsub = onAuthStateChanged(auth, (user) => {
//         console.log('got user: ', user);
//         if(user){
//           setIsAuthenticated(true);
//           setUser(user);
//           updateUserData(user.uid);

//         }else{
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       });
//       return unsub;    
//     }, []);

//     const updateUserData = async (userId) => {
//       const docRef = doc(db, 'users', userId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         let data = docSnap.data();
//         setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId, role: data.role});
//       }
//     }

//     const login = async (email, password) => {
//         try{
//           const response = await signInWithEmailAndPassword(auth, email, password);
//           return {success: true};
//         }catch(e){
//           let msg = e.message;
//           if(msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
//           return {success: false, msg};

//         }
//     };
//     const logout = async () => {
//         try{
//           await signOut(auth);
//           return {success: true};

//         }catch(e){
//           return {success: false, msg: e.message, error: e};

//         }
//     };
//     const register = async (email, password, username, profileUrl, role) => {
//         try{
//           const response = await createUserWithEmailAndPassword(auth, email, password);
//           console.log('response.user: ', response?.user);
//           //setUser(response?.user);
//           //setIsAuthenticated(true);

//           await setDoc(doc(db, 'users', response?.user?.uid), {
//             username,
//             profileUrl,
//             userId: response?.user?.uid,
//             role
//           });
//           return {success: true, data: response?.user};
//         }catch(e){
//           let msg = e.message;
//           if(msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
//           if(msg.includes('(auth/invalid-credential)')) msg = 'Invalid email';
//           if(msg.includes('(auth/email-already-in-use)')) msg = 'wrong credentials';
//           return {success: false, msg};

//         }
//     }

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
// // import { createContext, useContext } from 'react';

// // const AuthContext = createContext();

// // export function AuthContextProvider({ children }) {
// //   const auth = { login: () => console.log('Login') };
// //   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// // }

// // export const useAuth = () => useContext(AuthContext);

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebaseConfig'; // Adjust the import path as necessary

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      console.log('got user: ', user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId, role: data.role });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const register = async (email, password, username, profileUrl, role) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('response.user: ', response?.user);

      await setDoc(doc(db, 'users', response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
        role,
      });
      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid email';
      if (msg.includes('(auth/invalid-credential)')) msg = 'Invalid credentials';
      if (msg.includes('(auth/email-already-in-use)')) msg = 'Email already in use';
      return { success: false, msg };
    }
  };

  // New connectToChild function
  const connectToChild = async (childEmail, childPassword) => {
    try {
      // Authenticate the child's credentials
      const childCredential = await signInWithEmailAndPassword(auth, childEmail, childPassword);
      const childUser = childCredential.user;

      // Ensure a parent is logged in
      if (!user) {
        throw new Error('No parent user is logged in');
      }

      // Verify the child has the 'child' role in Firestore
      const childDocRef = doc(db, 'users', childUser.uid);
      const childDocSnap = await getDoc(childDocRef);
      if (!childDocSnap.exists() || childDocSnap.data().role !== 'child') {
        throw new Error('This account is not a child account');
      }

      // Store the parent-child relationship in Firestore
      const parentChildRef = collection(db, 'parentChildLinks');
      await addDoc(parentChildRef, {
        parentId: user.uid,
        childId: childUser.uid,
        createdAt: new Date(),
      });

      // Sign the parent back in (since signInWithEmailAndPassword changes the auth state)
      await signInWithEmailAndPassword(auth, user.email, user.password || user.providerData[0]?.password);

      return { success: true, childId: childUser.uid };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email)')) msg = 'Invalid child email';
      if (msg.includes('(auth/invalid-credential)')) msg = 'Invalid child credentials';
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, connectToChild }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return value;
};
