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

// export default function Animals() {
//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={styles.title}>Animals</Text>

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
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";
import HomeHeader from "../../components/HomeHeader";

const animals = [
  {
    id: "1",
    name: "Cat",
    image: "https://c8.alamy.com/comp/2FWN3WC/cute-cat-cartoon-cat-clipart-vector-illustration-2FWN3WC.jpg",
    sound: require("../../assets/sounds/cat.mp3"),
  },
  {
    id: "2",
    name: "Dog",
    image: "https://cdn.pixabay.com/photo/2020/02/12/05/16/dog-cartoon-4841703_1280.jpg",
    sound: require("../../assets/sounds/dog.mp3"),
  },
  {
    id: "3",
    name: "Cow",
    image: "https://thumbs.dreamstime.com/b/cartoon-farm-animals-kids-cute-cow-stands-smiles-71212241.jpg",
    sound: require("../../assets/sounds/cow.mp3"),
  },
  {
    id: "4",
    name: "Lion",
    image: "https://www.shutterstock.com/image-vector/cartoon-happy-lion-isolated-on-600nw-675125593.jpg",
    sound: require("../../assets/sounds/Tiger.mp3"),
  },
  {
    id: "5",
    name: "Duck",
    image: "https://thumbs.dreamstime.com/b/cute-baby-duck-cartoon-illustration-70354241.jpg",
    sound: require("../../assets/sounds/duck.mp3"),
  },
  {
    id: "6",
    name: "Elephant",
    image: "https://img.freepik.com/premium-vector/simple-vector-illustration-elephant-kids-book_925324-17537.jpg",
    sound: require("../../assets/sounds/Elefant.mp3"),
  },
  {
    id: "7",
    name: "Bird",
    image: "https://img.freepik.com/free-vector/colorful-cartoon-macaw-branch_1308-181913.jpg?semt=ais_hybrid&w=740&q=80",
    sound: require("../../assets/sounds/bird.mp3"),
  },
  {
    id: "8",
    name: "Monkey",
    image: "https://thumbs.dreamstime.com/b/cute-baby-monkey-hanging-tree-illustration-64982607.jpg",
    sound: require("../../assets/sounds/monkey.mp3"),
  },
  
];

export default function Animals() {
  const [sound, setSound] = useState();

  async function playSound(animalSound) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync( animalSound );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const renderItem = ({ item }) => (
    
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => playSound(item.sound)}
        >
          <Text style={styles.buttonText}>Play Sound</Text>
        </TouchableOpacity>
      </View>
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />
    <FlatList
      data={animals}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
