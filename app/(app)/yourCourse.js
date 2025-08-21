import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../firebaseConfig";
import HomeHeader from "../../components/HomeHeader";

export default function YourCourse() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const router = useRouter();

  // Fetch enrolled courses on component mount
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          Alert.alert("Not logged in", "Please sign in to view your courses.");
          return;
        }

        const courseEnrolledCollection = collection(db, "courseEnrolled");
        const q = query(courseEnrolledCollection, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const courses = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          courses.push({
            id: doc.id,
            subject: data.subject,
            level: data.level,
            title: data.title,
            description: data.description,
            image: data.image,
            length: data.length,
            rating: data.rating,
            enrolledAt: data.enrolledAt?.toDate().toLocaleDateString() || "N/A",
          });
        });

        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        Alert.alert("Error", "Failed to load your courses.");
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleCoursePress = (subject, level) => {
    router.push({
      pathname: "/subjectDetails",
      params: { subject, level: `Level ${level}` },
    });
  };

  const renderCourseCard = (course) => (
    <TouchableOpacity
      key={course.id}
      style={styles.courseCard}
      onPress={() => handleCoursePress(course.subject, course.level)}
    >
      <Image source={{ uri: course.image }} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDescription} numberOfLines={2}>
          {course.description}
        </Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>⏱ {course.length}</Text>
          <Text style={styles.infoText}>⭐ {course.rating}</Text>
        </View>
        <Text style={styles.enrolledDate}>
          Enrolled on: {course.enrolledAt}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView>
        <Text style={styles.title}>Your Enrolled Courses</Text>
        {enrolledCourses.length === 0 ? (
          <Text style={styles.noCoursesText}>
            You haven't enrolled in any courses yet.
          </Text>
        ) : (
          enrolledCourses.map((course) => renderCourseCard(course))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6E4", // warm pastel background
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    color: "#FF6B6B", // bright playful pink-red
  },
  noCoursesText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: 50,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: "#FF6B6B",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  enrolledDate: {
    fontSize: 12,
    color: "#777",
  },
});