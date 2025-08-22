// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import HomeHeader from "../../components/HomeHeader";
// import { useAuth } from "../../context/authContext";
// import ArtsButton from "../../components/Artsbutton";

// export default function Music() {
//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={styles.title}>Music</Text>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container_home: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#DBEAFE",
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     marginTop: 0,
//     fontSize: 24,
//     fontWeight: "bold",
//     marginLeft: 30,
//   },

//   button: {
//     backgroundColor: "#2563eb",
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonSection: {
//     marginTop: 20,
//     paddingHorizontal: 16,
//     width: "100%",
//     gap: 16,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginVertical: 10,
//     flexWrap: "wrap",
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
//   icon: {
//     marginRight: 4,
//   },
// });

// /*
// import React from "react";
// import { ScrollView, View } from "react-native";
// import CourseCard from "../../components/CourseCard";

// export default function CoursesScreen() {
//   return (
//     <ScrollView style={{ padding: 16 }}>
//       <CourseCard
//         image="https://images.pexels.com/photos/4145195/pexels-photo-4145195.jpeg"
//         title="React Native for Beginners"
//         description="Learn how to build cross-platform mobile apps using React Native and Expo."
//         length="5h 30m"
//         rating="4.8"
//         onFavoriteToggle={(fav) => console.log("Favorite status:", fav)}
//       />
//       <CourseCard
//         image="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
//         title="Advanced JavaScript"
//         description="Master closures, async programming, and advanced concepts."
//         length="3h 45m"
//         rating="4.6"
//       />
//     </ScrollView>
//   );
// }

// */



import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Button } from "react-native";
import { Audio } from "expo-av";
import HomeHeader from "../../components/HomeHeader";

const instruments = [
  { id: "1", name: "Guitar", image: "https://t4.ftcdn.net/jpg/00/88/62/69/360_F_88626943_tu0ocRTmB6OpdrkyHtmsOBh1JJiM3HNn.jpg", sound: require("../../assets/sounds/g.mp3") },
  // { id: "2", name: "Piano", image: "https://i.imgur.com/RS2bR02.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  // { id: "3", name: "Violin", image: "https://i.imgur.com/8qV4YbB.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  // { id: "4", name: "Tabla", image: "https://i.imgur.com/ocg9t6r.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  // { id: "5", name: "Flute", image: "https://i.imgur.com/1L6vMzL.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  // { id: "6", name: "Drums", image: "https://i.imgur.com/F2I5vTg.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  // { id: "7", name: "Sitar", image: "https://i.imgur.com/LpFrvGz.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  // { id: "8", name: "Harmonium", image: "https://i.imgur.com/3F3Czbh.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  // { id: "9", name: "Saxophone", image: "https://i.imgur.com/UyWpPXv.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  // { id: "10", name: "Veena", image: "https://i.imgur.com/n8T7XLF.jpg", sound: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
];

export default function MusicList() {
  const [soundObj, setSoundObj] = useState(null);

  const playSound = async (soundUrl) => {
    try {
      // Stop any currently playing sound
      if (soundObj) {
        await soundObj.stopAsync();
        await soundObj.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(soundUrl );
      setSoundObj(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  const stopSound = async () => {
    if (soundObj) {
      await soundObj.stopAsync();
      await soundObj.unloadAsync();
      setSoundObj(null);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.buttonRow}>
        <Button title="Start" onPress={() => playSound(item.sound)} color="#10b981" />
        <Button title="Stop" onPress={stopSound} color="#ef4444" />
      </View>
    </View>
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <View style={styles.container}>
        <FlatList
          data={instruments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: 10,
    overflow: "hidden",
    elevation: 4,
    paddingBottom: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    padding: 10,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
