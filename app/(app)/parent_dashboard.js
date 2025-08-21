import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Modal, Pressable, Alert, TouchableWithoutFeedback } from "react-native";
import { collection, doc, getDoc, setDoc, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import HomeHeader from "../../components/HomeHeader";

export default function ParentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [connectUsername, setConnectUsername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedChildId, setConnectedChildId] = useState(null);
  const [childRaadsrResult, setChildRaadsrResult] = useState(null);
  const [childQuizScore, setChildQuizScore] = useState(null);

  useEffect(() => {
    const checkExistingConnection = async () => {
      if (user?.userId) {
        const parentRef = doc(db, "users", user.userId);
        const parentDoc = await getDoc(parentRef);
        if (parentDoc.exists()) {
          const data = parentDoc.data();
          console.log("Parent data:", data);
          if (data.connectedChildId) {
            setConnectedChildId(data.connectedChildId);
            setIsConnected(true);
            fetchChildData(data.connectedChildId);
          }
        }
      }
    };
    checkExistingConnection();
  }, [user?.userId]);

  useEffect(() => {
    if (isConnected && connectedChildId) {
      fetchChildData(connectedChildId);
    }
  }, [isConnected, connectedChildId]);

  const fetchChildData = async (childId) => {
    try {
      const childRef = doc(db, "users", childId);
      const childDoc = await getDoc(childRef);
      if (childDoc.exists()) {
        const data = childDoc.data();
        console.log("Child user data:", data);

        // Fetch latest RAADS-R result from raadsr_results collection
        const raadsrQuery = query(
          collection(db, "raadsr_results"),
          where("userId", "==", childId),
          orderBy("date", "desc"), // Updated to use 'date' instead of 'timestamp'
          limit(1)
        );
        const raadsrSnapshot = await getDocs(raadsrQuery);
        if (!raadsrSnapshot.empty) {
          const latestRaadsr = raadsrSnapshot.docs[0].data();
          console.log("Latest RAADS-R data:", latestRaadsr);
          if (typeof latestRaadsr.score !== "undefined") {
            setChildRaadsrResult(latestRaadsr.score.toString());
          } else {
            setChildRaadsrResult("No data available");
          }
        } else {
          setChildRaadsrResult("No data available");
          console.log("No RAADS-R results found for childId:", childId);
        }

        // Fetch latest quiz score from userQuizScores collection
        const quizQuery = query(
          collection(db, "userQuizScores"),
          where("userId", "==", childId),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        const quizSnapshot = await getDocs(quizQuery);
        if (!quizSnapshot.empty) {
          const latestQuiz = quizSnapshot.docs[0].data();
          console.log("Latest Quiz data:", latestQuiz);
          if (typeof latestQuiz.score !== "undefined") {
            setChildQuizScore(latestQuiz.score.toString());
          } else {
            setChildQuizScore("No data available");
          }
        } else {
          setChildQuizScore("No data available");
          console.log("No quiz scores found for childId:", childId);
        }
      } else {
        setChildRaadsrResult("No data available");
        setChildQuizScore("No data available");
        console.log("Child document does not exist for ID:", childId);
      }
    } catch (error) {
      console.error("Error fetching child data:", error);
      Alert.alert("Error", "Failed to fetch child data.");
      setChildRaadsrResult("No data available");
      setChildQuizScore("No data available");
    }
  };

const handleConnect = async () => {
  if (!connectUsername) {
    Alert.alert("Error", "Please enter a username");
    return;
  }

  try {
    const usersQuery = query(collection(db, "users"), where("username", "==", connectUsername));
    const querySnapshot = await getDocs(usersQuery);

    if (!querySnapshot.empty) {
      const childData = querySnapshot.docs[0].data();
      const childId = querySnapshot.docs[0].id;

      // Store connection in parent's document
      const parentRef = doc(db, "users", user.userId);
      await setDoc(parentRef, { connectedChildId: childId }, { merge: true });

      // Store connection in child's document
      const childRef = doc(db, "users", childId);
      await setDoc(childRef, { connectedParentId: user.userId }, { merge: true });

      setConnectedChildId(childId);
      setIsConnected(true);
      setModalVisible(false);

      Alert.alert("Success", "Connected to child successfully!");

      // 🔹 Redirect to connectedChild.js with childId
      router.push({
        pathname: "/connectedChild",
        params: { childId },
      });
    } else {
      Alert.alert("Error", "No user found with that username");
    }
  } catch (error) {
    console.error("Connection error:", error);
    Alert.alert("Error", "Failed to connect. Please try again.");
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_home}>
        <HomeHeader />
        <Text style={styles.title}>Parent Dashboard</Text>
        <Text style={styles.welcome}>Welcome to the Parent Dashboard!</Text>

        {!isConnected ? (
          <View>
            <Pressable style={styles.tile} onPress={() => setModalVisible(true)}>
              <Text style={styles.tileText}>Connect with my child</Text>
            </Pressable>

            <Modal
              transparent={true}
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Connect with your child</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter child's username"
                      value={connectUsername}
                      onChangeText={setConnectUsername}
                      autoCapitalize="none"
                    />
                    <Button title="Connect" onPress={handleConnect} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
                  </View>
                </TouchableWithoutFeedback>
              </Pressable>
            </Modal>
          </View>
        ) : (
          <View>
            <View style={styles.tile}>
              <Text style={styles.tileText}>See my child's RAADS-R test history</Text>
              <Text>Result: {childRaadsrResult}</Text>
              <Button
                title="View Details"
                onPress={() => router.push({
                  pathname: '/testHistoryScreen',
                  params: { childId: connectedChildId }
                })}
              />
            </View>
            <View style={styles.tile}>
              <Text style={styles.tileText}>See my child's quiz history</Text>
              <Text>Score: {childQuizScore}</Text>
              <Button
                title="View Details"
                onPress={() => router.push({
                  pathname: '/quiz_result',
                  params: { childId: connectedChildId }
                })}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1FAE5',
    padding: 20,
  },
  container_home: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcome: {
    marginTop: 16,
    textAlign: 'center',
  },
  tile: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  tileText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});