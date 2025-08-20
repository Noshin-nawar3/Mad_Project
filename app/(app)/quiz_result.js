import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/authContext";

// export default function QuizResult() {
//   const { user } = useAuth();
//   const [quizResults, setQuizResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuizResults = async () => {
//       try {
//         const q = query(
//           collection(db, "userQuizScores"),
//           where("userId", "==", user?.userId)
//         );
//         const querySnapshot = await getDocs(q);
//         const results = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setQuizResults(results);
//       } catch (error) {
//         console.error("Error fetching quiz results:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuizResults();
//   }, [user?.userId]);

//   const renderResultTile = ({ item }) => (
//     <View style={styles.tile}>
//       <Text style={styles.tileTitle}>
//         {item.subject} - {item.level} ({item.timestamp.toDate().toLocaleDateString()})
//       </Text>
//       <Text style={styles.tileText}>Score: {item.score} / {item.totalQuestions}</Text>
//       {item.detailedResults.map((result, index) => (
//         <View key={index} style={styles.detailRow}>
//           <Text style={styles.detailText}>
//             Q: {result.questionText} (Selected: {result.selectedAnswer}, Correct: {result.correctAnswer}, {result.isCorrect ? "Correct" : "Incorrect"})
//           </Text>
//         </View>
//       ))}
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" />
//         <Text>Loading quiz results...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Quiz Results</Text>
//       {quizResults.length > 0 ? (
//         <FlatList
//           data={quizResults}
//           renderItem={renderResultTile}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.list}
//         />
//       ) : (
//         <Text style={styles.noResults}>No quiz results available.</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#DBEAFE',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
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
//   tile: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   tileTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   tileText: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 5,
//   },
//   detailRow: {
//     marginTop: 5,
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: 16,
//   },
// });