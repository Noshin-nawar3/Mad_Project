import { useRouter } from 'expo-router';
   import { useEffect, useState } from 'react';
   import { View, StyleSheet } from 'react-native';
   import { heightPercentageToDP as hp } from "react-native-responsive-screen";
   import Loading from "../components/Loading"; // Verify this import

   const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     },
   });

   export default function Index() {
     const router = useRouter();
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const timer = setTimeout(() => {
         setLoading(false);
         router.push('/signIn');
       }, 3000); // 3-second delay
       return () => clearTimeout(timer);
     }, [router]);

     if (loading) {
       return (
         <View style={styles.container}>
           {Loading ? <Loading size={hp(6.5)} /> : <Text>Loading fallback</Text>}
         </View>
       );
     }

     return null;
   }