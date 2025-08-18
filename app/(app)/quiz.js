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
    