// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
// import { db } from "../../firebaseConfig";

// export default function QuizMark() {
//   const router = useRouter();
//   const { connectedChildUsername } = router.params || {};
//   const [quizResults, setQuizResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     if (!connectedChildUsername) {
//       Alert.alert("Error", "No child username provided. Please connect to a child first.", [
//         { text: "OK", onPress: () => router.push('/parent_dashboard') },
//       ]);
//       setLoading(false);
//       return;
//     }

//     console.log("Fetching quiz results for username:", connectedChildUsername);

//     const fetchQuizResults = async () => {
//       try {
//         // Fetch childId based on username
//         const usersQuery = query(collection(db, "users"), where("username", "==", connectedChildUsername));
//         const querySnapshot = await getDocs(usersQuery);
//         if (!querySnapshot.empty) {
//           const childId = querySnapshot.docs[0].id;
          
//           // Fetch quiz results for the childId
//           const q = query(
//             collection(db, "userQuizScores"),
//             where("userId", "==", childId)
//           );
//           const quizSnapshot = await getDocs(q);
//           if (isMounted) {
//             const results = quizSnapshot.docs.map(doc => ({
//               id: doc.id,
//               ...doc.data(),
//             }));
//             setQuizResults(results);
//           }
//         } else {
//           if (isMounted) {
//             Alert.alert("Error", "No child found with the provided username.");
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching quiz results:", error);
//         if (isMounted) {
//           Alert.alert("Error", "Failed to fetch quiz results. Please check your connection or try again.");
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchQuizResults();

//     return () => {
//       isMounted = false;
//     };
//   }, [connectedChildUsername]);

//   const renderQuizResult = ({ item }) => (
//     <View style={styles.quizTile}>
//       <Text style={styles.quizText}>
//         Subject: {item.subject}, Level: {item.level}, Score: {item.score} / {item.totalQuestions}
//       </Text>
//       {item.detailedResults && item.detailedResults.map((result, index) => (
//         <Text key={index} style={styles.detailText}>
//           Q{index + 1}: {result.questionText} - Selected: {result.selectedAnswer}, Correct: {result.correctAnswer}, Result: {result.isCorrect ? "Correct" : "Incorrect"}
//         </Text>
//       ))}
//       <Text style={styles.timestampText}>
//         Date: {item.timestamp?.toDate().toLocaleString() || "N/A"}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Quiz Marks</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#2563eb" />
//       ) : quizResults.length > 0 ? (
//         <FlatList
//           data={quizResults}
//           renderItem={renderQuizResult}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.list}
//         />
//       ) : (
//         <Text style={styles.noDataText}>No quiz data available</Text>
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
//   list: {
//     paddingBottom: 20,
//   },
//   quizTile: {
//     backgroundColor: '#E0E7FF',
//     padding: 15,
//     borderRadius: 10,
//     marginTop: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   quizText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 5,
//   },
//   timestampText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 5,
//   },
//   noDataText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#666',
//   },
// });