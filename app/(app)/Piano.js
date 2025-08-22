// PianoScreen.js
import React from "react";
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Audio } from "expo-av";

const screenWidth = Dimensions.get("window").width;

const notes = [
//   { note: "C", key: "white", sound: require("../assets/piano/C.mp3") },
//   { note: "C#", key: "black", sound: require("../assets/piano/Cs.mp3") },
//   { note: "D", key: "white", sound: require("../assets/piano/D.mp3") },
//   { note: "D#", key: "black", sound: require("../assets/piano/Ds.mp3") },
//   { note: "E", key: "white", sound: require("../assets/piano/E.mp3") },
//   { note: "F", key: "white", sound: require("../assets/piano/F.mp3") },
//   { note: "F#", key: "black", sound: require("../assets/piano/Fs.mp3") },
//   { note: "G", key: "white", sound: require("../assets/piano/G.mp3") },
//   { note: "G#", key: "black", sound: require("../assets/piano/Gs.mp3") },
//   { note: "A", key: "white", sound: require("../assets/piano/A.mp3") },
//   { note: "A#", key: "black", sound: require("../assets/piano/As.mp3") },
//   { note: "B", key: "white", sound: require("../assets/piano/B.mp3") },
];

export default function Piano() {
  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.pianoContainer}>
      {notes.map((note, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.key,
            note.key === "white" ? styles.whiteKey : styles.blackKey,
            note.key === "black" ? { marginLeft: -15, zIndex: 1, position: "absolute" } : {},
          ]}
          onPress={() => playSound(note.sound)}
        >
          {note.key === "white" && <Text style={styles.noteLabel}>{note.note}</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pianoContainer: {
    height: 250,
    alignItems: "flex-end",
    padding: 10,
  },
  key: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 2,
  },
  whiteKey: {
    width: 60,
    height: 200,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  blackKey: {
    width: 40,
    height: 120,
    backgroundColor: "#000",
  },
  noteLabel: {
    marginBottom: 5,
    fontWeight: "bold",
  },
});
