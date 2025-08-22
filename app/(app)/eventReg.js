import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Image } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/HomeHeader";

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
            const eventData = eventDoc.exists() ? eventDoc.data() : {};
            return {
              id: regDoc.id,
              eventName: eventData.name || "Unknown Event",
              eventImage: eventData.imageUrl || "https://via.placeholder.com/150",
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
      <Text style={styles.tileUsername}>Rregistered By: {item.username}</Text>
      <View style={styles.timestampContainer}>
        <Text style={styles.tileTimestamp}>
          {item.timestamp.toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />
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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#111827",
  },
  container_home: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 20,
  },
tile: {
  width: "100%",           // full width
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  marginVertical: 8,       // vertical spacing between tiles
  padding: 12,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 4,
},
  eventImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  tileEventName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 4,
  },
  tileUsername: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  timestampContainer: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tileTimestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  noRegistrations: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginTop: 40,
  },
});
