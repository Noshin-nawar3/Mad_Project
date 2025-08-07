import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

export default function User() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username || "Unknown User",
          role: doc.data().role || "Unknown Role",
        }));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        Alert.alert("Error", "Failed to fetch users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  const renderUserTile = ({ item }) => (
    <View style={styles.tile}>
      <Text style={styles.tileUsername}>{item.username}</Text>
      <Text style={styles.tileRole}>{item.role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderUserTile}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noUsers}>No users available.</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
  tileUsername: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 5,
  },
  tileRole: {
    fontSize: 14,
    color: "#666666",
  },
  noUsers: {
    textAlign: "center",
    color: "#666666",
    fontSize: 16,
  },
});