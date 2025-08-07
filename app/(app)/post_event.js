import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { db } from "../../firebaseConfig"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PostEvent() {
  const router = useRouter();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEventDate(selectedDate);
    }
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handlePostEvent = async () => {
    if (!eventName || !eventDate || !eventDescription) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    console.log("db:", db); 
    if (!db) {
      Alert.alert("Error", "Firestore is not initialized. Check configuration.");
      return;
    }

    try {
      const eventsCollection = collection(db, "events");
      await addDoc(eventsCollection, {
        name: eventName,
        date: eventDate,
        description: eventDescription,
        createdAt: serverTimestamp(),
        createdBy: "Admin", 
      });
      Alert.alert("Success", "Event posted successfully!");
      router.push("/admin_dashboard"); // Return to Admin Dashboard
    } catch (error) {
      console.error("Error posting event:", error);
      Alert.alert("Error", `Failed to post event: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post New Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <Pressable style={styles.dateButton} onPress={showDatepicker}>
        <Text style={styles.dateText}>
          {eventDate.toLocaleDateString()}
        </Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Event Description"
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
        numberOfLines={4}
      />
      <Pressable style={styles.postButton} onPress={handlePostEvent}>
        <Text style={styles.postButtonText}>Post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  dateButton: {
    height: 50,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  dateText: {
    fontSize: 16,
    color: "#333333",
  },
  postButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  postButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});