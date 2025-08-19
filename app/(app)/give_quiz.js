import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/authContext"; // Corrected import

// export default function GiveQuiz() {
//   const { setName } = useLocalSearchParams();
//   const { user } = useAuth();
//   const [questions, setQuestions] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const q = query(collection(db, "quizzes"), where("setName", "==", decodeURIComponent(setName)));
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           const doc = querySnapshot.docs[0];
//           setQuestions(doc.data().questions || []);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, [setName]);

//   const handleOptionSelect = (questionIndex, optionIndex) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [questionIndex]: String.fromCharCode(65 + optionIndex),
//     });
//   };

//   const handleSubmit = async () => {
//     let correctCount = 0;
//     questions.forEach((q, index) => {
//       if (selectedAnswers[index] === q.correctAnswer) {
//         correctCount++;
//       }
//     });
//     setScore(correctCount);
//     setSubmitted(true);

//     // Store score in Firebase
//     try {
//       await addDoc(collection(db, "quizScores"), {
//         userId: user?.userId,
//         setName: decodeURIComponent(setName),
//         score: correctCount,
//         totalQuestions: questions.length,
//         timestamp: new Date(),
//       });
//       console.log("Score saved successfully");
//     } catch (error) {
//       console.error("Error saving score:", error);
//       Alert.alert("Error", "Failed to save score.");
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Quiz: {decodeURIComponent(setName)}</Text>
//       {questions.length > 0 ? (
//         <>
//           {questions.map((q, index) => (
//             <View key={index} style={styles.questionContainer}>
//               <Text style={styles.questionText}>{index + 1}. {q.text}</Text>
//               {q.options.map((option, optIndex) => (
//                 <TouchableOpacity
//                   key={optIndex}
//                   style={[
//                     styles.optionButton,
//                     selectedAnswers[index] === String.fromCharCode(65 + optIndex) && styles.selectedOption,
//                   ]}
//                   onPress={() => handleOptionSelect(index, optIndex)}
//                   disabled={submitted}
//                 >
//                   <Text style={styles.optionText}>
//                     {String.fromCharCode(65 + optIndex)}. {option}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//               {submitted && (
//                 <Text style={styles.resultText}>
//                   Your Answer: {selectedAnswers[index] || "Not selected"}
//                   {"\n"}Correct Answer: {q.correctAnswer}
//                   {selectedAnswers[index] === q.correctAnswer ? " (Correct)" : " (Incorrect)"}
//                 </Text>
//               )}
//             </View>
//           ))}
//           {!submitted ? (
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//               <Text style={styles.submitButtonText}>Submit</Text>
//             </TouchableOpacity>
//           ) : (
//             <Text style={styles.scoreText}>Your Score: {score} out of {questions.length}</Text>
//           )}
//         </>
//       ) : (
//         <Text style={styles.noQuestions}>No questions available for this quiz</Text>
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
//   questionContainer: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   questionText: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   optionButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 5,
//     backgroundColor: '#f9f9f9',
//   },
//   selectedOption: {
//     backgroundColor: '#d1e7dd',
//     borderColor: '#198754',
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   resultText: {
//     fontSize: 16,
//     marginLeft: 20,
//     marginTop: 10,
//     color: '#333',
//   },
//   submitButton: {
//     backgroundColor: '#2563eb',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   scoreText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#2563eb',
//   },
//   noQuestions: {
//     textAlign: 'center',
//     color: '#666',
//     fontSize: 16,
//   },
// });