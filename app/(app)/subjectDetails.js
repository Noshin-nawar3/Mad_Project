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

  const tutorials = {
  Science: [
    require("./video.mp4"),
    require("./video.mp4"),
    require("./video.mp4"),
  ],
  Mathematics: [
    require("./video.mp4"),
    require("./video.mp4"),
    require("./video.mp4"),
  ],
  "Social Studies": [
    require("./video.mp4"),
    require("./video.mp4"),
    require("./video.mp4"),
  ],
  Language: [
    require("./video.mp4"),
    require("./video.mp4"),
    require("./video.mp4"),
  ],
  "Art & Music": [
    require("./video.mp4"),
    require("./video.mp4"),
    require("./video.mp4"),
  ],
};

  const subjectColors = {
    Science: "#27AE60",
    Mathematics: "#2980B9",
    "Social Studies": "#D35400",
    Language: "#8E44AD",
    "Art & Music": "#C0392B",
  };

  // Debug: Log subject and background color to verify
  console.log("Subject:", subject, "BackgroundColor:", subjectColors[subject] || "#2563eb");

  const handleLevelPress = (level) => {
    setExpandedLevel(expandedLevel === level ? null : level);
    if (expandedLevel !== level) {
      setCurrentVideoIndex((prev) => ({ ...prev, [level]: 0 }));
    }
  };

  const handleResourcePress = () => {
    Linking.openURL(resources[subject] || "https://www.example.com/default.pdf");
  };

  const handleTutorialPrev = (level) => {
    setCurrentVideoIndex((prev) => {
      const videos = tutorials[subject] || [];
      const currentIndex = prev[level] || 0;
      const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
      return { ...prev, [level]: prevIndex };
    });
  };

  const handleTutorialNext = (level) => {
    setCurrentVideoIndex((prev) => {
      const videos = tutorials[subject] || [];
      const currentIndex = prev[level] || 0;
      const nextIndex = (currentIndex + 1) % videos.length;
      return { ...prev, [level]: nextIndex }; // Fixed: Use nextIndex instead of prevIndex
    });
  };

  const handleQuizPress = (level) => {
    router.push({
      pathname: "/quiz",
      params: { subject, level },
    });
  };

  const renderLevelItem = ({ item: level }) => {
  const isExpanded = expandedLevel === level;
  const videos = tutorials[subject] || [];
  const currentIndex = currentVideoIndex[level] || 0;
  const videoUrl = videos[currentIndex] || "";

