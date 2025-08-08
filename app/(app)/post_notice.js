import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";

export default function PostNotice() {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePostNotice = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Missing Info", "Please fill in both title and description.");
      return;
    }

    try {
      await addDoc(collection(db, "notices"), {
        title,
        description,
        createdAt: new Date(),
        createdBy: user?.userId || "Unknown Admin",
      });
      Alert.alert("Success", "Notice posted successfully!");
      router.replace("/admin_dashboard"); 
    } catch (error) {
      console.error("Error posting notice:", error);
      Alert.alert("Error", "Failed to post notice.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post a New Notice</Text>
      <TextInput
        style={styles.input}
        placeholder="Notice Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Pressable style={styles.postButton} onPress={handlePostNotice}>
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
  postButton: {
    backgroundColor: "#4B5563",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  postButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});