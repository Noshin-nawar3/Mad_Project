import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";
import { doc, collection, setDoc, updateDoc, arrayUnion, Timestamp, onSnapshot, getDocs, query } from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";

export default function Chat() {
  const { user } = useAuth();
  const { friendId, friendName } = useLocalSearchParams(); // ✅ useSearchParams instead of route.params
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chatDocId, setChatDocId] = useState(null);

  useEffect(() => {
    if (!user || !friendId) return;

    const setupChat = async () => {
      const chatsRef = collection(db, "chats");
      const q = query(chatsRef);
      const snapshot = await getDocs(q);
      let existingChat = null;

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.users.includes(user.userId) && data.users.includes(friendId)) {
          existingChat = { id: docSnap.id, ...data };
        }
      });

      if (existingChat) {
        setChatDocId(existingChat.id);
        onSnapshot(doc(db, "chats", existingChat.id), (docSnap) => {
          if (docSnap.exists()) setMessages(docSnap.data().messages || []);
        });
      } else {
        const newDocRef = doc(chatsRef);
        await setDoc(newDocRef, { users: [user.userId, friendId], messages: [] });
        setChatDocId(newDocRef.id);
        setMessages([]);
      }
    };

    setupChat();
  }, [friendId, user]);

  const sendMessage = async () => {
    if (!text.trim() || !chatDocId) return;

    const message = { from: user.userId, text: text.trim(), timestamp: Timestamp.now() };

    await updateDoc(doc(db, "chats", chatDocId), {
      messages: arrayUnion(message),
    });

    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{friendName}</Text>
      <FlatList
        data={messages.sort((a,b) => a.timestamp.seconds - b.timestamp.seconds)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.from === user.userId ? styles.myMessage : styles.friendMessage]}>
            <Text style={{ color: "#fff" }}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  messageBubble: { padding: 10, borderRadius: 8, marginVertical: 3, maxWidth: "70%" },
  myMessage: { backgroundColor: "#007bff", alignSelf: "flex-end" },
  friendMessage: { backgroundColor: "#555", alignSelf: "flex-start" },
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 20, paddingHorizontal: 15 },
  sendButton: { marginLeft: 10, backgroundColor: "#007bff", padding: 10, borderRadius: 20 },
});
