import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
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
      router.push('/parent_dashboard'); 
    } catch (error) {
      console.error("Error posting concern:", error);
      Alert.alert("Error", "Failed to post concern. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Your Concern</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your thoughts..."
        value={concern}
        onChangeText={setConcern}
        multiline
        numberOfLines={4}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Post" onPress={handlePost} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
});