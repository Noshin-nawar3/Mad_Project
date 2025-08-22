import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { db } from "../../firebaseConfig";

export default function PostQuiz2() {
  const { user } = useAuth();
  const router = useRouter();
  const [subject, setSubject] = useState("Science");
  const [level, setLevel] = useState("Level 1");
  const [question, setQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "A",
  });

  const handleOptionChange = (optIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optIndex] = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handlePostQuiz = async () => {
    if (!question.text.trim() || question.options.some((o) => !o.trim())) {
      Alert.alert("Error", "Please fill all fields for the question.");
      return;
    }

    try {
      await addDoc(collection(db, "schoolQuizzes"), {
        subject,
        level,
        question: {
          text: question.text,
          options: question.options,
          correctAnswer: question.correctAnswer,
        },
        createdBy: user?.userId,
        createdAt: new Date(),
      });
      Alert.alert("Success", "Quiz posted to school successfully!");
      router.push("/educator_dashboard");
    } catch (error) {
      console.error("Error posting quiz:", error);
      Alert.alert("Error", "Failed to post quiz.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>📘 Post Quiz to School</Text>

        {/* Subject Picker */}
        <View style={styles.card}>
          <Text style={styles.label}>Select Subject</Text>
          <Picker
            selectedValue={subject}
            style={styles.picker}
            onValueChange={(value) => setSubject(value)}
          >
            <Picker.Item label="Science" value="Science" />
            <Picker.Item label="Mathematics" value="Mathematics" />
            <Picker.Item label="Social Science" value="Social Science" />
            <Picker.Item label="Language" value="Language" />
            <Picker.Item label="Art and Music" value="Art and Music" />
          </Picker>
        </View>

        {/* Level Picker */}
        <View style={styles.card}>
          <Text style={styles.label}>Select Level</Text>
          <Picker
            selectedValue={level}
            style={styles.picker}
            onValueChange={(value) => setLevel(value)}
          >
            <Picker.Item label="Level 1" value="Level 1" />
            <Picker.Item label="Level 2" value="Level 2" />
            <Picker.Item label="Level 3" value="Level 3" />
            <Picker.Item label="Level 4" value="Level 4" />
            <Picker.Item label="Level 5" value="Level 5" />
          </Picker>
        </View>

        {/* Question Input */}
        <View style={styles.card}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your question here"
            value={question.text}
            onChangeText={(value) => setQuestion({ ...question, text: value })}
          />

          {/* Options */}
          {question.options.map((option, optIndex) => (
            <TextInput
              key={optIndex}
              style={styles.input}
              placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
              value={option}
              onChangeText={(value) => handleOptionChange(optIndex, value)}
            />
          ))}

          {/* Correct Answer Picker */}
          <Text style={[styles.label, { marginTop: 10 }]}>Correct Answer</Text>
          <Picker
            selectedValue={question.correctAnswer}
            style={styles.picker}
            onValueChange={(value) =>
              setQuestion({ ...question, correctAnswer: value })
            }
          >
            <Picker.Item label="A" value="A" />
            <Picker.Item label="B" value="B" />
            <Picker.Item label="C" value="C" />
            <Picker.Item label="D" value="D" />
          </Picker>
        </View>

        {/* Post Button */}
        <TouchableOpacity style={styles.button} onPress={handlePostQuiz}>
          <Text style={styles.buttonText}>🚀 Post Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9F0",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  picker: {
    height: 50,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#F9FAFB",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});
