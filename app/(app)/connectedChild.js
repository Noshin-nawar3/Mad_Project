import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";

export default function ConnectedChildDashboard() {
  const router = useRouter();
  const { childId } = useLocalSearchParams(); // ✅ get childId from params
  const { logout } = useAuth();

  const [childRaadsrResult, setChildRaadsrResult] = useState("Loading...");
  const [childQuizScore, setChildQuizScore] = useState("Loading...");

  useEffect(() => {
    if (childId) {
      fetchChildData(childId);
    }
  }, [childId]);

  const fetchChildData = async (childId) => {
    try {
      // Fetch latest RAADS-R result
      const raadsrQuery = query(
        collection(db, "raadsr_results"),
        where("userId", "==", childId),
        orderBy("date", "desc"),
        limit(1)
      );
      const raadsrSnapshot = await getDocs(raadsrQuery);
      if (!raadsrSnapshot.empty) {
        const latestRaadsr = raadsrSnapshot.docs[0].data();
        setChildRaadsrResult(latestRaadsr.score?.toString() || "No data available");
      } else {
        setChildRaadsrResult("No data available");
      }

      // Fetch latest Quiz result
      const quizQuery = query(
        collection(db, "userQuizScores"),
        where("userId", "==", childId),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const quizSnapshot = await getDocs(quizQuery);
      if (!quizSnapshot.empty) {
        const latestQuiz = quizSnapshot.docs[0].data();
        setChildQuizScore(latestQuiz.score?.toString() || "No data available");
      } else {
        setChildQuizScore("No data available");
      }
    } catch (error) {
      console.error("Error fetching child data:", error);
      Alert.alert("Error", "Failed to fetch child data.");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_home}>
        <HomeHeader />
        <Text style={styles.title}>Connected Child Dashboard</Text>
        <Text style={styles.welcome}>You are viewing your child’s results</Text>

        <View style={styles.tile}>
          <Ionicons name="document-text-outline" size={20} color="#2563eb" />
          <Text style={styles.tileText}>RAADS-R Result: {childRaadsrResult}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push({ pathname: "/testHistoryScreen", params: { childId } })}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tile}>
          <Ionicons name="trophy-outline" size={20} color="#2563eb" />
          <Text style={styles.tileText}>Quiz Result: {childQuizScore}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push({ pathname: "/quiz_result", params: { childId } })}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: '#DBEAFE',
  },
  container: {
    flex: 1,
    backgroundColor: '#DBEAFE',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcome: {
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  tile: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  tileText: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
