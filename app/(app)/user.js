import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Image } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import HomeHeader from "../../components/HomeHeader"; 

export default function User() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username || "Unknown User",
          role: doc.data().role || "Unknown Role",
          profileUrl:
            doc.data().profileUrl ||
            "https://as2.ftcdn.net/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg", // placeholder
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
      <Image source={{ uri: item.profileUrl }} style={styles.avatar} />
     <View style={styles.userInfo}> 
      <Text style={styles.tileUsername}>{item.username}</Text>
      <Text style={styles.tileRole}>{item.role}</Text>
    </View>
    </View>
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      {users.length > 0 ? (
        <FlatList
          data={users}
          renderItem={renderUserTile}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noUsers}>No users available.</Text>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#10b981",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  tile: {
    width: "100%",
    flex: 1,
    flexDirection: "row", 
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,  
    margin: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 20,      
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#10b981",
  },
  userInfo: {
  flex: 1,                   // take remaining space
  justifyContent: "center",
},

tileUsername: {
  fontSize: 16,
  fontWeight: "600",
  color: "#333333",
},
tileRole: {
  fontSize: 14,
  color: "#777777",
  marginTop: 4,
},
tileUsername: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 3,
  },
  tileRole: {
    fontSize: 14,
    color: "#777777",
  },
  noUsers: {
    textAlign: "center",
    color: "#777777",
    fontSize: 16,
    marginTop: 50,
  },
});
