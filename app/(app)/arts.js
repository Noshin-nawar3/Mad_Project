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

// export default function Arts() {
//      const router = useRouter();
//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={styles.title}>Arts</Text>
//       <View style={styles.wrapper}>
//         <View style={styles.row}>
//         <ArtsButton
//           image={require("../../assets/images/sub.jpg")}
//           title="Alphabets"
//           brief="Explore creative arts and music classes."
//           onPress={() => router.push("/colors")}
//         />
//         </View>

//       </View>
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
//     wrapper: {
//     flex: 1,
//     //alignItems: "flex-start",
//     padding: 15,
//     //backgroundColor: "#FFF",
//   },
// //   row: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginVertical: 8,
// //     //width: "100%",
// //   },
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
//         brief="Learn how to build cross-platform mobile apps using React Native and Expo."
//         length="5h 30m"
//         rating="4.8"
//         onFavoriteToggle={(fav) => console.log("Favorite status:", fav)}
//       />
//       <CourseCard
//         image="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
//         title="Advanced JavaScript"
//         brief="Master closures, async programming, and advanced concepts."
//         length="3h 45m"
//         rating="4.6"
//       />
//     </ScrollView>
//   );
// }

// */

import { useRouter } from "expo-router";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import ArtsButton from "../../components/Artsbutton";

export default function Arts() {
  const router = useRouter();

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <ScrollView>
        <Text style={styles.title}>Arts</Text>
        <View style={styles.wrapper}>
          <ArtsButton
            image={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/012/084/533/small_2x/cartoon-wild-animals-on-white-background-vector.jpg",
            }}
            title="Animals"
            brief="Discover animals with names, sounds, and pictures."
            onPress={() => router.push("/animals")}
          />

          <ArtsButton
            image={{
              uri: "https://static.vecteezy.com/system/resources/previews/016/795/008/non_2x/group-of-people-from-different-occupation-profession-characters-vector.jpg",
            }}
            title="Occupations"
            brief="Explore different jobs and the people who do them."
            onPress={() => router.push("/occupations")}
          />

          <ArtsButton
            image={{
              uri: "https://static.vecteezy.com/system/resources/previews/013/474/331/non_2x/funny-cartoon-kids-playing-music-vector.jpg",
            }}
            title="Music"
            brief="Enjoy musical instruments and simple tunes."
            onPress={() => router.push("/music")}
          />

          <ArtsButton
            image={{
              uri: "https://www.shutterstock.com/image-vector/sun-clouds-rainbow-260nw-622776908.jpg",
            }}
            title="Colors"
            brief="Learn different colors with engaging visuals."
            onPress={() => router.push("/colors")}
          />
          <ArtsButton
            image={{
              uri: "https://plus.unsplash.com/premium_photo-1666739032615-ecbd14dfb543?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxwaGFiZXR8ZW58MHx8MHx8fDA%3D",
            }}
            title="Alphabets"
            brief="Learn A to Z with fun visuals and sounds."
            onPress={() => router.push("/alphabets")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 30,
    marginBottom:30,

  },
  title: {
    marginTop: 10,
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
  },
});
