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

// export default function Alphabets() {
//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={styles.title}>Alphabets</Text>
      
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


import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import * as Speech from "expo-speech";
import HomeHeader from "../../components/HomeHeader";

const screenWidth = Dimensions.get("window").width;

const alphabets = [
  { id: "A", letter: "A", name: "Apple", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { id: "B", letter: "B", name: "Ball", image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png" },
  { id: "C", letter: "C", name: "Cat", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
  { id: "D", letter: "D", name: "Dog", image: "https://www.shutterstock.com/image-photo/beautiful-golden-retriever-cute-puppy-600nw-2526542701.jpg" },
  { id: "E", letter: "E", name: "Elephant", image: "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" },
  { id: "F", letter: "F", name: "Fish", image: "https://static.vecteezy.com/system/resources/thumbnails/025/381/613/small_2x/sea-life-exotic-tropical-coral-reef-copperband-butterfly-fish-neural-network-ai-generated-photo.jpg" },
  { id: "G", letter: "G", name: "Giraffe", image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg" },
  { id: "H", letter: "H", name: "Horse", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6sf0BPv_sjSiVeeF-Afd3xhQL0EtcmA1bbA&s" },
  { id: "I", letter: "I", name: "Ice cream", image: "https://veenaazmanov.com/wp-content/uploads/2017/07/Homemade-Chocolate-Ice-Cream-3.jpg" },
  { id: "J", letter: "J", name: "Jaguar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RVjP1jhjmO8oeCRfp6MpXWJ_V-tgVqcB9A&s" },
  { id: "K", letter: "K", name: "Kangaroo", image: "https://media.australian.museum/media/dd/thumbnails/images/Red_Kangaroo_Peter_and_Shelly_some_rights_res.width-1200.c03bc40.jpg" },
  { id: "L", letter: "L", name: "Lion", image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" },
  { id: "M", letter: "M", name: "Monkey", image: "https://shop.wwf.ca/cdn/shop/files/Macaque.jpg?v=1694022235&width=1024" },
  { id: "N", letter: "N", name: "Nest", image: "https://childsplayabc.wordpress.com/wp-content/uploads/2020/06/img_20200604_153836_826.jpg?w=2000&h=1500&crop=1" },
  { id: "O", letter: "O", name: "Owl", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Athene_noctua_%28cropped%29.jpg/960px-Athene_noctua_%28cropped%29.jpg" },
  { id: "P", letter: "P", name: "Penguin", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIOsuBVlG-Dyj9axsL7cYEi-zaNxwmvM-0Qw&s" },
  { id: "Q", letter: "Q", name: "Queen Bee", image: "https://media.wired.com/photos/59548378267cf6013d251acb/master/w_1600%2Cc_limit/GettyImages-71666555.jpg" },
  { id: "R", letter: "R", name: "Rabbit", image: "https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg" },
  { id: "S", letter: "S", name: "Sunflower", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2luZ2xlJTIwc3VuZmxvd2VyfGVufDB8fDB8fHww" },
  { id: "T", letter: "T", name: "Tiger", image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg" },
  { id: "U", letter: "U", name: "Umbrella", image: "https://www.johns.in/cdn/shop/products/umbrella_colour.png?v=1736931301" },
  { id: "V", letter: "V", name: "Violin", image: "https://media.istockphoto.com/id/1442722900/photo/violin.jpg?s=612x612&w=0&k=20&c=gAxk8AsaiotJW3TFCdpfzR5f5bXV1LjBlST-i_ndwZ8=" },
  { id: "W", letter: "W", name: "Whale", image: "https://artincontext.org/wp-content/uploads/2023/03/Drawing-of-a-Whale-17.jpg" },
  { id: "X", letter: "X", name: "Xylophone", image: "https://static-01.daraz.com.bd/p/786949704df497e6afbedebf61cd9e94.jpg" },
  { id: "Y", letter: "Y", name: "Yak", image: "https://cdn.britannica.com/40/188540-050-9AC748DE/Yak-Himalayas-Nepal.jpg" },
  { id: "Z", letter: "Z", name: "Zebra", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_6a0tuoxX7vxQuC-i_YrH-sYp6q7g13-mQ&s" },
];


export default function Alphabets() {
  const speak = (letter, name) => {
    Speech.speak(`${letter} for ${name}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => speak(item.letter, item.name)}>
      <Text style={styles.letter}>{item.letter}</Text>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <FlatList
          data={alphabets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  wrapper: {
    padding: 20,
  },
  card: {
    width: (screenWidth - 60) / 2,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    padding: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    
  },
  letter: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 112,
    marginBottom: 8,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
