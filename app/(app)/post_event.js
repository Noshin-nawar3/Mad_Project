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
import HomeHeader from "../../components/HomeHeader";

export default function PostEvent() {
  const router = useRouter();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventDescription, setEventDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) setEventDate(selectedDate);
    if (Platform.OS === "android") setShowDatePicker(false);
  };

  const showDatepicker = () => setShowDatePicker(true);

  const handlePostEvent = async () => {
    if (!eventName || !eventDate || !eventDescription) {
      Alert.alert("Error", "Please fill all fields.");
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
      router.push("/admin_dashboard");
    } catch (error) {
      console.error("Error posting event:", error);
      Alert.alert("Error", `Failed to post event: ${error.message}`);
    }
  };

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Post New Event</Text>

        <TextInput
          style={styles.input}
          placeholder="Event Name"
          placeholderTextColor="#9CA3AF"
          value={eventName}
          onChangeText={setEventName}
        />

        <Pressable style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.dateText}>{eventDate.toLocaleDateString()}</Text>
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
          placeholderTextColor="#9CA3AF"
          value={eventDescription}
          onChangeText={setEventDescription}
          multiline
          numberOfLines={4}
        />

        <Pressable style={styles.postButton} onPress={handlePostEvent}>
          <Text style={styles.postButtonText}>Post Event</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  container_home: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  dateButton: {
    height: 50,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: "#374151",
  },
  postButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#6366F1",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },
  postButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
