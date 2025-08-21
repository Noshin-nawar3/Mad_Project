import { useRouter } from "expo-router";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import SearchBar from "../../components/SearchBar";
import HomeHeader from "../../components/HomeHeader";
import { Ionicons } from "@expo/vector-icons";
export default function People() {
  const { user } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() || {};
        return {
          id: docSnap.id,
          friends: Array.isArray(data.friends) ? data.friends : [],
          "Sent Request": Array.isArray(data["Sent Request"])
            ? data["Sent Request"]
            : [],
          ...data,
        };
      });

      if (user?.userId) {
        const currentUserData =
          usersData.find((u) => u.userId === user.userId) || {};

        setSentRequests(
          Array.isArray(currentUserData["Sent Request"])
            ? currentUserData["Sent Request"]
            : []
        );

        const suggested = usersData.filter(
          (u) =>
            u.userId !== user.userId &&
            !(currentUserData.friends || []).includes(u.userId) &&
            !(currentUserData["Sent Request"] || []).includes(u.userId)
        );
        setSuggestions(suggested);
        setAllUsers(usersData);
      }
    });

    return () => unsubscribe();
  }, [user?.userId]);

  const sendFriendRequest = async (targetUserId) => {
    try {
      const targetRef = doc(db, "users", targetUserId);
      const currentRef = doc(db, "users", user.userId);

      setSentRequests((prev) => [...prev, targetUserId]);

      await addDoc(collection(db, "friendrequests"), {
        fromUserId: user.userId,
        toUserId: targetUserId,
        status: "pending",
        timestamp: new Date(),
      });

      await updateDoc(targetRef, {
        "Friend Request": arrayUnion(user.userId),
      });

      await updateDoc(currentRef, {
        "Sent Request": arrayUnion(targetUserId),
      });

      console.log("Friend request sent!");
    } catch (error) {
      console.error("Error sending friend request:", error);
      setSentRequests((prev) => prev.filter((id) => id !== targetUserId));
    }
  };

  const UserTile = ({ item }) => {
    const isPending = sentRequests.includes(item.userId);
    return (
      <View style={styles.tile}>
        <Image
          source={{ uri: item.profileUrl || "https://via.placeholder.com/50" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{item.username || "Unknown"}</Text>
        <TouchableOpacity
          style={[styles.button, isPending && { backgroundColor: "#aaa" }]}
          onPress={() => !isPending && sendFriendRequest(item.userId)}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Pending" : "Add Friend"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // 🔎 Filter people based on search
  const filteredSuggestions =
    search.trim() === ""
      ? suggestions
      : suggestions.filter((u) =>
          (u.username || "Unknown").toLowerCase().includes(search.toLowerCase())
        );

  return (
    <View style={styles.container_home}>
      <HomeHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search People..."
            />
          </View>

          <Text style={styles.sectionTitle}>People You May Know</Text>
          <FlatList
            data={filteredSuggestions} 
            horizontal
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => <UserTile item={item} />}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No people found
              </Text>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  scrollContent: {
    paddingBottom: 50,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  tile: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 10,
    height: 200,
    alignItems: "center",
    marginRight: 10,
    width: 120,
  },
  searchContainer: {
    padding: 10,
    marginTop: 20,
    backgroundColor: "#FDF6E4",
    borderRadius: 12,
    marginBottom: 10,
    ...(Platform && Platform.select
      ? Platform.select({
          android: { elevation: 4 },
          default: { elevation: 4 },
        })
      : { elevation: 4 }),
  },
  avatar: { width: 60, height: 100, borderRadius: 30, marginBottom: 8 },
  name: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 12 },
});
