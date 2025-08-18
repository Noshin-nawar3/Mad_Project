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

  