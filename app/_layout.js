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

// 
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider, useAuth } from '../context/authContext'; // Adjust path as needed
import "../global.css";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated
        if (typeof isAuthenticated === 'undefined') return;
        const inApp = segments[0] === '(app)';
        if (isAuthenticated && !inApp) {
            // Redirect to home
            router.replace('home');
        } else if (!isAuthenticated) {
            // Redirect to signIn
            router.replace('signIn');
        }
    }, [isAuthenticated]);

    return <Slot />;
};

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </SafeAreaProvider>
    );
}