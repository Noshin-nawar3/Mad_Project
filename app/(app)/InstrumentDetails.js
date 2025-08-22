// InstrumentDetail.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function InstrumentDetail({ route }) {
  const { instrument } = route.params;
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: instrument.sound });
    setSound(sound);
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: instrument.image }} style={styles.image} />
      <Text style={styles.name}>{instrument.name}</Text>
      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Text style={styles.buttonText}>Play Tune</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
