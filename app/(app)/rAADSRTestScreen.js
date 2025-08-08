// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Asset from 'expo-asset';
// import * as FileSystem from 'expo-file-system';
// import Papa from 'papaparse';
// import { useEffect, useState } from 'react';
// import {
//     ActivityIndicator, Alert,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// const OPTIONS = [
//   { label: 'True now and when I was young', value: 3 },
//   { label: 'True only now', value: 2 },
//   { label: 'True only when I was young', value: 1 },
//   { label: 'Never true', value: 0 },
// ];

// const calculateSectionScores = (questions, answers) => {
//   const sections = {};
//   for (const q of questions) {
//     const cat = q.category || 'Unknown';
//     if (!sections[cat]) sections[cat] = 0;
//     const ans = answers[q.id];
//     if (typeof ans === 'number') sections[cat] += ans;
//   }
//   return sections;
// };

// export default function RAADSRTestScreen({ navigation }) {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadCSV();
//   }, []);

//   const loadCSV = async () => {
//     try {
//       const asset = Asset.Asset.fromModule(require('../assets/raadsr_questions_with_categories.csv'));
//       await asset.downloadAsync();
//       const fileUri = asset.localUri || asset.uri;
//       const csvString = await FileSystem.readAsStringAsync(fileUri);
//       const parsed = Papa.parse(csvString, { header: true });
//       const filtered = parsed.data.filter(q => q.id && q.text && q.category);
//       setQuestions(filtered);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to load questions.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (qid, value) => {
//     setAnswers(prev => ({ ...prev, [qid]: value }));
//   };

//   const handleSubmit = async () => {
//     if (Object.keys(answers).length !== questions.length) {
//       Alert.alert('Incomplete', 'Please answer all questions.');
//       return;
//     }

//     const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
//     const sections = calculateSectionScores(questions, answers);
//     const date = new Date().toISOString();

//     // Store answers in detail
//     const detailedAnswers = questions.map(q => ({
//       id: q.id,
//       text: q.text,
//       category: q.category,
//       answer: answers[q.id],
//     }));

//     const result = {
//       date,
//       score,
//       sectionScores: sections,
//       answers: detailedAnswers,
//     };

