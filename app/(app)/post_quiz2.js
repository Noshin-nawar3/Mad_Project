// import React, { useState } from "react";
// import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Picker } from "react-native";
// import { db } from "../../firebaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import { useAuth } from "../../context/authContext";
// import { useRouter } from "expo-router";

// export default function PostQuiz2() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [subject, setSubject] = useState("Science");
//   const [level, setLevel] = useState("Level 1");
//   const [question, setQuestion] = useState({
//     text: "",
//     options: ["", "", "", ""],
//     correctAnswer: "A",
//   });

//   const handleOptionChange = (optIndex, value) => {
//     const newOptions = [...question.options];
//     newOptions[optIndex] = value;
//     setQuestion({ ...question, options: newOptions });
//   };

//   const handlePostQuiz = async () => {
//     if (!question.text.trim() || question.options.some(o => !o.trim())) {
//       Alert.alert("Error", "Please fill all fields for the question.");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "schoolQuizzes"), {
//         subject,
//         level,
//         question: {
//           text: question.text,
//           options: question.options,
//           correctAnswer: question.correctAnswer,
//         },
//         createdBy: user?.userId,
//         createdAt: new Date(),
//       });
//       Alert.alert("Success", "Quiz posted to school successfully!");
//       router.push("/educator_dashboard");
//     } catch (error) {
//       console.error("Error posting quiz:", error);
//       Alert.alert("Error", "Failed to post quiz.");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Post Quiz to School</Text>
//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Subject:</Text>
//         <Picker
//           selectedValue={subject}
//           style={styles.picker}
//           onValueChange={(value) => setSubject(value)}
//         >
//           <Picker.Item label="Science" value="Science" />
//           <Picker.Item label="Mathematics" value="Mathematics" />
//           <Picker.Item label="Social Science" value="Social Science" />
//           <Picker.Item label="Language" value="Language" />
//           <Picker.Item label="Art and Music" value="Art and Music" />
//         </Picker>
//       </View>
//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Level:</Text>
//         <Picker
//           selectedValue={level}
//           style={styles.picker}
//           onValueChange={(value) => setLevel(value)}
//         >
//           <Picker.Item label="Level 1" value="Level 1" />
//           <Picker.Item label="Level 2" value="Level 2" />
//           <Picker.Item label="Level 3" value="Level 3" />
//           <Picker.Item label="Level 4" value="Level 4" />
//           <Picker.Item label="Level 5" value="Level 5" />
//         </Picker>
//       </View>
//       <View style={styles.questionContainer}>
//         <Text style={styles.questionLabel}>Question</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Question Text"
//           value={question.text}
//           onChangeText={(value) => setQuestion({ ...question, text: value })}
//           onFocus={() => question.text === "" && setQuestion({ ...question, text: "" })}
//           onBlur={() => !question.text && setQuestion({ ...question, text: "Enter Question Text" })}
//         />
//         {question.options.map((option, optIndex) => (
//           <TextInput
//             key={optIndex}
//             style={styles.input}
//             placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
//             value={option}
//             onChangeText={(value) => handleOptionChange(optIndex, value)}
//             onFocus={() => option === "" && handleOptionChange(optIndex, "")}
//             onBlur={() => !option && handleOptionChange(optIndex, `Option ${String.fromCharCode(65 + optIndex)}`)}
//           />
//         ))}
//         <View style={styles.pickerContainer}>
//           <Text style={styles.pickerLabel}>Correct Answer:</Text>
//           <Picker
//             selectedValue={question.correctAnswer}
//             style={styles.picker}
//             onValueChange={(value) => setQuestion({ ...question, correctAnswer: value })}
//           >
//             <Picker.Item label="A" value="A" />
//             <Picker.Item label="B" value="B" />
//             <Picker.Item label="C" value="C" />
//             <Picker.Item label="D" value="D" />
//           </Picker>
//         </View>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={handlePostQuiz}>
//         <Text style={styles.buttonText}>Post Quiz</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FEF3C7',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   pickerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   pickerLabel: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   picker: {
//     flex: 1,
//     height: 50,
//     backgroundColor: "#fff",
//   },
//   questionContainer: {
//     marginBottom: 20,
//   },
//   questionLabel: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     backgroundColor: "#fff",
//   },
//   button: {
//     backgroundColor: "#FFD60A",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
// });