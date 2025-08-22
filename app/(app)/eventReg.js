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


