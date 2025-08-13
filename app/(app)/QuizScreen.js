import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";

export default function QuizScreen() {
  

  return (
    <View style={styles.container_home}> 
            <HomeHeader />
            <Text style={styles.title}>Quiz Screen</Text>
          </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#DBEAFE',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginTop: 0,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
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
  buttonSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    flexWrap: "wrap",
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