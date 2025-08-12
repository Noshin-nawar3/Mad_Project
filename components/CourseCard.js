import React, { useState } from "react";
import { Pressable,View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CourseCard({
  image,
  title,
  description,
  length,
  rating,
  onFavoriteToggle,
  onPress,
  isFavorite: initialFavorite = false,
}) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (onFavoriteToggle) onFavoriteToggle(!isFavorite);
  };

  return (
    <Pressable style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} />

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteBtn} onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? "#e63946" : "#fff"}
          />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={16} color="#555" />
              <Text style={styles.infoText}>{length}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="star" size={16} color="#f4c430" />
              <Text style={styles.infoText}>{rating}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 6,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#555",
  },
});
