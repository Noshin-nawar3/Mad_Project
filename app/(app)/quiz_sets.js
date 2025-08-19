// import React, { useEffect, useState } from "react";
// import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
// import { db } from "../../firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { useRouter } from "expo-router";

// export default function QuizSets() {
//   const router = useRouter();
//   const [quizSets, setQuizSets] = useState([]);

//   useEffect(() => {
//     const fetchQuizSets = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "quizzes"));
//         const sets = querySnapshot.docs.map(doc => doc.data().setName);
//         setQuizSets([...new Set(sets)]); // Unique set names
//       } catch (error) {
//         console.error("Error fetching quiz sets:", error);
//       }
//     };
//     fetchQuizSets();
//   }, []);

//   const handleQuizSelect = (setName) => {
//     router.push(`/give_quiz?setName=${encodeURIComponent(setName)}`);
//   };

//   const renderQuizTile = ({ item }) => (
//     <TouchableOpacity style={styles.tile} onPress={() => handleQuizSelect(item)}>
//       <Text style={styles.tileText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Available Quizzes</Text>
//       {quizSets.length > 0 ? (
//         <FlatList
//           data={quizSets}
//           renderItem={renderQuizTile}
//           keyExtractor={(item) => item}
//           numColumns={2}
//           contentContainerStyle={styles.list}
//         />
//       ) : (
//         <Text style={styles.noQuizzes}>No quizzes available</Text>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#DBEAFE',
//     padding: 20,
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
//     flex: 1,
//     backgroundColor: '#2563eb',
//     padding: 15,
//     borderRadius: 8,
//     margin: 5,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   tileText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   noQuizzes: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: 16,
//   },
// });