//     try {
//       const stored = await AsyncStorage.getItem('@raadsr_history');
//       const history = stored ? JSON.parse(stored) : [];
//       history.push(result);
//       await AsyncStorage.setItem('@raadsr_history', JSON.stringify(history));
//       navigation.navigate('Test History');
//     } catch (e) {
//       Alert.alert('Error saving result');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" />
//         <Text>Loading Test...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>RAADS-R Test</Text>
//       {questions.map((q, index) => (
//         <View key={q.id} style={styles.questionContainer}>
//           <Text style={styles.questionText}>
//             {index + 1}. {q.text}
//           </Text>
//           {OPTIONS.map(opt => (
//             <TouchableOpacity
//               key={opt.label}
//               style={[
//                 styles.option,
//                 answers[q.id] === opt.value && styles.selectedOption,
//               ]}
//               onPress={() => handleSelect(q.id, opt.value)}
//             >
//               <Text>{opt.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       ))}
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Submit Test</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   questionContainer: {
//     marginBottom: 20,
//   },
//   questionText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   option: {
//     padding: 10,
//     backgroundColor: '#eee',
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   selectedOption: {
//     backgroundColor: '#cde',
//   },
//   button: {
//     backgroundColor: '#2563eb',
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 30,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
// });
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
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

const questionsData = [
  { id: '1', text: 'I often notice small sounds when others do not.', category: 'Sensory' },
  { id: '2', text: 'I get strongly absorbed in one thing to the exclusion of everything else.', category: 'Circumscribed Interests' },
  { id: '3', text: 'I sometimes notice small sounds when others do not.', category: 'Sensory' },
  { id: '4', text: 'I usually concentrate more on the whole picture, rather than the small details.', category: 'Social' },
  { id: '5', text: 'I find it easy to do more than one thing at once.', category: 'Social' },
  { id: '6', text: 'I enjoy social occasions.', category: 'Social' },
  { id: '7', text: 'I find it difficult to work out people\'s intentions.', category: 'Social' },
  { id: '8', text: 'I find social situations easy.', category: 'Social' },
  { id: '9', text: 'I frequently get so strongly absorbed in one thing that I lose sight of other things.', category: 'Circumscribed Interests' },
  { id: '10', text: 'I find it easy to figure out what someone is thinking or feeling just by looking at their face.', category: 'Social' },
  { id: '11', text: 'I like to collect information about categories of things.', category: 'Circumscribed Interests' },
  { id: '12', text: 'I find it easy to make new friends.', category: 'Social' },
  { id: '13', text: 'I notice patterns in things all the time.', category: 'Circumscribed Interests' },
  { id: '14', text: 'I would rather go to a library than a party.', category: 'Social' },
  { id: '15', text: 'I find social situations confusing.', category: 'Social' },
  { id: '16', text: 'I tend to notice details that others do not.', category: 'Sensory' },
  { id: '17', text: 'I enjoy meeting new people.', category: 'Social' },
  { id: '18', text: 'I notice small changes in a person\'s appearance.', category: 'Sensory' },
  { id: '19', text: 'I prefer to do things the same way over and over again.', category: 'Circumscribed Interests' },
  { id: '20', text: 'I find it easy to spot someone\'s mood from their facial expression.', category: 'Social' },
  { id: '21', text: 'I only like to talk to people who share my special interests.', category: 'Circumscribed Interests' },
  { id: '22', text: 'I get easily overwhelmed by sensory input.', category: 'Sensory' },
  { id: '23', text: 'I often miss social cues.', category: 'Social' },
  { id: '24', text: 'I enjoy being in crowded places.', category: 'Social' },
  { id: '25', text: 'I often interpret things too literally.', category: 'Language' },
  { id: '26', text: 'I like to be around other people.', category: 'Social' },
  { id: '27', text: 'I often feel that I am talking \'at\' someone rather than \'with\' them.', category: 'Social' },
  { id: '28', text: 'I prefer routines and get upset when they are changed.', category: 'Circumscribed Interests' },
  { id: '29', text: 'I have difficulty understanding non-literal language.', category: 'Language' },
  { id: '30', text: 'I find loud noises overwhelming.', category: 'Sensory' },
  { id: '31', text: 'I enjoy social chit-chat.', category: 'Social' },
  { id: '32', text: 'I often feel socially awkward.', category: 'Social' },
  { id: '33', text: 'I find changes in my routine distressing.', category: 'Circumscribed Interests' },
  { id: '34', text: 'I have a strong interest in specific topics.', category: 'Circumscribed Interests' },
  { id: '35', text: 'I tend to take things literally.', category: 'Language' },
  { id: '36', text: 'I avoid eye contact during conversations.', category: 'Social' },
  { id: '37', text: 'I prefer to spend time alone.', category: 'Social' },
  { id: '38', text: 'I often miss the point of jokes and sarcasm.', category: 'Language' },
  { id: '39', text: 'I get anxious in unfamiliar situations.', category: 'Social' },
  { id: '40', text: 'I like to have things in a particular order.', category: 'Circumscribed Interests' },
  { id: '41', text: 'I often focus on parts of objects rather than the whole.', category: 'Sensory' },
  { id: '42', text: 'I enjoy being the center of attention.', category: 'Social' },
  { id: '43', text: 'I find facial expressions hard to read.', category: 'Social' },
  { id: '44', text: 'I have trouble understanding others’ emotions.', category: 'Social' },
  { id: '45', text: 'I enjoy participating in group conversations.', category: 'Social' },
  { id: '46', text: 'I feel more comfortable with things than with people.', category: 'Social' },
  { id: '47', text: 'I tend to monologue about my interests.', category: 'Circumscribed Interests' },
  { id: '48', text: 'I find it difficult to understand body language.', category: 'Social' },
  { id: '49', text: 'I enjoy team sports.', category: 'Social' },
  { id: '50', text: 'I find it difficult to adapt to new environments.', category: 'Social' },
  { id: '51', text: 'I often repeat phrases or sounds.', category: 'Circumscribed Interests' },
  { id: '52', text: 'I enjoy spontaneous activities.', category: 'Social' },
  { id: '53', text: 'I have trouble starting conversations.', category: 'Social' },
  { id: '54', text: 'I prefer facts over stories.', category: 'Circumscribed Interests' },
  { id: '55', text: 'I often misunderstand jokes.', category: 'Language' },
  { id: '56', text: 'I like predictable situations.', category: 'Circumscribed Interests' },
  { id: '57', text: 'I find it hard to know what to say in social situations.', category: 'Social' },
  { id: '58', text: 'I enjoy multi-step tasks.', category: 'Circumscribed Interests' },
  { id: '59', text: 'I often feel disconnected from others.', category: 'Social' },
  { id: '60', text: 'I prefer to plan things in advance.', category: 'Circumscribed Interests' },
  { id: '61', text: 'I feel uneasy in social gatherings.', category: 'Social' },
  { id: '62', text: 'I enjoy discussing a wide variety of topics.', category: 'Social' },
  { id: '63', text: 'I like to stick to my habits.', category: 'Circumscribed Interests' },
  { id: '64', text: 'I often take comments too personally.', category: 'Social' },
  { id: '65', text: 'I have trouble understanding metaphor.', category: 'Language' },
  { id: '66', text: 'I feel more comfortable following a script in conversations.', category: 'Social' },
  { id: '67', text: 'I often don’t realize I’m talking too much.', category: 'Social' },
  { id: '68', text: 'I enjoy being spontaneous.', category: 'Social' },
  { id: '69', text: 'I get upset by certain textures or fabrics.', category: 'Sensory' },
  { id: '70', text: 'I find sudden noises distressing.', category: 'Sensory' },
  { id: '71', text: 'I avoid group activities.', category: 'Social' },
  { id: '72', text: 'I like working on repetitive tasks.', category: 'Circumscribed Interests' },
  { id: '73', text: 'I find it easy to understand other people\'s perspectives.', category: 'Social' },
  { id: '74', text: 'I am sensitive to lights and sounds.', category: 'Sensory' },
  { id: '75', text: 'I like rules and structure.', category: 'Circumscribed Interests' },
  { id: '76', text: 'I feel anxious when my schedule is disrupted.', category: 'Circumscribed Interests' },
  { id: '77', text: 'I find comfort in routines.', category: 'Circumscribed Interests' },
  { id: '78', text: 'I like spending time thinking about systems.', category: 'Circumscribed Interests' },
  { id: '79', text: 'I often miss emotional cues in conversation.', category: 'Social' },
  { id: '80', text: 'I enjoy fiction and imaginary worlds.', category: 'Circumscribed Interests' },
];

export default function rAADSRTestScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setQuestions(questionsData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSelect = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < 5) {
      Alert.alert('Incomplete', 'Please answer at least 5 questions.');
      return;
    }

    const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const sections = calculateSectionScores(questions, answers);
    const date = new Date().toISOString();

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
      router.push('specialChild_dashboard');// Navigate to dashboard (root route)
    } catch (e) {
      //Alert.alert('Error saving result');
      router.push('specialChild_dashboard');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading Test...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                <Text style={styles.optionText}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleSubmit}
        disabled={Object.keys(answers).length < 5}
      >
        <Text style={styles.buttonText}>Submit Test</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, // Extra padding to prevent overlap with floating button
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  questionContainer: {
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#444',
  },
  option: {
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#a3bffa',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    elevation: 8, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
