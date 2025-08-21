import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import HomeHeader from "../../components/HomeHeader"; // import your HomeHeader component

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
      <View style={styles.metaContainer}>
        <Text style={styles.noticeMeta}>
          {item.createdAt.toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HomeHeader />
      <Text style={styles.header}>Notice</Text>
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
    backgroundColor: "#F0F4F8",
  },
   header: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  noticeContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noticeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  noticeDescription: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 15,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noticeMeta: {
    fontSize: 12,
    color: "#9CA3AF",
    justifyContent: "flex-end",
  },
  noNotices: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginTop: 50,
  },
});
