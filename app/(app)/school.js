import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, ScrollView, FlatList, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";
import SquareButton from "../../components/SquareButton";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import CourseCard from "../../components/CourseCard";

export default function School() {
  const router = useRouter(); 
  const [search, setSearch] = useState("");
  const data = ["Bangla", "English", "History", "Arts and Crafts"];

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search */}
        <View style={{ flex: 1, padding: 20 }}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search Courses..."
          />

          {search.trim() !== "" && (
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text style={{ fontSize: 18, padding: 8 }}>{item}</Text>
              )}
            />
          )}
        </View>

        {/* School Buttons */}
        <Text style={styles.title}>School</Text>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            <SquareButton
              title="Resource"
              iconName="book-open-page-variant"
              onPress={() => router.push("/resources")}
              style={styles.largeButton}
            />
            <SquareButton
              title="Course"
              iconName="book"
              onPress={() => router.push("/CourseScreen")}
              style={styles.largeButton}
            />
            <SquareButton
              title="Quiz"
              iconName="clipboard-text-outline"
              onPress={() => router.push("/QuizScreen")}
              style={styles.largeButton}
            />
            <SquareButton
              title="Bookmark"
              iconName="bookmark-outline"
              onPress={() => router.push("/bookmark")}
              style={styles.largeButton}
            />
          </View>
        </View>

        {/* Courses List */}
        <Text style={styles.title}>Courses</Text>
        <View style={styles.buttonSection}>
      <CourseCard
        image="https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg"
        title="React Native for Beginners"
        description="Learn how to build cross-platform mobile apps using React Native and Expo."
        length="5h 30m"
        rating="4.8"
        onFavoriteToggle={(fav) => console.log("Favorite status:", fav)}
        onPress={() => router.push("/courseDetails")}
      />
      <CourseCard
        image="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
        title="Advanced JavaScript"
        description="Master closures, async programming, and advanced concepts."
        length="3h 45m"
        rating="4.6"
        onPress={() => router.push("/courseDetails")}
      />
   
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  title: {
    marginTop: 0,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
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
});
