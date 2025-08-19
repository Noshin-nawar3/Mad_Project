import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

export default function PostQuiz() {
  const { user } = useAuth();
  const router = useRouter();
  const [setName, setSetName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOptionChange = (optIndex, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[optIndex] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleNext = () => {
    if (!currentQuestion.text.trim() || currentQuestion.options.some(o => !o.trim())) {
      Alert.alert("Error", "Please fill all fields for the current question.");
      return;
    }
    const updatedQuestions = [...questions, currentQuestion];
    setQuestions(updatedQuestions);
    setCurrentQuestion({ text: "", options: ["", "", "", ""] });
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (!setName.trim()) {
      Alert.alert("Error", "Please enter a set name.");
      return;
    }
    if (!currentQuestion.text.trim() || currentQuestion.options.some(o => !o.trim())) {
      Alert.alert("Error", "Please fill all fields for the current question.");
      return;
    }
    const finalQuestions = [...questions, currentQuestion];

    try {
      await addDoc(collection(db, "quizzes"), {
        setName,
        questions: finalQuestions,
        createdBy: user?.userId,
        createdAt: new Date(),
      });
      Alert.alert("Success", "Quiz posted successfully!");
      router.push("/educator_dashboard");
    } catch (error) {
      console.error("Error posting quiz:", error);
      Alert.alert("Error", "Failed to post quiz.");
    }
  };

  const getActionButton = () => {
    if (currentIndex < 4) {
      return (
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post Quiz</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Post Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Set Name (e.g., Set A)"
        value={setName}
        onChangeText={setSetName}
      />
      <View style={styles.questionContainer}>
        <Text style={styles.questionLabel}>Question {currentIndex + 1}</Text>
        <TextInput
          style={styles.input}
          placeholder={`Question ${currentIndex + 1} text`}
          value={currentQuestion.text}
          onChangeText={(value) => setCurrentQuestion({ ...currentQuestion, text: value })}
        />
        {currentQuestion.options.map((option, optIndex) => (
          <TextInput
            key={optIndex}
            style={styles.input}
            placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
            value={option}
            onChangeText={(value) => handleOptionChange(optIndex, value)}
          />
        ))}
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