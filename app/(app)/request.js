import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  ScrollView,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import HomeHeader from "../../components/HomeHeader";

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
          "Friend Request": Array.isArray(data["Friend Request"])
            ? data["Friend Request"]
            : [],
          ...data,
        };
      });

      if (user?.userId) {
        const currentUserData =
          usersData.find((u) => u.userId === user.userId) || {};
        setFriendRequests(
          Array.isArray(currentUserData["Friend Request"])
            ? currentUserData["Friend Request"]
            : []
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
        await updateDoc(doc(db, "friendrequests", requestDoc.id), {
          status: "accepted",
        });
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
    <View style={styles.container_home}>
      <HomeHeader />
      {/* <ScrollView contentContainerStyle={styles.scrollContent}> */}
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
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF6E4", padding: 16 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginTop: 40,
  },
  tile: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginRight: 10,
    width: 130,
    height: 200,
    marginBottom: 540,
  },
  avatar: { width: 100, height: 100, borderRadius: 100, marginBottom: 8 },
  name: {
    paddingTop: 5,
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
  container_home: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  scrollContent: {
    paddingBottom: 50,
  },
  buttonText: { color: "#fff", fontSize: 12 },
});
