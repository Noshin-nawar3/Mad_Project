// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, FlatList, TextInput, Pressable, Alert, Image } from "react-native"; // Explicitly import Text
// import { db } from "../../firebaseConfig";
// import { collection, addDoc, query, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
// import { useAuth } from "../../context/authContext";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import HomeHeader from "../../components/HomeHeader";

// export default function Chat() {
//   const { user } = useAuth();
//   const { userId: friendUserId } = useLocalSearchParams();
//   const router = useRouter();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [friendDetails, setFriendDetails] = useState({ username: "Loading...", profilePic: null });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Friend User ID:", friendUserId);
//     if (!friendUserId) {
//       Alert.alert("Error", "No chat partner selected.");
//       router.back();
//       return;
//     }
//     if (!user) {
//       Alert.alert("Error", "User not authenticated.");
//       router.back();
//       return;
//     }

//     const chatRoomId = user.userId < friendUserId ? `${user.userId}_${friendUserId}` : `${friendUserId}_${user.userId}`;

//     const fetchMessages = async () => {
//       try {
//         const q = query(
//           collection(db, `chats/${chatRoomId}/messages`),
//           orderBy("timestamp", "asc"),
//           limit(50)
//         );
//         const querySnapshot = await getDocs(q);
//         const messagesList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(messagesList);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//         Alert.alert("Error", "Failed to load messages.");
//       }
//     };

//     const fetchFriendDetails = async () => {
//       try {
//         const friendDoc = await getDoc(doc(db, "users", friendUserId));
//         if (friendDoc.exists()) {
//           setFriendDetails({
//             username: friendDoc.data().username,
//             profilePic: friendDoc.data().profilePic || null,
//           });
//         } else {
//           setFriendDetails({ username: "Unknown User", profilePic: null });
//         }
//       } catch (error) {
//         console.error("Error fetching friend details:", error);
//         Alert.alert("Error", "Failed to load friend details.");
//       }
//     };

//     fetchFriendDetails();
//     fetchMessages();
//     setLoading(false);
//   }, [user, friendUserId, router]);

//   const handleSendMessage = async () => {
//     if (!user || !newMessage.trim()) return;

//     const chatRoomId = user.userId < friendUserId ? `${user.userId}_${friendUserId}` : `${friendUserId}_${user.userId}`;
//     try {
//       await addDoc(collection(db, `chats/${chatRoomId}/messages`), {
//         senderId: user.userId,
//         content: newMessage,
//         timestamp: new Date(),
//       });
//       setNewMessage("");
//       const q = query(
//         collection(db, `chats/${chatRoomId}/messages`),
//         orderBy("timestamp", "asc"),
//         limit(50)
//       );
//       const querySnapshot = await getDocs(q);
//       const messagesList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(messagesList);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       Alert.alert("Error", "Failed to send message.");
//     }
//   };

//   const renderMessage = ({ item }) => (
//     <View style={[styles.message, item.senderId === user?.userId ? styles.sent : styles.received]}>
//       <Text style={styles.messageText}>{item.content}</Text>
//       <Text style={styles.timestamp}>{new Date(item.timestamp?.toDate()).toLocaleTimeString()}</Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading...</Text> {/* Ensure Text is a component */}
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <HomeHeader username={friendDetails.username} profilePic={friendDetails.profilePic} />
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id}
//         inverted
//         contentContainerStyle={styles.messageList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newMessage}
//           onChangeText={setNewMessage}
//           placeholder="Type a message..."
//           multiline
//         />
//         <Pressable style={styles.sendButton} onPress={handleSendMessage}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E5E7EB",
//     padding: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#E5E7EB",
//   },
//   messageList: {
//     paddingBottom: 10,
//   },
//   message: {
//     maxWidth: "70%",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 8,
//   },
//   sent: {
//     backgroundColor: "#60A5FA",
//     alignSelf: "flex-end",
//   },
//   received: {
//     backgroundColor: "#9CA3AF",
//     alignSelf: "flex-start",
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#FFFFFF",
//   },
//   timestamp: {
//     fontSize: 12,
//     color: "#D1D5DB",
//     textAlign: "right",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#F9FAFB",
//     borderTopWidth: 1,
//     borderTopColor: "#D1D5DB",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     padding: 10,
//     fontSize: 16,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//   },
//   sendButton: {
//     backgroundColor: "#3B82F6",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     justifyContent: "center",
//   },
//   sendButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "500",
//   },
// });