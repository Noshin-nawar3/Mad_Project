import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import { db } from "../../firebaseConfig"; // Adjust path if needed
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function Event() {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
        Alert.alert("Error", "Failed to fetch events. Please try again.");
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = (eventId) => {
    // Add registration logic here (e.g., update Firestore with user registration)
    Alert.alert("Success", `Registered for event ${eventId}`);
    // Example: router.push(`/register/${eventId}`) for a registration page
  };

  const renderEventTile = ({ item }) => (
    <View style={styles.tile}>
      <Text style={styles.tileTitle}>{item.name}</Text>
      <Text style={styles.tileDate}>{item.date.toDate().toLocaleDateString()}</Text>
      <Text style={styles.tileDescription}>{item.description}</Text>
      <Pressable style={styles.registerButton} onPress={() => handleRegister(item.id)}>
        <Text style={styles.registerButtonText}>Register</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Events</Text>
      <FlatList
        data={events}
        renderItem={renderEventTile}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
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
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tileDate: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  tileDescription: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});