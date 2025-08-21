import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ConnectChild() {
  const { user } = useAuth();
  const router = useRouter();
  const [childName, setChildName] = useState("");
  const [connectedChildId, setConnectedChildId] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (connectedChildId) {
      fetchQuizResults(connectedChildId);
    }
  }, [connectedChildId]);

  const handleConnect = async () => {
    if (!childName.trim()) {
      Alert.alert("Error", "Please enter the child's name");
      return;
    }

    if (!user?.userId) {
      Alert.alert("Error", "Parent user not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const usersQuery = query(collection(db, "users"), where("username", "==", childName));
      const querySnapshot = await getDocs(usersQuery);

      if (!querySnapshot.empty) {
        const childData = querySnapshot.docs[0].data();
        const childId = querySnapshot.docs[0].id;

        const parentRef = doc(db, "users", user.userId);
        await setDoc(parentRef, { connectedChildId: childId }, { merge: true });

        const childRef = doc(db, "users", childId);
        await setDoc(childRef, { connectedParentId: user.userId }, { merge: true });

        setConnectedChildId(childId);
        Alert.alert("Success", `Connected to child: ${childName}`);
      } else {
        Alert.alert("Error", "No child found with that name");
      }
    } catch (error) {
      console.error("Connection error:", error);
      Alert.alert("Error", "Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizResults = async (childId) => {
    try {
      const q = query(
        collection(db, "userQuizScores"),
        where("userId", "==", childId)
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizResults(results);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  const handleViewData = () => {
    if (!connectedChildId) {
      Alert.alert("Error", "Please connect to a child first");
      return;
    }
    fetchQuizResults(connectedChildId);
  };

  const renderQuizResult = ({ item }) => (
    <View style={styles.quizTile}>
      <Text style={styles.quizText}>
        Subject: {item.subject}, Level: {item.level}, Score: {item.score} / {item.totalQuestions}
      </Text>
      {item.detailedResults && item.detailedResults.map((result, index) => (
        <Text key={index} style={styles.detailText}>
          Q{index + 1}: {result.questionText} - Selected: {result.selectedAnswer}, Correct: {result.correctAnswer}, Result: {result.isCorrect ? "Correct" : "Incorrect"}
        </Text>
      ))}
      <Text style={styles.timestampText}>
        Date: {item.timestamp?.toDate().toLocaleString() || "N/A"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
  {!connectedChildId ? (
    <>
      <Text style={styles.title}>Connect with Your Child</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter child's name"
        value={childName}
        onChangeText={setChildName}
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <Button title="Connect" onPress={handleConnect} />
      )}
    </>
  ) : (
    <>
      <Text style={styles.title}>Child Dashboard</Text>

      {/* Quiz Marks Section */}
      <View style={styles.quizContainer}>
        <Text style={styles.quizHeader}>Quiz Marks</Text>

        {quizResults.length > 0 ? (
          <FlatList
            data={quizResults}
            renderItem={renderQuizResult}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.noDataText}>No quiz data available</Text>
        )}
      </View>
    </>
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
  quizContainer: {
    marginTop: 20,
    backgroundColor: '#E0E7FF',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  quizHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E40AF',
  },
  list: {
    paddingBottom: 20,
  },
  quizTile: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  quizText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  timestampText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});
// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";
// import { useAuth } from "../../context/authContext";
// import { doc, setDoc, getDocs, query, where, collection } from "firebase/firestore";
// import { db } from "../../firebaseConfig";

// export default function ConnectChild() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [childName, setChildName] = useState("");
//   const [connectedChildId, setConnectedChildId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // No quiz data fetching here; moved to quiz_mark.js
//   }, [connectedChildId]);

//   const handleConnect = async () => {
//     if (!childName.trim()) {
//       Alert.alert("Error", "Please enter the child's name");
//       return;
//     }

//     if (!user?.userId) {
//       Alert.alert("Error", "Parent user not authenticated. Please log in again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const usersQuery = query(collection(db, "users"), where("username", "==", childName));
//       const querySnapshot = await getDocs(usersQuery);

//       if (!querySnapshot.empty) {
//         const childData = querySnapshot.docs[0].data();
//         const childId = querySnapshot.docs[0].id;

//         const parentRef = doc(db, "users", user.userId);
//         await setDoc(parentRef, { 
//           connectedChildId: childId, 
//           connectedChildUsername: childName 
//         }, { merge: true });

//         const childRef = doc(db, "users", childId);
//         await setDoc(childRef, { 
//           connectedParentId: user.userId, 
//           connectedParentUsername: user.username || "Unknown Parent" 
//         }, { merge: true });

//         setConnectedChildId(childId);
//         Alert.alert("Success", `Connected to child: ${childName}`);
//       } else {
//         Alert.alert("Error", "No child found with that name");
//       }
//     } catch (error) {
//       console.error("Connection error:", error);
//       Alert.alert("Error", "Failed to connect. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuizMark = () => {
//     if (!connectedChildId) {
//       Alert.alert("Error", "Please connect to a child first");
//       return;
//     }
//     router.push({
//       pathname: '/quiz_mark',
//       params: { childId: connectedChildId },
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {!connectedChildId ? (
//         <>
//           <Text style={styles.title}>Connect with Your Child</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter child's name"
//             value={childName}
//             onChangeText={setChildName}
//             autoCapitalize="none"
//           />
//           {loading ? (
//             <ActivityIndicator size="large" color="#2563eb" />
//           ) : (
//             <Button title="Connect" onPress={handleConnect} />
//           )}
//         </>
//       ) : (
//         <>
//           <Text style={styles.title}>Child Dashboard</Text>
//           <TouchableOpacity style={styles.button} onPress={handleQuizMark}>
//             <Text style={styles.buttonText}>Quiz mark</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#DBEAFE',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   button: {
//     backgroundColor: '#2563eb',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });