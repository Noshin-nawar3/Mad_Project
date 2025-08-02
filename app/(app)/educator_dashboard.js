import { StyleSheet, Text, View } from "react-native";

export default function EducatorDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Educator Dashboard</Text>
      <Text style={styles.welcome}>Welcome to the Educator Dashboard!</Text>
    </View>
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