import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert, Image } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/HomeHeader";

export default function AllFeeds() {
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        if (!user || user.role !== "Admin") {
          Alert.alert("Unauthorized", "You do not have access to view feedbacks.");
          router.replace("/signIn");
          return;
        }

        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbacksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          username: doc.data().username || "Anonymous",
          thought: doc.data().thought || "No thought provided",
          profileUrl: doc.data().profileUrl|| "https://as2.ftcdn.net/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" ,
          timestamp: doc.data().timestamp?.toDate() || new Date(),
        }));
        setFeedbacks(feedbacksList);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        Alert.alert("Error", "Failed to fetch feedbacks. Please try again.");
      }
    };

    fetchFeedbacks();
  }, [user, router]);

  const renderFeedbackTile = ({ item }) => (
    <View style={styles.tile}>
      <Image source={{ uri: item.profileUrl }} style={styles.avatar} />
      <Text style={styles.tileUsername}>{item.username}</Text>
      <Text style={styles.tileThought}>{item.thought}</Text>
      <Text style={styles.tileTimestamp}>
        {item.timestamp.toLocaleDateString()} - {item.timestamp.toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />
    <View style={styles.container}>
      <Text style={styles.header}>All Feedbacks</Text>
      {feedbacks.length > 0 ? (
        <FlatList
          data={feedbacks}
          renderItem={renderFeedbackTile}
          keyExtractor={(item) => item.id}
          numColumns={1} 
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noFeedbacks}>No feedbacks available.</Text>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#1F2937",
  },
  list: {
    paddingBottom: 20,
  },
  tile: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  tileUsername: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  tileThought: {
    fontSize: 15,
    color: "#4B5563",
    marginBottom: 10,
    textAlign: "center",
  },
  tileTimestamp: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  noFeedbacks: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginTop: 50,
  },
});
