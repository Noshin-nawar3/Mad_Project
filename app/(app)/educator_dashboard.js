import {SafeAreaView, StyleSheet, Text, View } from "react-native";
import HomeHeader from "../../components/HomeHeader";
export default function EducatorDashboard() {
  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.container_home}> 
                <HomeHeader />
      <Text style={styles.title}>Educator Dashboard</Text>
      <Text style={styles.welcome}>Welcome to the Educator Dashboard!</Text>
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