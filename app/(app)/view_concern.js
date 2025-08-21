import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, FlatList } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ViewConcerns() {
  const [concerns, setConcerns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcerns = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "parent_concerns"));
        const concernsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setConcerns(concernsList);
      } catch (error) {
        console.error("Error fetching concerns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConcerns();
  }, []);

  const renderConcernItem = ({ item }) => (
    <View style={styles.concernTile}>
      <Text style={styles.concernText}>
        Concern: {item.concern}
      </Text>
      <Text style={styles.timestampText}>
        Posted: {item.timestamp?.toDate().toLocaleString() || "N/A"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_home}>
        <Text style={styles.title}>Parent Concerns</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD60A" />
        ) : concerns.length > 0 ? (
          <FlatList
            data={concerns}
            renderItem={renderConcernItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        ) : (
          <Text style={styles.noConcernsText}>No concerns available</Text>
        )}
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
  container_home: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  concernTile: {
    backgroundColor: '#FFF3B0',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  concernText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timestampText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  noConcernsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});