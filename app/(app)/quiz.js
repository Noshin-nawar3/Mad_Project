import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";

export default function Quiz() {
  const { subject, level } = useLocalSearchParams();
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const q = query(
          collection(db, "schoolQuizzes"),
          where("subject", "==", subject),
          where("level", "==", level)
        );
        const querySnapshot = await getDocs(q);
        const allQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          text: doc.data().question.text,
          options: doc.data().question.options,
          correctAnswer: doc.data().question.correctAnswer,
        }));
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [subject, level]);

  const handleSelect = (questionId, selectedOption, optionIndex) => {
    if (!showResults) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: String.fromCharCode(65 + optionIndex), // Store the letter (A, B, C, D)
      }));
    }
  };

  const handleSubmit = async () => {
    setShowResults(true);

    // Prepare detailed results
    const detailedResults = questions.map(q => ({
      questionId: q.id,
      questionText: q.text,
      selectedAnswer: answers[q.id] || null,
      correctAnswer: q.correctAnswer,
      isCorrect: answers[q.id] === q.correctAnswer,
    }));
    const score = detailedResults.filter(r => r.isCorrect).length;

    // Store in Firebase
    try {
      await addDoc(collection(db, "userQuizScores"), {
        userId: user?.userId,
        subject,
        level,
        score,
        totalQuestions: questions.length,
        detailedResults,
        timestamp: new Date(),
      });
      console.log("Score saved successfully");
    } catch (error) {
      console.error("Error saving score:", error);
      Alert.alert("Error", "Failed to save score.");
    }
  };

  const renderQuestion = ({ item: q }) => {
    const selected = answers[q.id];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{q.text}</Text>
        {q.options.map((option, index) => {
          let optionStyle = styles.optionButton;
          if (showResults) {
            if (String.fromCharCode(65 + index) === q.correctAnswer) {
              optionStyle = [styles.optionButton, styles.correct];
            } else if (String.fromCharCode(65 + index) === selected && selected !== q.correctAnswer) {
              optionStyle = [styles.optionButton, styles.wrong];
            }
          } else if (String.fromCharCode(65 + index) === selected) {
            optionStyle = [styles.optionButton, styles.selected];
          }
          return (
            <Pressable
              key={index}
              style={optionStyle}
              onPress={() => handleSelect(q.id, option, index)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
        {showResults && selected !== q.correctAnswer && (
          <Text style={styles.feedback}>Correct: {q.correctAnswer}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject} - {level} Quiz</Text>
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={item => item.id}
      />
      {!showResults && (
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      )}
      {showResults && (
        <Text style={styles.score}>
          Score: {Object.values(answers).filter(a => questions.find(q => q.id === Object.keys(answers).find(k => answers[k] === a))?.correctAnswer === a).length} / {questions.length}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1a1a1a',
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  selected: {
    backgroundColor: '#e0f7fa',
    borderColor: '#2563eb',
  },
  correct: {
    backgroundColor: '#c8e6c9',
    borderColor: '#4caf50',
  },
  wrong: {
    backgroundColor: '#ffcdd2',
    borderColor: '#f44336',
  },
  optionText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  feedback: {
    fontSize: 14,
    color: '#4caf50',
    marginTop: 5,
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#1a1a1a',
  },
});