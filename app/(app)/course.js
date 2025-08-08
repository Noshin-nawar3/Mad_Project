import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FullWidthButton from "../../components/FullwidthButton";

const Course = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FullWidthButton
          title="Enroll the course"
          description="Click to register for the upcoming session"
          onPress={() => router.push("/event")}
        />
      </ScrollView>
        <FullWidthButton
                    title="Quiz"
                    description="Click to register for the upcoming session"
                    onPress={() => router.push("/event")}
                  />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Course;