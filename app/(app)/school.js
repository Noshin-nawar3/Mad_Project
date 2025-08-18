import { useRouter } from "expo-router";
import { Platform, useState } from "react";
#import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
#import HomeHeader from "../../components/HomeHeader";
#import SearchBar from "../../components/SearchBar";
#import SquareButton from "../../components/SquareButton";
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

  