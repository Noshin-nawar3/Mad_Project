import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
} from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

// export default function PostQuiz() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [setName, setSetName] = useState("Set A"); // Default to Set A
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState({
//     text: "",
//     options: ["", "", "", ""],
//     correctAnswer: "A", 
//   });
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleOptionChange = (optIndex, value) => {
//     const newOptions = [...currentQuestion.options];
//     newOptions[optIndex] = value;
//     setCurrentQuestion({ ...currentQuestion, options: newOptions });
//   };

//   const handleNext = () => {
//     if (!currentQuestion.text.trim() || currentQuestion.options.some(o => !o.trim())) {
//       Alert.alert("Error", "Please fill all fields for the current question.");
//       return;
//     }
//     const updatedQuestions = [...questions, currentQuestion];
//     setQuestions(updatedQuestions);
//     setCurrentQuestion({ text: "", options: ["", "", "", ""], correctAnswer: "A" });
//     if (currentIndex < 4) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!setName.trim()) {
//       Alert.alert("Error", "Please select a set name.");
//       return;
//     }
//     if (!currentQuestion.text.trim() || currentQuestion.options.some(o => !o.trim())) {
//       Alert.alert("Error", "Please fill all fields for the current question.");
//       return;
//     }
//     const finalQuestions = [...questions, currentQuestion];

//     try {
//       await addDoc(collection(db, "quizzes"), {
//         setName,
//         questions: finalQuestions,
//         createdBy: user?.userId,
//         createdAt: new Date(),
//       });
//       Alert.alert("Success", "Quiz posted successfully!");
//       router.push("/educator_dashboard");
//     } catch (error) {
//       console.error("Error posting quiz:", error);
//       Alert.alert("Error", "Failed to post quiz.");
//     }
//   };

//   const getActionButton = () => {
//     if (currentIndex < 4) {
//       return (
//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//       );
//     } else {
//       return (
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Post Quiz</Text>
//         </TouchableOpacity>
//       );
//     }
//   };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Post Quiz</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Set Name:</Text>
        <Picker
          selectedValue={setName}
          style={styles.picker}
          onValueChange={(value) => setSetName(value)}
        >
          <Picker.Item label="Set A" value="Set A" />
          <Picker.Item label="Set B" value="Set B" />
          <Picker.Item label="Set C" value="Set C" />
          <Picker.Item label="Set D" value="Set D" />
          <Picker.Item label="Set E" value="Set E" />
        </Picker>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionLabel}>Question {currentIndex + 1}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Question Text"
          value={currentQuestion.text}
          onChangeText={(value) => setCurrentQuestion({ ...currentQuestion, text: value })}
          onFocus={() => currentQuestion.text === "" && setCurrentQuestion({ ...currentQuestion, text: "" })}
          onBlur={() => !currentQuestion.text && setCurrentQuestion({ ...currentQuestion, text: "Enter Question Text" })}
        />
        {currentQuestion.options.map((option, optIndex) => (
          <TextInput
            key={optIndex}
            style={styles.input}
            placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
            value={option}
            onChangeText={(value) => handleOptionChange(optIndex, value)}
            onFocus={() => option === "" && handleOptionChange(optIndex, "")}
            onBlur={() => !option && handleOptionChange(optIndex, `Option ${String.fromCharCode(65 + optIndex)}`)}
          />
        ))}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Correct Answer:</Text>
          <Picker
            selectedValue={currentQuestion.correctAnswer}
            style={styles.picker}
            onValueChange={(value) => setCurrentQuestion({ ...currentQuestion, correctAnswer: value })}
          >
            <Picker.Item label="A" value="A" />
            <Picker.Item label="B" value="B" />
            <Picker.Item label="C" value="C" />
            <Picker.Item label="D" value="D" />
          </Picker>
        </View>
      </View>
      {getActionButton()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF3C7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FFD60A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});