import { StyleSheet, Text, View } from "react-native";

export default function SpecialChildDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Child Dashboard</Text>
      <Text style={styles.welcome}>Welcome to the Special Child Dashboard!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBEAFE',
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