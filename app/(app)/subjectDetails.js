import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import HomeHeader from "../../components/HomeHeader";
import LevelMap from "../../components/LevelMap";

export default function SubjectDetails() {
  const router = useRouter();
  const { subject } = useLocalSearchParams();
  const [expandedLevel, setExpandedLevel] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState({});
  const [currentLevel, setCurrentLevel] = useState(1);

  const levels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];

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

  const handleLevelPress = (lvl) => {
    setExpandedLevel(expandedLevel === lvl ? null : lvl);
    setCurrentLevel(parseInt(lvl.split(" ")[1])); // e.g. "Level 2" -> 2
    if (expandedLevel !== lvl) {
      setCurrentVideoIndex((prev) => ({ ...prev, [lvl]: 0 }));
    }
  };

  const handleResourcePress = () => {
    Linking.openURL(
      resources[subject] || "https://www.example.com/default.pdf"
    );
  };

  const handleTutorialPrev = (lvl) => {
    setCurrentVideoIndex((prev) => {
      const videos = tutorials[subject] || [];
      const currentIndex = prev[lvl] || 0;
      const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
      return { ...prev, [lvl]: prevIndex };
    });
  };

  const handleTutorialNext = (lvl) => {
    setCurrentVideoIndex((prev) => {
      const videos = tutorials[subject] || [];
      const currentIndex = prev[lvl] || 0;
      const nextIndex = (currentIndex + 1) % videos.length;
      return { ...prev, [lvl]: nextIndex };
    });
  };

  const handleQuizPress = (lvl) => {
    router.push({
      pathname: "/quiz",
      params: { subject, level: lvl },
    });
  };

  const renderExpandedContent = (lvl) => {
    const videos = tutorials[subject] || [];
    const currentIndex = currentVideoIndex[lvl] || 0;
    const videoUrl = videos[currentIndex] || "";

    return (
      <ScrollView>
      <View style={styles.dropdownContainer}>
        {/* Video Section */}
        <View style={styles.videoPlaceholder}>
          <View style={styles.videoFrame}>
            <Video
              source={videoUrl}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              isLooping
              onError={(error) => console.log("Video Error:", error)}
            />
          </View>
          <View style={styles.navigationButtons}>
            <Pressable
              style={styles.navButton}
              onPress={() => handleTutorialPrev(lvl)}
            >
              <Text style={styles.navButtonText}>Previous</Text>
            </Pressable>
            <Pressable
              style={styles.navButton}
              onPress={() => handleTutorialNext(lvl)}
            >
              <Text style={styles.navButtonText}>Next</Text>
            </Pressable>
          </View>
        </View>

        {/* Course details Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/courseDetails")}
        >
          <Ionicons name="book-outline" size={28} color="#fff" />
          <Text style={styles.buttonTextin}> Course Details</Text>
        </TouchableOpacity>

        {/* Resource Button */}
        <TouchableOpacity style={styles.button} onPress={handleResourcePress}>
          <Ionicons name="document-attach-outline" size={28} color="#fff" />
          <Text style={styles.buttonTextin}> Resource (PDF)</Text>
        </TouchableOpacity>

        {/* Quiz Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleQuizPress(lvl)}
        >
          <Ionicons name="document-text-outline" size={28} color="#fff" />
          <Text style={styles.buttonTextin}> Take Quiz</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <ScrollView >
      <Text style={styles.title}>{subject || "Subject Details"}</Text>

      <LevelMap
        currentLevel={currentLevel}
        onSelectLevel={(lvlNum) => handleLevelPress(`Level ${lvlNum}`)}
      />

      {/* Expanded content for selected level */}
      {expandedLevel && renderExpandedContent(expandedLevel)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#FDF6E4", // warm pastel background
  },
  wrapper: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#FF6B6B", // bright playful pink-red
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  levelContainer: {
    marginVertical: 10,
  },
  levelButton: {
    width: "100%",
    padding: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD93D", // bright yellow
    elevation: 6,
    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2D4059", // dark navy
    textAlign: "center",
  },
  buttonTextin: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6366F1",
    padding: 15,
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 4,
  },
  dropdownContainer: {
    marginTop: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: "#FF6B6B",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  dropdownButton: {
    width: "100%",
    backgroundColor: "#6BCB77", // soft green
    padding: 15,
    borderRadius: 15,
    marginVertical: 6,
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A", // dark gray
    textAlign: "center",
  },
  tutorialContainer: {
    marginVertical: 8,
  },
  videoPlaceholder: {
    backgroundColor: "#FFF5E1",
    padding: 16,
    borderRadius: 20,
    margin: 10,
    borderWidth: 2,
    borderColor: "#FFD93D",
  },
  videoFrame: {
    width: "90%",
    maxWidth: 600,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingHorizontal: 10,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#FF6B6B", // fun red-pink
    borderRadius: 15,
    alignItems: "center",
    flex: 0.45,
  },
  navButtonText: {
    color: "#1a1a1a",
    fontSize: 16,
  },
});
