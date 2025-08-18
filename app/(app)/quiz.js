// import { useLocalSearchParams } from "expo-router";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
// import { db } from "../../firebaseConfig";

export default function Quiz() {
  const { subject, level } = useLocalSearchParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const q = query(
          collection(db, 'questions'),
          where('subject', '==', subject),
          where('level', '==', level)
        );
        const querySnapshot = await getDocs(q);
        const allQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Shuffle and pick 5 random questions
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, 5));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [subject, level]);

  const handleSelect = (questionId, selectedOption) => {
    if (!showResults) {
      setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const renderQuestion = ({ item: q }) => {
    const selected = answers[q.id];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{q.question}</Text>
        {q.options.map((option, index) => {
          let optionStyle = styles.optionButton;
          if (showResults) {
            if (option === q.correctAnswer) {
              optionStyle = [styles.optionButton, styles.correct];
            } else if (option === selected && selected !== q.correctAnswer) {
              optionStyle = [styles.optionButton, styles.wrong];
            }
          } else if (option === selected) {
            optionStyle = [styles.optionButton, styles.selected];
          }
          return (
            <Pressable
              key={index}
              style={optionStyle}
              onPress={() => handleSelect(q.id, option)}
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
  