// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import HomeHeader from "../../components/HomeHeader";
// import { useAuth } from "../../context/authContext";
// import ArtsButton from "../../components/Artsbutton";

// const COLORS = [
//   { name: "Red", value: "#FF0000" },
//   { name: "Green", value: "#00FF00" },
//   { name: "Blue", value: "#0000FF" },
//   { name: "Yellow", value: "#FFFF00" },
//   { name: "Orange", value: "#FFA500" },
//   { name: "Purple", value: "#800080" },
//   { name: "Pink", value: "#FFC0CB" },
//   { name: "Brown", value: "#8B4513" },
//   { name: "Black", value: "#000000" },
//   { name: "White", value: "#FFFFFF" },
// ];

// export default function Colors() {
//     const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

//   const handlePress = (color) => {
//     setBackgroundColor(color);
//     setTimeout(() => {
//       setBackgroundColor("#FFFFFF"); // Reset to white after 5 seconds
//     }, 5000);
//   };
//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={styles.title}>Colors</Text>
//       <ScrollView>
// <View style={[styles.container, { backgroundColor }]}>
//       <View style={styles.grid}>
//         {COLORS.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[styles.colorBox, { backgroundColor: item.value }]}
//             onPress={() => handlePress(item.value)}
//           >
//             <Text
//               style={[
//                 styles.colorText,
//                 { color: item.name === "Yellow" || item.name === "White" ? "#000" : "#FFF" },
//               ]}
//             >
//               {item.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//       </ScrollView>
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
//     alignItems: "center",
//   },
//   title: {
//     marginTop: 0,
//     fontSize: 24,
//     fontWeight: "bold",
//     marginLeft: 30,
//   },
//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   colorBox: {
//     width: 100,
//     height: 100,
//     margin: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     elevation: 5,
//   },
//   colorText: {
//     fontSize: 18,
//     fontWeight: "bold",
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

// colors.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeHeader from "../../components/HomeHeader";

const COLORS = [
  { name: "Red", value: "#FF0000" },
  { name: "Green", value: "#00FF00" },
  { name: "Blue", value: "#0000FF" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Orange", value: "#FFA500" },
  { name: "Purple", value: "#800080" },
  { name: "Pink", value: "#FFC0CB" },
  { name: "Brown", value: "#8B4513" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
];

export default function Colors() {
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const handlePress = (color) => {
    setBackgroundColor(color);
    setTimeout(() => {
      setBackgroundColor("#FFFFFF"); // Reset to white after 5 seconds
    }, 5000);
  };

  return (
    <View style={styles.container_home}>
       <HomeHeader />
       {/* <Text style={styles.title}>Colors</Text> */}
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.grid}>
        {COLORS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorBox, { backgroundColor: item.value }]}
            onPress={() => handlePress(item.value)}
          >
            <Text
              style={[
                styles.colorText,
                { color: item.name === "Yellow" || item.name === "White" ? "#000" : "#FFF" },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container_home: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  colorBox: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  colorText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

