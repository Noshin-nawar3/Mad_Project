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

  