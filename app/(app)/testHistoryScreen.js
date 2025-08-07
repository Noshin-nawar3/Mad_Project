import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
export default function testHistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('@raadsr_history');
      const data = stored ? JSON.parse(stored) : [];
      setHistory(data.reverse()); // show recent first
    } catch (e) {
      console.log('Error loading history');
    }
  };

  const clearHistory = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to delete all test history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes', style: 'destructive', onPress: async () => {
            await AsyncStorage.removeItem('@raadsr_history');
            setHistory([]);
          }
        }
      ]
    );
  };

  const shareHistory = async () => {
    if (history.length === 0) {
      Alert.alert('No history to share.');
      return;
    }

    
    let message = 'RAADS-R Test History:\n\n';
    history.forEach((item, i) => {
      message += `#${history.length - i} • ${new Date(item.date).toLocaleString()}\n`;
      message += `Total Score: ${item.score}\n`;
      message += 'Section Scores:\n';
      for (const [sec, val] of Object.entries(item.sectionScores)) {
        message += ` - ${sec}: ${val}\n`;
      }
      message += '\n';
    });

    try {
      await Share.share({
        title: 'RAADS-R Test History',
        message,
      });
    } catch (error) {
      Alert.alert('Error sharing', error.message);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.date}>#{history.length - index} | {new Date(item.date).toLocaleString()}</Text>
      <Text style={styles.score}>Total Score: {item.score}</Text>
      <Text style={styles.sectionTitle}>Section Scores:</Text>
      {Object.entries(item.sectionScores).map(([sec, val]) => (
        <Text key={sec} style={styles.sectionItem}>
          {sec}: {val}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test History</Text>

      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.button} onPress={shareHistory}>
        <Text style={styles.buttonText}>📤 Share All Results</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#dc2626' }]}
        onPress={clearHistory}
      >
        <Text style={styles.buttonText}>🗑️ Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  sectionItem: {
    fontSize: 14,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});
