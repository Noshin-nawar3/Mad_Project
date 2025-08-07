import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

export default function Feedback() {
  const router = useRouter();
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [thought, setThought] = useState("");

  const handleSubmitFeedback = async () => {
    if (!username.trim() || !email.trim() || !thought.trim()) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "feedback"), {
        username,
        email,
        thought,
        timestamp: new Date(),
        userId: user?.userId || "Anonymous",
      });
      Alert.alert("Success", "Feedback submitted successfully!");
      router.replace("/home"); 
      setUsername("");
      setEmail("");
      setThought("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "Failed to submit feedback.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Submit Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Thoughts"
        value={thought}
        onChangeText={setThought}
        multiline
        numberOfLines={4}
      />
      <Pressable style={styles.submitButton} onPress={handleSubmitFeedback}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});