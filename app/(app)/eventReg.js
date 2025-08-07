import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

export default function EventReg() {
  const [registrations, setRegistrations] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        if (!user || user.role !== "Admin") {
          Alert.alert("Unauthorized", "You do not have access to view registrations.");
          router.replace("/signIn");
          return;
        }

        const registrationsQuery = await getDocs(collection(db, "event_registrations"));
        const registrationsList = await Promise.all(
          registrationsQuery.docs.map(async (regDoc) => {
            const regData = regDoc.data();
            const eventDoc = await getDoc(doc(db, "events", regData.eventId));
            const eventName = eventDoc.exists() ? eventDoc.data().name : "Unknown Event";
            return {
              id: regDoc.id,
              eventName,
              username: regData.username || "Unknown User",
              timestamp: regData.timestamp?.toDate() || new Date(),
            };
          })
        );
        setRegistrations(registrationsList);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        Alert.alert("Error", "Failed to fetch registrations. Please try again.");
      }
    };

    fetchRegistrations();
  }, [user, router]);

  const renderRegistrationTile = ({ item }) => (
    <View style={styles.tile}>
      <Text style={styles.tileEventName}>{item.eventName}</Text>
      <Text style={styles.tileUsername}>Registered by: {item.username}</Text>
      <Text style={styles.tileTimestamp}>
        On: {item.timestamp.toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registered Events</Text>
      {registrations.length > 0 ? (
        <FlatList
          data={registrations}
          renderItem={renderRegistrationTile}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noRegistrations}>No registrations available.</Text>
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
  tileEventName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginBottom: 5,
  },
  tileUsername: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  tileTimestamp: {
    fontSize: 12,
    color: "#888888",
  },
  noRegistrations: {
    textAlign: "center",
    color: "#666666",
    fontSize: 16,
  },
});