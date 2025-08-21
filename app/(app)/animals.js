import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";
import ArtsButton from "../../components/Artsbutton";

export default function Animals() {
  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <Text style={styles.title}>Animals</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#DBEAFE",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    marginTop: 0,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
});

/*
import React from "react";
import { ScrollView, View } from "react-native";
import CourseCard from "../../components/CourseCard";

export default function CoursesScreen() {
  return (
    <ScrollView style={{ padding: 16 }}>
      <CourseCard
        image="https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg"
        title="React Native for Beginners"
        description="Learn how to build cross-platform mobile apps using React Native and Expo."
        length="5h 30m"
        rating="4.8"
        onFavoriteToggle={(fav) => console.log("Favorite status:", fav)}
      />
      <CourseCard
        image="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
        title="Advanced JavaScript"
        description="Master closures, async programming, and advanced concepts."
        length="3h 45m"
        rating="4.6"
      />
    </ScrollView>
  );
}

*/
