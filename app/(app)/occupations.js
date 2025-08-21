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

// export default function Occupations() {
//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={styles.title}>Occupations</Text>
      
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


// occupation.js
import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import HomeHeader from "../../components/HomeHeader";

const occupations = [
   {
    id: "1",
    name: "Scientist",
    image: "https://static.vecteezy.com/system/resources/thumbnails/050/907/287/small/a-cartoon-black-man-in-a-lab-coat-holding-a-test-tube-png.png",
    brief: "A scientist discovers new knowledge.",
    line: "Scientists explore and invent to improve life."
  },
  {
    id: "2",
    name: "Teacher",
    image: "https://static.vecteezy.com/system/resources/thumbnails/052/644/668/small_2x/cartoon-style-female-teacher-for-educational-materials-on-transparent-background-png.png",
    brief: "A teacher educates students.",
    line: "Teachers guide students to learn new things."
  },
  {
    id: "3",
    name: "Engineer",
    image: "https://png.pngtree.com/png-clipart/20250417/original/pngtree-engineer-boy-holding-a-blueprint-png-image_20819647.png",
    brief: "An engineer designs and builds solutions.",
    line: "Engineers solve problems with creativity and science."
  },
  {
    id: "4",
    name: "Farmer",
    image: "https://static.vecteezy.com/system/resources/previews/025/002/409/non_2x/cute-cartoon-farmer-character-on-transparent-background-generative-ai-png.png",
    brief: "A farmer grows crops and raises animals.",
    line: "Farmers provide us with food and resources."
  },
  {
    id: "5",
    name: "Police Officer",
    image: "https://png.pngtree.com/png-vector/20240103/ourmid/pngtree-3d-kids-cartoon-police-officer-png-image_11400537.png",
    brief: "A police officer maintains law and order.",
    line: "Police officers keep people safe in the community."
  },
  {
    id: "6",
    name: "Chef",
    image: "https://static.vecteezy.com/system/resources/previews/034/095/052/non_2x/cooking-children-boy-little-kids-making-delicious-food-professional-chef-free-png.png",
    brief: "A chef prepares delicious meals.",
    line: "Chefs cook tasty food for people to enjoy."
  },
  {
    id: "7",
    name: "Pilot",
    image: "https://png.pngtree.com/png-vector/20220603/ourmid/pngtree-a-vintage-plane-with-a-young-pilot-background-jetplane-fast-vector-png-image_36946232.png",
    brief: "A pilot flies airplanes.",
    line: "Pilots take passengers safely to their destinations."
  },
  {
    id: "8",
    name: "Firefighter",
    image: "https://png.pngtree.com/png-vector/20241018/ourmid/pngtree-water-fire-fighter-png-image_14110371.png",
    brief: "A firefighter saves lives from fire.",
    line: "Firefighters are brave heroes who put out fires."
  },
  {
    id: "9",
    name: "Artist",
    image: "https://png.pngtree.com/png-clipart/20230824/original/pngtree-art-club-after-lessons-for-pupils-picture-image_8395369.png",
    brief: "An artist creates paintings and designs.",
    line: "Artists express creativity through art."
  },
   {
    id: "10",
    name: "Doctor",
    image: "https://static.vecteezy.com/system/resources/thumbnails/023/366/300/small_2x/doctor-and-patient-medical-health-care-concept-png.png",
    brief: "A doctor treats patients and saves lives.",
    line: "Doctors help people stay healthy and recover from illness."
  }
];

export default function Occupations() {
  const speak = (line) => {
    Speech.speak(line, { language: "en" });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => speak(item.line)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.brief}>{item.brief}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container_home}>
          <HomeHeader />
    <View style={styles.container}>
      <FlatList
        data={occupations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container_home: {
    flex: 1,
    backgroundColor: "white",
  },
  container: { flex: 1, backgroundColor: "#FFF", padding: 10 },
  list: { justifyContent: "center" },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    alignItems: "center",
    padding: 12,
    height: 300,
    width:300,
    elevation: 3
  },
  image: { width: 200, height: 200, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  brief: { fontSize: 12, color: "#555", textAlign: "center" }
});

