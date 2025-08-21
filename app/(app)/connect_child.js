import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ConnectChild() {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    if (!user?.userId) {
      Alert.alert("Error", "Parent user not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const usersQuery = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        const childData = querySnapshot.docs[0].data();
        const childId = querySnapshot.docs[0].id;

        // Simulate password check (replace with Firebase Auth in production)
        if (childData.password === password) {
          const parentRef = doc(db, "users", user.userId);
          await setDoc(parentRef, { connectedChildId: childId }, { merge: true });

          const childRef = doc(db, "users", childId);
          await setDoc(childRef, { connectedParentId: user.userId }, { merge: true });

          console.log("Connection successful, redirecting to specialChild_dashboard");
          router.push('/specialChild1_dashboard');
        } else {
          Alert.alert("Error", "Invalid password");
        }
      } else {
        Alert.alert("Error", "No user found with that email");
      }
    } catch (error) {
      console.error("Connection error:", error);
      Alert.alert("Error", "Failed to connect. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect with Your Child</Text>
      <TextInput
        style={styles.input}
        placeholder="Child's Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Connect" onPress={handleConnect} />
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});