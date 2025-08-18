// import { Video } from "expo-av";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useState } from "react";
// import { FlatList, Linking, Pressable, StyleSheet, Text, View } from "react-native";
// import HomeHeader from "../../components/HomeHeader";
// export default function SubjectDetails() {
const router = useRouter();
  const { subject } = useLocalSearchParams();
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState({});

  const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

  // Hardcoded resources (PDFs) and tutorials (video URLs) for each subject
  const resources = {
    Science: "https://www.example.com/science.pdf",
    Mathematics: "https://www.example.com/math.pdf",
    "Social Studies": "https://www.example.com/social-studies.pdf",
    Language: "https://www.example.com/language.pdf",
    "Art & Music": "https://www.example.com/art-music.pdf",
  };

  