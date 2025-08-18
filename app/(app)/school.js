import { useRouter } from "expo-router";
#import { Platform, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import SearchBar from "../../components/SearchBar";
import SquareButton from "../../components/SquareButton";
import { useBookmarks } from "./BookmarkContext";

export default function School() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { toggleBookmark, bookmarks } = useBookmarks();

  const data = ["Bangla", "English", "History", "Arts and Crafts"];
  const subjects = ["Science", "Mathematics", "Social Studies", "Language", "Art & Music"];

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const subjectColors = {
    Science: "#27AE60", // Vibrant green
    Mathematics: "#2980B9", // Deep blue
    "Social Studies": "#D35400", // Rich orange
    Language: "#8E44AD", // Vivid purple
    "Art & Music": "#C0392B", // Bold red
  };

  const handleSubjectPress = (subject) => {
    router.push({
      pathname: "/subjectDetails",
      params: { subject },
    });
  };

 return (
    <View style={styles.container_home}>
      <HomeHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search */}
        <View style={styles.searchContainer}>
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
                <Text style={styles.searchItem}>{item}</Text>
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
              title="Your Course"
              iconName="book"
              onPress={() => router.push("/CourseScreen")}
              style={styles.largeButton}
            />
            <SquareButton
              title="Library"
              iconName="bookmark-outline"
              onPress={() => router.push("/bookmark")}
              style={styles.largeButton}
            />
          </View>
        </View>

        {/* Subjects Section */}
        <Text style={styles.title}>Subjects</Text>
        <View style={styles.wrapper}>
          {Array(Math.ceil(subjects.length / 2))
            .fill()
            .map((_, rowIndex) => {
              const isLastRow = subjects.slice(rowIndex * 2, rowIndex * 2 + 2).length === 1;
              return (
                <View
                  key={rowIndex}
                  style={isLastRow ? styles.leftAlignedRow : styles.subjectRow}
                >
                  {subjects.slice(rowIndex * 2, rowIndex * 2 + 2).map((subject, subIndex) => (
                    <SquareButton
                      key={subIndex}
                      title={subject}
                      onPress={() => handleSubjectPress(subject)}
                      style={[styles.subjectButton, { backgroundColor: subjectColors[subject] }]}
                    />
                  ))}
                  {isLastRow && <View style={styles.subjectSpacer} />}
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingBottom: 50,
  },
  searchContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 12,
    ...(Platform && Platform.select ? Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      default: { elevation: 4 },
    }) : { elevation: 4 }),
  },
  searchItem: {
    fontSize: 18,
    padding: 8,
    color: "#333",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#1a1a1a",
  },
  wrapper: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  