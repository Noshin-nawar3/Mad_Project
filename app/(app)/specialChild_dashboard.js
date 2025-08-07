import { Ionicons } from '@expo/vector-icons'; // If using Expo
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext"; // Adjust path as needed

export default function SpecialChildDashboard({ navigation }) {
  const router = useRouter();
  const { logout, user } = useAuth();
  
    const handleLogout = async () => {
      await logout();
    };
    console.log("user data ", user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_home}> 
      <HomeHeader />
      <Text style={styles.title}>Special Child Dashboard</Text>
      <Text style={styles.welcome}>Welcome to the Special Child Dashboard!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
              router.push('RAADSRTestScreen');
            }}
        //onPress={() => navigation.navigate("Take RAADS-R Test")}
      >
        <Ionicons name="document-text-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Take RAADS-R Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
              router.push('TestHistoryScreen');
            }}
        //onPress={() => navigation.navigate("Test History")}
      >
        <Ionicons name="time-outline" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>View Test History</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: '#DBEAFE',
  },
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
