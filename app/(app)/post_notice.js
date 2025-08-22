import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import HomeHeader from "../../components/HomeHeader";

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
    <View style={styles.container_home}>
          <HomeHeader />
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Post a New Notice</Text>

      <Text style={styles.inputLabel}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Notice Title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.inputLabel}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Pressable style={styles.postButton} onPress={handlePostNotice}>
        <Text style={styles.postButtonText}>Post Notice</Text>
      </Pressable>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    fontColor: "#000",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#065F46",
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderColor: "#D1D5DB",
    fontColor: "#000",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 5,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  postButton: {
    backgroundColor: "#10b981",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 10,
  },
  postButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
