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
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""] },
    { text: "", options: ["", "", "", ""] },
    { text: "", options: ["", "", "", ""] },
    { text: "", options: ["", "", "", ""] },
    { text: "", options: ["", "", "", ""] },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "text") {
      newQuestions[index].text = value;
    } else {
      const optionIndex = parseInt(field.split("-")[1]);
      newQuestions[index].options[optionIndex] = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    if (!setName.trim()) {
      Alert.alert("Error", "Please enter a set name.");
      return;
    }
    if (questions.some(q => !q.text.trim() || q.options.some(o => !o.trim()))) {
      Alert.alert("Error", "All questions and options must be filled.");
      return;
    }

    try {
      await addDoc(collection(db, "quizzes"), {
        setName,
        questions,
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Post Quiz</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Set Name (e.g., Set A)"
        value={setName}
        onChangeText={setSetName}
      />
      {questions.map((q, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionLabel}>Question {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Question ${index + 1} text`}
            value={q.text}
            onChangeText={(value) => handleQuestionChange(index, "text", value)}
          />
          {q.options.map((option, optIndex) => (
            <TextInput
              key={optIndex}
              style={styles.input}
              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
              value={option}
              onChangeText={(value) => handleQuestionChange(index, `option-${optIndex}`, value)}
            />
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Quiz</Text>
      </TouchableOpacity>
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