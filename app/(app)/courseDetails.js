// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { useLocalSearchParams } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import HomeHeader from "../../components/HomeHeader";
// import { getAuth } from "firebase/auth";
// import { getDatabase, ref, push, set } from "firebase/database";

// export default function CourseDetails() {
//   const title = "Science";
//   const description = "Master closures, async programming, and advanced concepts.";
//   const image =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIfi0Qt3iHaBgQvJ9O6KWMr7VqveMHF_bDGYu4nYASx8j03I091i_BEsPYVKicZHJrnGM&usqp=CAU";
//   const length = "3h 45m";
//   const rating = "4.6";

//   // --- Local states for enroll & bookmark ---
//   const [enrolled, setEnrolled] = useState(false);
//   const [bookmarked, setBookmarked] = useState(false);

//   // Handle Enroll
//   const handleEnroll = () => {
//     setEnrolled(true);
//     // 👉 here push to Firebase under "myCourses"
//     console.log("Course Enrolled:", title);
//   };

//   // Handle Bookmark Toggle
//   const handleBookmark = () => {
//     setBookmarked((prev) => !prev);
//     // 👉 Save/remove bookmark in Firebase under "bookmarks"
//     console.log("Bookmark toggled:", !bookmarked);
//   };

//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <ScrollView style={styles.container}>
//         <Image source={{ uri: image }} style={styles.image} />
//         <View style={styles.headerRow}>
//           <Text style={styles.title}>{title}</Text>

//           {/* Bookmark Toggle */}
//           <TouchableOpacity onPress={handleBookmark}>
//             <Ionicons
//               name={bookmarked ? "bookmark" : "bookmark-outline"}
//               size={28}
//               color={bookmarked ? "#f39c12" : "#333"}
//             />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.description}>{description}</Text>

//         <View style={styles.infoRow}>
//           <Text style={styles.infoText}>⏱ {length}</Text>
//           <Text style={styles.infoText}>⭐ {rating}</Text>
//         </View>

//         <Text style={styles.sectionTitle}>Course Content</Text>
//         <Text style={styles.sectionText}>
//           (Here you can render a list of lessons, modules, or details about the course)
//         </Text>

//         {/* Enroll Button */}
//         <TouchableOpacity
//           style={[styles.enrollButton, enrolled && { backgroundColor: "#10b981" }]}
//           onPress={handleEnroll}
//           disabled={enrolled}
//         >
//           <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
//           <Text style={styles.enrollText}>
//             {enrolled ? "Enrolled" : "Enroll in this Course"}
//           </Text>
//         </TouchableOpacity>
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
//     padding: 16,
//     backgroundColor: "#FDF6E4",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 16,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 16,
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   infoText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 20,
//     marginBottom: 8,
//   },
//   sectionText: {
//     fontSize: 16,
//     color: "#444",
//     lineHeight: 22,
//   },
//   enrollButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor:  "#FF6B6B",
//     padding: 15,
//     borderRadius: 8,
//     marginTop: 20,
//   },
//   enrollText: {
//     color: "#fff",
//     fontWeight: "bold",
//     marginLeft: 8,
//     fontSize: 16,
//   },
// });
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import HomeHeader from "../../components/HomeHeader";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, set } from "firebase/database";

const courseImages = {
  Science: "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg",
  Mathematics: "https://images.pexels.com/photos/5427870/pexels-photo-5427870.jpeg",
  "Social Studies": "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg",
  Language: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg",
  "Art & Music": "https://images.pexels.com/photos/7095438/pexels-photo-7095438.jpeg"
};

export default function CourseDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get course details from params
  const {
    title,
    description,
    image,
    length,
    rating,
    subject
  } = params;

  const [enrolled, setEnrolled] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleEnroll = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Not logged in", "Please sign in to enroll.");
        return;
      }

      setEnrolled(true);

      // Push course to Firebase under "users/{uid}/myCourses"
      const db = getDatabase();
      const myCoursesRef = ref(db, `users/${user.uid}/myCourses`);
      const newCourseRef = push(myCoursesRef);

      await set(newCourseRef, {
        title,
        description,
        image,
        length,
        rating,
        subject,
        enrolledAt: new Date().toISOString(),
      });

      console.log("Course saved to Firebase!");

      // Navigate to videos screen with course data
      router.push({
        pathname: "/courseVideos",
        params: {
          title,
          description,
          image,
          length,
          rating,
          subject
        },
      });
    } catch (error) {
      console.error("Error enrolling:", error);
      Alert.alert("Error", "Could not enroll. Try again.");
      setEnrolled(false);
    }
  };

  const handleBookmark = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Not logged in", "Please sign in to bookmark.");
        return;
      }

      setBookmarked((prev) => !prev);

      const db = getDatabase();
      const bookmarksRef = ref(db, `users/${user.uid}/bookmarks/${subject}`);

      if (!bookmarked) {
        // Add bookmark
        await set(bookmarksRef, {
          title,
          description,
          image,
          length,
          rating,
          bookmarkedAt: new Date().toISOString(),
        });
      } else {
        // Remove bookmark
        await set(bookmarksRef, null);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      Alert.alert("Error", "Could not update bookmark. Try again.");
      setBookmarked((prev) => !prev);
    }
  };

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <ScrollView style={styles.container}>
        <Image 
          source={{ 
            uri: courseImages[subject] || image // Fallback to passed image if subject image not found
          }} 
          style={styles.image} 
        />

        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={handleBookmark}>
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={28}
              color={bookmarked ? "#f39c12" : "#333"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>⏱ {length}</Text>
          <Text style={styles.infoText}>⭐ {rating}</Text>
        </View>

        <Text style={styles.sectionTitle}>Course Content</Text>
        <Text style={styles.sectionText}>
          This course includes comprehensive lessons, interactive exercises, and assessments 
          to help you master {subject}.
        </Text>

        <TouchableOpacity
          style={[
            styles.enrollButton,
            enrolled && { backgroundColor: "#10b981" },
          ]}
          onPress={handleEnroll}
          disabled={enrolled}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
          <Text style={styles.enrollText}>
            {enrolled ? "Enrolled" : "Enroll in this Course"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: { flex: 1 },
  container: { flex: 1, padding: 16, backgroundColor: "#FDF6E4" },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, color: "#555", marginBottom: 16 },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoText: { fontSize: 16, fontWeight: "600", color: "#333" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  sectionText: { fontSize: 16, color: "#444", lineHeight: 22 },
  enrollButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6B6B", 
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  enrollText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
});
