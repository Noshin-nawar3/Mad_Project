import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useAuth } from "../../context/authContext";

export default function Connection() {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).filter((u) => u.userId !== user.userId); // Exclude current user
        setSuggestions(usersList);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        Alert.alert("Error", "Failed to fetch suggestions.");
      }
    };

    const fetchRequests = async () => {
      try {
        const q = query(collection(db, "friendRequests"), where("toUserId", "==", user.userId), where("status", "==", "pending"));
        const requestsSnapshot = await getDocs(q);
        const requestsList = requestsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsList);
      } catch (error) {
        console.error("Error fetching requests:", error);
        Alert.alert("Error", "Failed to fetch requests.");
      }
    };

    if (user?.userId) {
      fetchSuggestions();
      fetchRequests();
      setLoading(false);
    } else {
      setLoading(false);
      Alert.alert("Authentication Error", "Please log in to view connections.");
    }
  }, [user]);

  const handleAddFriend = async (suggestedUserId) => {
    try {
      await addDoc(collection(db, "friendRequests"), {
        fromUserId: user.userId,
        toUserId: suggestedUserId,
        status: "pending",
        timestamp: new Date(),
      });
      Alert.alert("Success", "Friend request sent!");
      // Optionally remove the user from suggestions
      setSuggestions((prev) => prev.filter((s) => s.userId !== suggestedUserId));
    } catch (error) {
      console.error("Error sending friend request:", error);
      Alert.alert("Error", "Failed to send friend request.");
    }
  };

  const handleAcceptRequest = async (requestId, fromUserId) => {
    try {
      const requestRef = doc(db, "friendRequests", requestId);
      await updateDoc(requestRef, { status: "accepted" });
      // Optionally add friends relationship
      await addDoc(collection(db, "friends"), {
        user1Id: user.userId,
        user2Id: fromUserId,
        timestamp: new Date(),
      });
      Alert.alert("Success", "Request accepted!");
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (error) {
      console.error("Error accepting request:", error);
      Alert.alert("Error", "Failed to accept request.");
    }
  };

  const renderSuggestionTile = ({ item }) => (
    <View style={styles.tile}>
      <Text style={styles.tileText}>{item.username}</Text>
      <Pressable style={styles.button} onPress={() => handleAddFriend(item.userId)}>
        <Text style={styles.buttonText}>Add Friend</Text>
      </Pressable>
    </View>
  );

  const renderRequestTile = ({ item }) => (
    <View style={styles.tile}>
      <Text style={styles.tileText}>Request from {item.fromUserId}</Text>
      <Pressable style={styles.button} onPress={() => handleAcceptRequest(item.id, item.fromUserId)}>
        <Text style={styles.buttonText}>Accept</Text>
      </Pressable>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>People You May Know</Text>
      <FlatList
        data={suggestions}
        renderItem={renderSuggestionTile}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.sectionTitle}>Message Requests</Text>
      {requests.length > 0 ? (
        <FlatList
          data={requests}
          renderItem={renderRequestTile}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noRequest}>No requests</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  tile: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  tileText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4B5563",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  noRequest: {
    textAlign: "center",
    color: "#666666",
    fontSize: 16,
  },
});
