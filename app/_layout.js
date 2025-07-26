// import { Slot, UseRouter, useSegments } from 'expo-router';
// import { useEffect } from 'react';
// import { AuthContextProvider, useAuth } from '../context/authContext';
// import "../global.css";


// // use as usual in your components


// const MainLayout = () => {
//     const {isAuthenticated } = useAuth;
//     const segments = useSegments(); 
//     const router = UseRouter();


//    useEffect(() => {
//     // Check if the user is authenticated
//     if(typeof isAuthenticated === 'undefined') return;
//     const inApp = segments[0] === '(app)';
//     if (isAuthenticated&&!inApp) {
//       // Redirect to home
//       router.replace('home');
//     }else if (isAuthenticated==false) {
//       // redirect to signin
//       router.replace('signIn');
//     }
// }, [isAuthenticated]);

// return <Slot/>;
// };

// export default function RootLayout() {
//   return (
//     <AuthContextProvider>
//       <MainLayout />
//     </AuthContextProvider>
//   )
// }

import { Slot } from 'expo-router';
import "../global.css";

export default function RootLayout() {
  return (
    <Slot />
  );
}