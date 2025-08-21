import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function CourseVideos() {
  const { title, description, image, length, rating } = useLocalSearchParams();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>
        ⏱ {length} | ⭐ {rating}
      </Text>
      <Text style={styles.description}>{description}</Text>

      <Text style={styles.sectionTitle}>Videos</Text>
      <Text style={styles.sectionText}>
        (Here you will render a list of video lessons for this course)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  meta: { fontSize: 16, color: "#555", marginBottom: 8 },
  description: { fontSize: 16, color: "#444", marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  sectionText: { fontSize: 16, color: "#444" },
});
