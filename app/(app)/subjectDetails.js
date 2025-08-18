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

return (
    <View style={styles.levelContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.levelButton,
          { backgroundColor: subjectColors[subject] || "#2563eb" },
          pressed && styles.buttonPressed,
        ]}
        onPress={() => handleLevelPress(level)}
      >
        <Text style={styles.buttonText}>{level}</Text>
      </Pressable>
      {isExpanded && (
        <View style={styles.dropdownContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.dropdownButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleResourcePress}
          >
            <Text style={styles.dropdownText}>Resource (PDF)</Text>
          </Pressable>
          <View style={styles.tutorialContainer}>
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
                  style={({ pressed }) => [
                    styles.navButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => handleTutorialPrev(level)}
                >
                  <Text style={styles.navButtonText}>Previous</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    styles.navButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={() => handleTutorialNext(level)}
                >
                  <Text style={styles.navButtonText}>Next</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.dropdownButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => handleQuizPress(level)}
          >
            <Text style={styles.dropdownText}>Take Quiz</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <Text style={styles.title}>{subject || "Subject Details"}</Text>
      <FlatList
        data={levels}
        renderItem={renderLevelItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.buttonSection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#1a1a1a",
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  levelContainer: {
    marginVertical: 8,
  },
  levelButton: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb", // Fallback background color
    elevation: 8, // Unified for Android
    shadowColor: "#000", // Unified for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  dropdownContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  dropdownButton: {
    width: "100%",
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  dropdownText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  tutorialContainer: {
    marginVertical: 6,
  },
  videoPlaceholder: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    margin: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  videoFrame: {
    width: "80%",
    maxWidth: 600,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  },
  navButton: {
    padding: 8,
    backgroundColor: "#e94560",
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  
  
  loadingPlaceholder: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 15, // Adapted from eschool.css navigation-buttons
  },
  navButton: {
    padding: 8,
    backgroundColor: "#e94560", // Adapted from eschool.css --highlight-color
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
  