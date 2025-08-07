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
    console.log("User in handleRegisterClick:", user); // Debug log
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
        <Text style={styles.tileCreatedAt}>Created At: {item.createdAt.toLocaleString()}</Text>
        <Text style={styles.tileDescription}>{item.description}</Text>
        <Pressable
          style={[
            styles.registerButton,
            isRegistered && styles.registeredButton,
            { pointerEvents: isRegistered ? "none" : "auto" },
          ]}
          onPress={() => handleRegisterClick(item.id)}
          disabled={isRegistered}
        >
          <Text style={styles.registerButtonText}>
            {isRegistered ? "Registered" : "Register"}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Events</Text>
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
  tileCreatedBy: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  tileCreatedAt: {
    fontSize: 12,
    color: "#888888",
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
  registeredButton: {
    backgroundColor: "#9CA3AF",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "500",
  },
});