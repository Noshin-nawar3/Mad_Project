import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function SubjectButton({ title, onPress, color, image }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {/* Static image */}
        <Image source={image} style={styles.image} resizeMode="contain" />

        {/* Subject name */}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: "47%",
    maxWidth: "47%",
    width: wp(50),
    height: 200,
    margin: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
  },
  content: {
    //alignItems: "center",
    margin: 8,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
});
