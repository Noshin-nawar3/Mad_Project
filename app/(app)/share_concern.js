import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ShareConcern() {
  const { user } = useAuth();
  const router = useRouter();
  const [concern, setConcern] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!concern.trim()) {
      Alert.alert("Error", "Please enter your concern");
      return;
    }

    if (!user?.userId) {
      Alert.alert("Error", "User not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "parent_concerns"), {
        userId: user.userId,
        concern: concern,
        timestamp: serverTimestamp(),
      });
      Alert.alert("Success", "Concern posted successfully!");
      router.push("/parent_dashboard");
    } catch (error) {
      console.error("Error posting concern:", error);
      Alert.alert("Error", "Failed to post concern. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}> Share Your Concern</Text>
        <Text style={styles.subtitle}>
          Your feedback helps us improve. Please share your thoughts below.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Type your concern here..."
          value={concern}
          onChangeText={setConcern}
          multiline
          numberOfLines={6}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handlePost}>
            <Text style={styles.buttonText}> Post Concern</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#1E3A8A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: "#F9FAFB",
    textAlignVertical: "top",
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});
