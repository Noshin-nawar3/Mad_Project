import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function SpecialChildDashboard() {
  const { user } = useAuth();
  const [childData, setChildData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.userId));
        if (userDoc.exists()) {
          setChildData(userDoc.data());
        }
      } catch (error) {
        console.error("Error fetching child data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChildData();
  }, [user.userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Child Dashboard</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : childData ? (
        <View>
          <Text>Welcome, {childData.username || "Child"}!</Text>
          {/* Add more child-specific data here */}
        </View>
      ) : (
        <Text>No data available</Text>
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
});