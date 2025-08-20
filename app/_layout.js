import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { AuthContextProvider, useAuth } from '../context/authContext';
import { View, Text } from 'react-native'; 
import "../global.css";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); 
  }, []);

useEffect(() => {
  console.log('isAuthenticated:', isAuthenticated);
  if (isLoading || typeof isAuthenticated === 'undefined') return;

  const inApp = segments[0] === '(app)';

  if (isAuthenticated && !inApp) {
    router.replace('/home');
  } else if (isAuthenticated === false) {
    
    if (segments[0] !== 'signUp') {
      router.replace('/signIn');
    }
  }
}, [isAuthenticated, isLoading, segments]);


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text> {/* React Native Text component */}
      </View>
    );
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}

// import { Slot, useRouter, useSegments } from 'expo-router';
// import { useEffect } from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { AuthContextProvider, useAuth } from '../context/authContext'; // Adjust path as needed
// import "../global.css";

// const MainLayout = () => {
//     const { isAuthenticated } = useAuth();
//     const segments = useSegments();
//     const router = useRouter();

//     useEffect(() => {
//         // Check if the user is authenticated
//         if (typeof isAuthenticated === 'undefined') return;
//         const inApp = segments[0] === '(app)';
//         if (isAuthenticated && !inApp) {
//             // Redirect to home
//             router.replace('home');
//         } else if (!isAuthenticated) {
//             // Redirect to signIn
//             router.replace('signIn');
//         }
//     }, [isAuthenticated]);

//     return <Slot />;
// };

// export default function RootLayout() {
//     return (
//         <SafeAreaProvider>
//             <AuthContextProvider>
//                 <MainLayout />
//             </AuthContextProvider>
//         </SafeAreaProvider>
//     );
// }

// import { Slot } from 'expo-router';
//      import { SafeAreaProvider } from 'react-native-safe-area-context';
//      import { AuthContextProvider } from '../context/authContext'; // Adjust path if needed (e.g., ./context/authContext)

//      export default function RootLayout() {
//          return (
//              <SafeAreaProvider>
//                  <AuthContextProvider>
//                      <Slot />
//                  </AuthContextProvider>
//              </SafeAreaProvider>
//          );
//      }