import { useRouter } from "expo-router";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";

export default function People() {
  const { user } = useAuth();
  const router = useRouter();

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
          "Sent Request": Array.isArray(data["Sent Request"]) ? data["Sent Request"] : [],
          ...data,
        };
      });

      if (user?.userId) {
        const currentUserData = usersData.find((u) => u.userId === user.userId) || {};

        setSentRequests(Array.isArray(currentUserData["Sent Request"]) ? currentUserData["Sent Request"] : []);

        const suggested = usersData.filter(
          (u) =>
            u.userId !== user.userId &&
            !(currentUserData.friends || []).includes(u.userId) &&
            !((currentUserData["Sent Request"] || []).includes(u.userId))
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
          <Text style={styles.buttonText}>{isPending ? "Pending" : "Add Friend"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>People You May Know</Text>
      <FlatList
        data={suggestions}
        horizontal
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <UserTile item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10, marginTop: 40 },
  tile: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
    width: 120,
    marginBottom: 540,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: "500", marginBottom: 5, textAlign: "center" },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 12 },
});