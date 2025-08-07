import { Ionicons } from '@expo/vector-icons'; // If using Expo
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SpecialChildDashboard({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Special Child Dashboard</Text>
      <Text style={styles.welcome}>Welcome to the Special Child Dashboard!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Take RAADS-R Test")}
      >
        <Ionicons name="document-text-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Take RAADS-R Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Test History")}
      >
        <Ionicons name="time-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>View Test History</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBEAFE',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcome: {
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
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
