import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { useRouter } from "expo-router";

export default function EducatorDashboard() {
  const router = useRouter();

  const handlePostQuiz = () => {
    router.push("/post_quiz");
  };

  const handlePostQuizToSchool = () => {
    router.push("/post_quiz2");
  };

  const handleViewConcerns = () => {
    router.push("/view_concern");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_home}>
        <HomeHeader />
        <Text style={styles.title}>Educator Dashboard</Text>
        <Text style={styles.welcome}>Welcome to the Educator Dashboard!</Text>
        <TouchableOpacity style={styles.tile} onPress={handlePostQuiz}>
          <Text style={styles.tileText}>Post Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={handlePostQuizToSchool}>
          <Text style={styles.tileText}>Post Quiz to School</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tile} onPress={handleViewConcerns}>
          <Text style={styles.tileText}>See any concerns</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF3C7',
    padding: 20,
  },
  container_home: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcome: {
    marginTop: 16,
    textAlign: 'center',
  },
  tile: {
    backgroundColor: '#FFD60A',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tileText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});