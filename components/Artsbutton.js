import React from "react";
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function ArtsButton({ 
  title, 
  brief, 
  image, 
  onPress, 
  bgColor = "#FFF", 
  textColor = "#1F2937" 
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: bgColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.brief, { color: "#6B7280" }]}>{brief}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    borderRadius: 16,
    alignSelf: "center",
    marginVertical: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    backgroundColor: "#FFF",
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    marginBottom:30,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  textContainer: {
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 15,
    marginBottom:50,

  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 4,
  },
  brief: {
    fontSize: 14,
    fontWeight: "400",
  },
});
