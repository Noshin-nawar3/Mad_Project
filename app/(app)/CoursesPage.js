import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useBookmarks } from "./BookmarkContext";

const courses = [
  { id: 1, title: "React Native Basics" },
  { id: 2, title: "Advanced React Native" },
  { id: 3, title: "Machine Learning 101" },
];
// CoursePage.js
// const addBookmark = (course) => {
//   addBookmarkAction({
//     id: course.id,
//     title: course.title,
//     description: course.description,
//     duration: course.duration,
//     rating: course.rating,
//   });
// };


export default function CoursesPage({ navigation }) {
  const { addBookmark } = useBookmarks();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Go to Bookmarks" onPress={() => navigation.navigate("Bookmarks")} />
      {/* <Button title="Add to Bookmark" onPress={() => addBookmark(item)} /> */}

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, borderWidth: 1 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Button title="Add to Bookmark" onPress={() => addBookmark(item)} />
            <Button title="View Details" onPress={() => navigation.navigate("CourseDetails", { course: item })} />
          </View>
        )}
      />
  </View>
);
}
