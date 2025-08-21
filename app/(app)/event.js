import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs, setDoc, doc, getDoc, query, where } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/HomeHeader";

export default function Event() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState({});

  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          createdBy: doc.data().createdBy || "Unknown",
          date: doc.data().date?.toDate() || new Date(),
          description: doc.data().description || "No description",
          name: doc.data().name || "Unnamed Event",
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
        Alert.alert("Error", "Failed to fetch events. Please try again.");
      }
    };

    const fetchRegisteredEvents = async () => {
      if (!user || !user.userId) return;
      try {
        const q = query(
          collection(db, "event_registrations"),
          where("userId", "==", user.userId)
        );
        const querySnapshot = await getDocs(q);
        const registered = {};
        querySnapshot.forEach((doc) => {
          registered[doc.data().eventId] = true;
        });
        setRegisteredEvents(registered);
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    fetchEvents();
    fetchRegisteredEvents();
  }, [user]);

  const handleRegisterClick = async (eventId) => {
    if (!user || !user.userId) {
      Alert.alert("Authentication Error", "Please log in to register.");
      router.replace("/signIn");
      return;
    }

    const regRef = doc(db, "event_registrations", `${eventId}_${user.userId}`);
    const regSnap = await getDoc(regRef);
    if (regSnap.exists()) {
      Alert.alert("Already Registered", "You are already registered for this event.");
      return;
    }

    setSelectedEvent(eventId);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!email || !username) {
      Alert.alert("Missing Info", "Please fill in both fields.");
      return;
    }

    try {
      const userId = user.userId;
      const regRef = doc(db, "event_registrations", `${selectedEvent}_${userId}`);
      await setDoc(regRef, {
        userId,
        username,
        email,
        eventId: selectedEvent,
        timestamp: new Date(),
        role: user.role || "Unknown",
      });

      setRegisteredEvents((prev) => ({
        ...prev,
        [selectedEvent]: true,
      }));

      setModalVisible(false);
      setUsername("");
      setEmail("");
      Alert.alert("Success", "Successfully registered!");
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Error", "Failed to register.");
    }
  };

  const renderEventTile = ({ item }) => {
    const isRegistered = registeredEvents[item.id];

    return (
      <View style={styles.tile}>
        <Text style={styles.tileTitle}>{item.name}</Text>
        <Text style={styles.tileDate}>Date: {item.date.toLocaleDateString()}</Text>
        <Text style={styles.tileCreatedBy}>Created By: {item.createdBy}</Text>
        <Text style={styles.tileDescription}>{item.description}</Text>
        <Pressable
          style={[
            styles.registerButton,
            isRegistered && styles.registeredButton,
            { pointerEvents: isRegistered ? "none" : "auto" },
          ]}
          onPress={() => handleRegisterClick(item.id)}
          android_ripple={{ color: "#2563EB" }}
        >
          <Text style={styles.registerButtonText}>
            {isRegistered ? "Registered" : "Register"}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container_home}>
          <HomeHeader />
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={events}
        renderItem={renderEventTile}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Register for Event</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Register</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
   container_home: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#E0F2FE",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E40AF",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  tile: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  tileTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 5,
  },
  tileDate: {
    fontSize: 14,
    color: "#2563EB", // green
    marginBottom: 5,
  },
  tileCreatedBy: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 10,
  },
  tileDescription: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  registeredButton: {
    backgroundColor: "#22C55E", // green
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 64, 175, 0.3)",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E40AF",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
  },
  submitButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#EF4444",
    fontSize: 15,
    fontWeight: "600",
  },
});
