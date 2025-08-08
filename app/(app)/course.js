import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import FullWidthButton from "../../components/FullwidthButton"; // Adjust path as needed

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