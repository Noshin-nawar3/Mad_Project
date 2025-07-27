import { Pressable } from "react-native";
import { Text, View } from "react-native-web";
import { useAuth } from '../../context/authContext';

export default function Home() {
  const {logout, user} = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  console.log('user data ', user);
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}