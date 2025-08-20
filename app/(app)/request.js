
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  arrayUnion, // Added missing import
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";

export default function Request() {
  const { user } = useAuth();

  const [allUsers, setAllUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() || {};
        return {
          id: docSnap.id,
          "Friend Request": Array.isArray(data["Friend Request"]) ? data["Friend Request"] : [],
          ...data,
        };
      });

      if (user?.userId) {
        const currentUserData = usersData.find((u) => u.userId === user.userId) || {};
        setFriendRequests(
          Array.isArray(currentUserData["Friend Request"]) ? currentUserData["Friend Request"] : []
        );
        setAllUsers(usersData);
      }
    });

    return () => unsubscribe();
  }, [user?.userId]);

  const acceptFriendRequest = async (senderId) => {
    try {
      const currentUserRef = doc(db, "users", user.userId);
      const senderRef = doc(db, "users", senderId);

      const requestsQuery = query(
        collection(db, "friendrequests"),
        where("fromUserId", "==", senderId),
        where("toUserId", "==", user.userId),
        where("status", "==", "pending")
      );
      const requestsSnapshot = await getDocs(requestsQuery);
      if (!requestsSnapshot.empty) {
        const requestDoc = requestsSnapshot.docs[0];
        await updateDoc(doc(db, "friendrequests", requestDoc.id), { status: "accepted" });
      }

      await updateDoc(currentUserRef, {
        friends: arrayUnion(senderId),
        "Friend Request": friendRequests.filter((id) => id !== senderId),
      });

      await updateDoc(senderRef, {
        friends: arrayUnion(user.userId),
      });

      setFriendRequests((prev) => prev.filter((id) => id !== senderId));
      console.log("Friend request accepted!");
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const UserTile = ({ item }) => (
    <View style={styles.tile}>
      <Image
        source={{ uri: item.profileUrl || "https://via.placeholder.com/50" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.username || "Unknown"}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => acceptFriendRequest(item.userId)}
      >
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Friend Requests</Text>
      <FlatList
        data={(friendRequests || [])
          .map((id) => allUsers.find((u) => u.userId === id))
          .filter(Boolean)}
        horizontal
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <UserTile item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  tile: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
    width: 120,
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