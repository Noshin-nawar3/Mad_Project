import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/authContext";

export default function Notice() {
  const [notices, setNotices] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notices"));
        const noticesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || "Untitled Notice",
          description: doc.data().description || "No description",
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          createdBy: doc.data().createdBy || "Unknown",
        }));
        setNotices(noticesList);
      } catch (error) {
        console.error("Error fetching notices:", error);
        Alert.alert("Error", "Failed to fetch notices. Please try again.");
      }
    };

    fetchNotices();
  }, []);

  const renderNoticeItem = ({ item }) => (
    <View style={styles.noticeContainer}>
      <Text style={styles.noticeTitle}>{item.title}</Text>
      <Text style={styles.noticeDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notices</Text>
      {notices.length > 0 ? (
        <FlatList
          data={notices}
          renderItem={renderNoticeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noNotices}>No notices available.</Text>
      )}
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
  noticeContainer: {
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
  noticeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noticeDescription: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 10,
  },
  noticeMeta: {
    fontSize: 12,
    color: "#666666",
  },
  noNotices: {
    textAlign: "center",
    color: "#666666",
    fontSize: 16,
  },
});