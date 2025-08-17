// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import HomeHeader from "../../components/HomeHeader";
// import { useAuth } from "../../context/authContext";

// export default function CourseDetails({ route }){

//   const { course } = route.params;

//   return (
//     <View style={styles.container_home}>
//       <HomeHeader />
//       <Text style={{ fontSize: 24, fontWeight: "bold" }}>{course.title}</Text>
//       <Text style={{ marginTop: 10 }}>This is where course details will go.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container_home: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#DBEAFE',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     marginTop: 0,
//     fontSize: 24,
//     fontWeight: "bold",
//     marginLeft: 30,
//   },

//   button: {
//     backgroundColor: '#2563eb',
//     padding: 15,
//     borderRadius: 8,
//     marginVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
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
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   icon: {
//     marginRight: 4,
//   },
// });


import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import HomeHeader from "../../components/HomeHeader";

export default function CourseDetails() {
  const { title, description, image, length, rating } = useLocalSearchParams();

  return (
    <View style={styles.container_home}>
          <HomeHeader />
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoText}>⏱ {length}</Text>
        <Text style={styles.infoText}>⭐ {rating}</Text>
      </View>

      <Text style={styles.sectionTitle}>Course Content</Text>
      <Text style={styles.sectionText}>
        (Here you can render a list of lessons, modules, or details about the course)
      </Text>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
    container_home: {
    flex: 1,
  },
});
