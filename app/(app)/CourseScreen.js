import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { get, getDatabase, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";

export default function CourseScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const loadEnrolledCourses = async () => {
      try {
        if (!user?.uid) {
          console.log('No user logged in');
          return;
        }
        const db = getDatabase();
        const myCoursesRef = ref(db, `users/${user.uid}/myCourses`);
        const snapshot = await get(myCoursesRef);
        if (snapshot.exists()) {
          const courses = snapshot.val();
          const courseList = Object.keys(courses).map((key) => ({
            id: key,
            ...courses[key],
          }));
          setEnrolledCourses(courseList);
          console.log('Enrolled courses:', courseList);
        } else {
          console.log('No enrolled courses found');
          setEnrolledCourses([]);
        }
      } catch (error) {
        console.error('Error loading enrolled courses:', error);
      }
    };
    loadEnrolledCourses();
  }, [user]);

  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={{ uri: item.image }} style={styles.courseImage} />
      <View style={styles.courseDetails}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>⏱ {item.length}</Text>
          <Text style={styles.infoText}>⭐ {item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <Text style={styles.title}>Your Courses</Text>
      {enrolledCourses.length === 0 ? (
        <Text style={styles.emptyText}>No enrolled courses found.</Text>
      ) : (
        <FlatList
          data={enrolledCourses}
          keyExtractor={(item) => item.id}
          renderItem={renderCourse}
          contentContainerStyle={styles.courseList}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/school')}
      >
        <Ionicons name="arrow-back-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Back to School</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: '#DBEAFE',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 20,
  },
  courseList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
});