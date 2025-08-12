import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, ScrollView, FlatList, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";
import SquareButton from "../../components/SquareButton";
import FullWidthButton from "../../components/FullwidthButton";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";

export default function School() {
  const router = useRouter(); // ✅ FIXED
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
              onPress={() => router.push("/")}
              style={styles.largeButton}
            />
            <SquareButton
              title="Quiz"
              iconName="clipboard-text-outline"
              onPress={() => router.push("/QuizScreen")}
              style={styles.largeButton}
            />
          </View>
        </View>

        {/* Courses List */}
        <Text style={styles.title}>Courses</Text>
        <View style={styles.buttonSection}>
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/chat")}
          />
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/NoticeScreen")}
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
    marginTop: 30,
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
    flexWrap: "wrap", // ✅ so buttons wrap to next row if needed
  },
});
