// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Button,
//   FlatList,
// } from "react-native";
// import HomeHeader from "../../components/HomeHeader";
// import { useAuth } from "../../context/authContext";
// import { useBookmarks } from "../BookmarkContext";

// export default function Bookmark({ navigation }) {
//   const { bookmarks, removeBookmark } = useBookmarks();

//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={styles.title}>Bookmark</Text>
//       <FlatList
//         data={bookmarks}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={<Text>No bookmarks yet</Text>}
//         renderItem={({ item }) => (
//           <View style={{ marginVertical: 10, padding: 10, borderWidth: 1 }}>
//             <Text style={{ fontSize: 18 }}>{item.title}</Text>
//             <Button
//               title="Go to Details"
//               onPress={() =>
//                 navigation.navigate("CourseDetails", { course: item })
//               }
//             />
//             <Button title="Remove" onPress={() => removeBookmark(item.id)} />
//           </View>
//         )}
//       />
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

// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { useBookmarks } from "../context/BookmarkContext";
// import { useRouter } from "expo-router";

// export default function BookmarkPage() {
//   const { bookmarks, removeBookmark } = useBookmarks();
//   const router = useRouter();

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       {bookmarks.length === 0 ? (
//         <Text style={{ fontSize: 18 }}>No bookmarks yet</Text>
//       ) : (
//         <FlatList
//           data={bookmarks}
//           keyExtractor={(item) => item.title}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <Image source={{ uri: item.image }} style={styles.image} />
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <TouchableOpacity onPress={() => router.push("/courseDetails")}>
//                   <Text style={styles.link}>Go to Details</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => removeBookmark(item.title)}>
//                   <Text style={styles.remove}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     marginBottom: 15,
//     backgroundColor: "#f9f9f9",
//     padding: 10,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
//   title: { fontSize: 18, fontWeight: "bold" },
//   link: { color: "blue", marginTop: 5 },
//   remove: { color: "red", marginTop: 5 },
// });

import { View, Text, FlatList, StyleSheet } from "react-native";
import { useBookmarks } from "./BookmarkContext";
import { useRouter } from "expo-router";
import CourseCard from "../../components/CourseCard";
import HomeHeader from "../../components/HomeHeader";

export default function Bookmark() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const router = useRouter();

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <Text style={styles.title}>Bookmarks</Text>
      <View style={styles.buttonSection}>
      {bookmarks.length === 0 ? (
        <Text style={styles.emptyText}>No bookmarks yet</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <CourseCard
              image={item.image}
              title={item.title}
              description={item.description || "No description"}
              length={item.length || "N/A"}
              rating={item.rating || "N/A"}
              isFavorite={true} // always bookmarked in this screen
              onFavoriteToggle={() => toggleBookmark(item)}
              onPress={() =>
                router.push({
                  pathname: "/courseDetails",
                  params: {
                    title: item.title,
                    description: item.description,
                    image: item.image,
                    length: item.length,
                    rating: item.rating,
                  },
                })
              }
            />
          )}
        />
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
    container_home: {
    flex: 1,
  },
  buttonSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
  title: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
  },
});
