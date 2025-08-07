import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function AdminDashboard({ navigation }) {
  const router = useRouter();

  const handleTilePress = (screen) => {
    router.push(`/${screen}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.welcome}>Welcome to the Admin Dashboard!</Text>
      <View style={styles.tileContainer}>
        <Pressable style={styles.tile} onPress={() => handleTilePress("post_event")}>
          <Text style={styles.tileText}>Post Event</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={() => handleTilePress("post_notice")}>
          <Text style={styles.tileText}>Post Notice</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={() => handleTilePress("AllUserScreen")}>
          <Text style={styles.tileText}>See All Users</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={() => handleTilePress("FeedbackScreen")}>
          <Text style={styles.tileText}>Feedbacks</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={() => handleTilePress("RegisteredEventsScreen")}>
          <Text style={styles.tileText}>Registered Events</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
  tileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  tile: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tileText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333333',
  },
});