import { SafeAreaView, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/HomeHeader";
import { Ionicons } from "@expo/vector-icons";

export default function AdminDashboard() {
  const router = useRouter();

  const handleTilePress = (screen) => {
    router.push(`/${screen}`);
  };

  const tiles = [
    { title: "Post Event", icon: "calendar-outline", screen: "post_event", color: "#4f46e5" },
    { title: "Post Notice", icon: "document-text-outline", screen: "post_notice", color: "#10b981" },
    { title: "See All Users", icon: "people-outline", screen: "user", color: "#f59e0b" },
    { title: "Feedbacks", icon: "chatbubbles-outline", screen: "allFeeds", color: "#ef4444" },
    { title: "Registered Events", icon: "clipboard-outline", screen: "eventReg", color: "#8b5cf6" },
  ];

  return (
      <View style={styles.container_home}>
        <HomeHeader />
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.welcome}>Welcome to the Admin Dashboard!</Text>

        <View style={styles.tileContainer}>
          {tiles.map((tile, index) => (
            <Pressable
              key={index}
              style={[styles.tile, { backgroundColor: tile.color }]}
              onPress={() => handleTilePress(tile.screen)}
            >
              <Ionicons name={tile.icon} size={36} color="#fff" />
              <Text style={styles.tileText}>{tile.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  container_home: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
    marginTop: 10,
  },
  welcome: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 16,
    color: "#6B7280",
  },
  tileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30,
    padding: 10,
  },
  tile: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  tileText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
