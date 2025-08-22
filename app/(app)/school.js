import { useRouter } from "expo-router";
import { Platform, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import SearchBar from "../../components/SearchBar";
import SquareButton from "../../components/SquareButton";
import { useBookmarks } from "./BookmarkContext";
import SubjectButton from "../../components/SubjectButton";
import CourseCard from "../../components/CourseCard";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FullwidthButton from "../../components/FullwidthButton";

export default function School() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { toggleBookmark, bookmarks } = useBookmarks();

  const subjects = ["Science", "Mathematics", "Social Studies", "Language"];

  // Example subject → image mapping
  const subjectIcons = {
    Science: "flask",
    Mathematics: "calculator",
    "Social Studies": "earth",
    Language: "book-open-variant",
    "Art & Music": "music-note"
  };
  const subjectColors = {
    Science: "#27AE60", // Vibrant green
    Mathematics: "#2980B9", // Deep blue
    "Social Studies": "#D35400", // Rich orange
    Language: "#8E44AD", // Vivid purple
  };

  const handleSubjectPress = (subject) => {
    router.push({
      pathname: "/subjectDetails",
      params: { subject },
    });
  };
    const filteredSubjects = subjects.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search Subject..."
          />
          {search.trim() !== "" && (
            <FlatList
              data={filteredSubjects}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Text
                  style={styles.searchItem}
                  onPress={() => handleSubjectPress(item)}
                >
                  {item}
                </Text>
              )}
            />
          )}
        </View>

        {/* School Buttons */}
        <Text style={styles.title}>School</Text>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            {/* <SquareButton
              title="Resource"
              iconName="book-open-page-variant"
              onPress={() => router.push("/resources")}
              style={styles.largeButton}
            /> */}
            {/* <SquareButton
              title="Your Course"
              iconName="book"
              onPress={() => router.push("/yourCourse")}
              style={styles.largeButton}
            /> */}
            <View style={styles.buttonSection}>
            <FullwidthButton
              title="My Course"
              iconName="book"
              onPress={() => router.push("/yourCourse")}
              
            /></View>
            {/* <SquareButton
              title="Library"
              iconName="bookmark-outline"
              onPress={() => router.push("/bookmark")}
              style={styles.largeButton}
            /> */}
          </View>
        </View>

        {/* Subjects Section */}
        <Text style={styles.title}>Subjects</Text>
        {/* <View style={styles.wrapper}>
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
        </View> */}
        <View style={styles.wrapper}>
          {Array(Math.ceil(subjects.length / 2))
            .fill()
            .map((_, rowIndex) => {
              const rowSubjects = subjects.slice(
                rowIndex * 2,
                rowIndex * 2 + 2
              );
              return (
                <View
                  key={rowIndex}
                  style={
                    rowSubjects.length === 1
                      ? styles.leftAlignedRow
                      : styles.subjectRow
                  }
                >
                  {rowSubjects.map((subject, subIndex) => (
                    <SubjectButton
                      key={subIndex}
                      title={subject}
                      color={subjectColors[subject]}
                      icon={subjectIcons[subject]} // Replace image prop with icon
                      IconComponent={MaterialCommunityIcons} // Add this prop
                      onPress={() => handleSubjectPress(subject)}
                    />
                  ))}
                </View>
              );
            })}
          <View style={styles.leftAlignedRow}>
            <SubjectButton
              title="Art & Music"
              color="#C0392B"
              icon="music-note"
              IconComponent={MaterialCommunityIcons}
              onPress={() => router.push("/arts")}
            />
          </View>
        </View>
        {/* Courses List */}
        {/* <Text style={styles.title}>Courses</Text>
        <View style={styles.buttonSection}>
          <CourseCard
            image="https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg"
            title="React Native for Beginners"
            description="Learn how to build cross-platform mobile apps using React Native and Expo."
            length="5h 30m"
            rating="4.8"
            isFavorite={bookmarks.some(
              (b) => b.title === "React Native for Beginners"
            )}
            onFavoriteToggle={() =>
              toggleBookmark({
                title: "React Native for Beginners",
                description:
                  "Learn how to build cross-platform mobile apps using React Native and Expo.",
                image:
                  "https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg",
                length: "5h 30m",
                rating: "4.8",
              })
            }
            onPress={() =>
              router.push({
                pathname: "/courseDetails",
                params: {
                  title: "React Native for Beginners",
                  description:
                    "Learn how to build cross-platform mobile apps using React Native and Expo.",
                  image:
                    "https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg",
                  length: "5h 30m",
                  rating: "4.8",
                },
              })
            }
          />

          <CourseCard
            image="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
            title="Advanced JavaScript"
            description="Master closures, async programming, and advanced concepts."
            length="3h 45m"
            rating="4.6"
            isFavorite={bookmarks.some(
              (b) => b.title === "Advanced JavaScript"
            )}
            onFavoriteToggle={() =>
              toggleBookmark({
                title: "Advanced JavaScript",
                description:
                  "Master closures, async programming, and advanced concepts.",
                image:
                  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
                length: "3h 45m",
                rating: "4.6",
              })
            }
            onPress={() =>
              router.push({
                pathname: "/courseDetails",
                params: {
                  title: "Advanced JavaScript",
                  description:
                    "Master closures, async programming, and advanced concepts.",
                  image:
                    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
                  length: "3h 45m",
                  rating: "4.6",
                },
              })
            }
          />
        </View> */}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  scrollContent: {
    paddingBottom: 50,
  },
  searchContainer: {
    paddingTop: 20,
    backgroundColor: "#FDF6E4",
    borderColor: "#FDF6E4",
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 12,
  },
  searchItem: {
    fontSize: 18,
    padding: 8,
    color: "#333",
  },
  buttonSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
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
    paddingHorizontal: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    width: "100%",
  },
  spacer: {
    flex: 1,
    minWidth: "48%",
    maxWidth: "48%",
    margin: 4,
  },
  largeButton: {
    flex: 1,
    // minWidth: "48%",
    // maxWidth: "48%",
    width: "100%",
    margin: 4,
  },
  subjectRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  leftAlignedRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 35,
  },
  subjectSpacer: {
    flex: 1,
    minWidth: "42%",
    maxWidth: "42%",
    margin: 6,
    marginLeft: 26, // Matches subjectButton’s effective right margin + gap
  },
  subjectButton: {
    flex: 1,
    minWidth: "42%",
    maxWidth: "42%",
    height: 130,
    margin: 6,
    marginLeft: 26, // Matches paddingHorizontal (20) + margin (6)
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    ...(Platform && Platform.select
      ? Platform.select({
          android: { elevation: 10 },
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
          },
          default: { elevation: 10 },
        })
      : { elevation: 10 }),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
});
