import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Asset from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator, Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const OPTIONS = [
  { label: 'True now and when I was young', value: 3 },
  { label: 'True only now', value: 2 },
  { label: 'True only when I was young', value: 1 },
  { label: 'Never true', value: 0 },
];

const calculateSectionScores = (questions, answers) => {
  const sections = {};
  for (const q of questions) {
    const cat = q.category || 'Unknown';
    if (!sections[cat]) sections[cat] = 0;
    const ans = answers[q.id];
    if (typeof ans === 'number') sections[cat] += ans;
  }
  return sections;
};

export default function RAADSRTestScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCSV();
  }, []);

  const loadCSV = async () => {
    try {
      const asset = Asset.Asset.fromModule(require('../assets/raadsr_questions_with_categories.csv'));
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;
      const csvString = await FileSystem.readAsStringAsync(fileUri);
      const parsed = Papa.parse(csvString, { header: true });
      const filtered = parsed.data.filter(q => q.id && q.text && q.category);
      setQuestions(filtered);
    } catch (error) {
      Alert.alert('Error', 'Failed to load questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      Alert.alert('Incomplete', 'Please answer all questions.');
      return;
    }

    const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const sections = calculateSectionScores(questions, answers);
    const date = new Date().toISOString();

    // Store answers in detail
    const detailedAnswers = questions.map(q => ({
      id: q.id,
      text: q.text,
      category: q.category,
      answer: answers[q.id],
    }));

    const result = {
      date,
      score,
      sectionScores: sections,
      answers: detailedAnswers,
    };

    try {
      const stored = await AsyncStorage.getItem('@raadsr_history');
      const history = stored ? JSON.parse(stored) : [];
      history.push(result);
      await AsyncStorage.setItem('@raadsr_history', JSON.stringify(history));
      navigation.navigate('Test History');
    } catch (e) {
      Alert.alert('Error saving result');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading Test...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>RAADS-R Test</Text>
      {questions.map((q, index) => (
        <View key={q.id} style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {index + 1}. {q.text}
          </Text>
          {OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.label}
              style={[
                styles.option,
                answers[q.id] === opt.value && styles.selectedOption,
              ]}
              onPress={() => handleSelect(q.id, opt.value)}
            >
              <Text>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Test</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  option: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedOption: {
    backgroundColor: '#cde',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
