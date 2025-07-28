import { Pressable, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";

export default function Home() {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  console.log('user data ', user);

  return (
    <View className="flex-1 bg-white">
      <HomeHeader />
      <View className="p-5">
        <Text className="text-xl font-bold">Welcome, {user?.username || "Guest"}!</Text>
        <Text className="mt-2">This is the home screen.</Text>
        <Pressable onPress={handleLogout} className="mt-4 p-2 bg-red-500 rounded">
          <Text className="text-white text-center">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}