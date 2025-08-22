import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
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

export default function PostQuiz() {
  const { user } = useAuth();
  const router = useRouter();
  const [setName, setSetName] = useState("Set A");
  const [availableSets, setAvailableSets] = useState([
    "Set A",
    "Set B",
    "Set C",
    "Set D",
    "Set E",
  ]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "A",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchExistingSets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const usedSets = new Set(
          querySnapshot.docs.map((doc) => doc.data().setName)
        );
        const updatedSets = ["Set A", "Set B", "Set C", "Set D", "Set E"].filter(
          (set) => !usedSets.has(set)
        );
        setAvailableSets(updatedSets);
        if (!updatedSets.includes(setName)) {
          setSetName(updatedSets[0] || "Set A");
        }
      } catch (error) {
        console.error("Error fetching existing sets:", error);
      }
    };
    fetchExistingSets();
  }, []);

  const handleOptionChange = (optIndex, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[optIndex] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleNext = () => {
    if (
      !currentQuestion.text.trim() ||
      currentQuestion.options.some((o) => !o.trim())
    ) {
      Alert.alert("Error", "Please fill all fields for the current question.");
      return;
    }
    const updatedQuestions = [...questions, currentQuestion];
    setQuestions(updatedQuestions);
    setCurrentQuestion({ text: "", options: ["", "", "", ""], correctAnswer: "A" });
    if (currentIndex < 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (!setName) {
      Alert.alert("Error", "Please select a set name.");
      return;
    }
    if (
      !currentQuestion.text.trim() ||
      currentQuestion.options.some((o) => !o.trim())
    ) {
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
        <TouchableOpacity style={styles.buttonNext} onPress={handleNext}>
          <Text style={styles.buttonText}>Next Question</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post Quiz</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>📘 Post a Quiz</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Select Quiz Set:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={setName}
              style={styles.picker}
              onValueChange={(value) => setSetName(value)}
              enabled={availableSets.length > 0}
            >
              {availableSets.map((set) => (
                <Picker.Item key={set} label={set} value={set} />
              ))}
            </Picker>
          </View>
          {availableSets.length === 0 && (
            <Text style={styles.errorText}>
              ❌ All sets are used. Cannot post more quizzes.
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.questionTitle}>
            Question {currentIndex + 1} of 5
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your question here..."
            value={currentQuestion.text}
            onChangeText={(value) =>
              setCurrentQuestion({ ...currentQuestion, text: value })
            }
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

          <Text style={styles.label}>Select Correct Answer:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={currentQuestion.correctAnswer}
              style={styles.picker}
              onValueChange={(value) =>
                setCurrentQuestion({ ...currentQuestion, correctAnswer: value })
              }
            >
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
              <Picker.Item label="C" value="C" />
              <Picker.Item label="D" value="D" />
            </Picker>
          </View>
        </View>

        {getActionButton()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1E3A8A",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#2563EB",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#F9FAFB",
    fontSize: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  buttonNext: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonSubmit: {
    backgroundColor: "#16A34A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 8,
  },
});
