import {SafeAreaView, StyleSheet, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
export default function ParentDashboard() {
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.container_home}> 
                <HomeHeader />
      <Text style={styles.title}>Parent Dashboard</Text>
      <Text style={styles.welcome}>Welcome to the Parent Dashboard!</Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1FAE5',
    padding: 20,
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
});