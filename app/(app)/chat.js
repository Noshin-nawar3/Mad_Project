import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";
import {
  doc,
  collection,
  setDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
  onSnapshot,
  getDocs,
  getDoc,
  query,
} from "firebase/firestore";
import { useLocalSearchParams } from "expo-router";

export default function Chat() {
  const { user } = useAuth();
  const { friendId, friendName } = useLocalSearchParams();
  const [friendProfilePic, setFriendProfilePic] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chatDocId, setChatDocId] = useState(null);

  useEffect(() => {
    if (!user || !friendId) return;

    const fetchFriendDetails = async () => {
      const docSnap = await getDoc(doc(db, "users", friendId));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFriendProfilePic(data.profileUrl || null);
      }
    };

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

    fetchFriendDetails();
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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#ECE5DD" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}
    >
      {/* Header with profile photo */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: friendProfilePic || "https://via.placeholder.com/40" }}
          style={styles.headerAvatar}
        />
        <Text style={styles.headerText}>{friendName}</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={messages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.from === user.userId ? styles.myMessage : styles.friendMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 100, paddingBottom: 90 }}
      />

      {/* Input */}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
     flexDirection: "row",
  alignItems: "center",
  paddingTop: 20,
  paddingBottom: 10,
  paddingHorizontal: 10,
  backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5, // for Android shadow
  position: "absolute", // make it float
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  paddingTop: Platform.OS === "ios" ? 40 : 40, // Adjust for safe area
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#075E54",
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: "70%",
  },
  myMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  friendMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#DDD",
    marginBottom: Platform.OS === "ios" ? 20 : 40,
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#128C7E",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
