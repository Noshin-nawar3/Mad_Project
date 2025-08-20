// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   updateDoc,
//   arrayUnion,
//   addDoc,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../../firebaseConfig";
// import { useAuth } from "../../context/authContext";
// import { useRouter } from "expo-router";

// export default function Connection() {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [allUsers, setAllUsers] = useState([]);
//   const [friendRequests, setFriendRequests] = useState([]);
//   const [sentRequests, setSentRequests] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [friends, setFriends] = useState([]);

//   // Fetch all users
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const usersData = snapshot.docs.map((docSnap) => {
//         const data = docSnap.data() || {};
//         return {
//           id: docSnap.id,
//           friends: Array.isArray(data.friends) ? data.friends : [],
//           "Friend Request": Array.isArray(data["Friend Request"]) ? data["Friend Request"] : [],
//           "Sent Request": Array.isArray(data["Sent Request"]) ? data["Sent Request"] : [],
//           ...data,
//         };
//       });

//       setAllUsers(usersData);

//       if (user?.userId) {
//         const currentUserData = usersData.find((u) => u.userId === user.userId) || {};

//         // Suggestions: exclude friends and incoming friend requests only
//         const suggested = usersData.filter(
//           (u) =>
//             u.userId !== user.userId &&
//             !(u.friends || []).includes(user.userId) &&
//             !((currentUserData["Friend Request"] || []).includes(u.userId))
//         );
//         setSuggestions(suggested);

//         // Friends list
//         setFriends(
//           usersData.filter((u) => (currentUserData.friends || []).includes(u.userId))
//         );
//       }
//     });

//     return () => unsubscribe();
//   }, [user?.userId]);

//   // Fetch friend & sent requests for current user
//   useEffect(() => {
//     if (!user?.userId) return;

//     const unsubscribe = onSnapshot(doc(db, "users", user.userId), (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         setFriendRequests(Array.isArray(data["Friend Request"]) ? data["Friend Request"] : []);
//         setSentRequests(Array.isArray(data["Sent Request"]) ? data["Sent Request"] : []);
//       } else {
//         setFriendRequests([]);
//         setSentRequests([]);
//       }
//     });

//     return () => unsubscribe();
//   }, [user?.userId]);

//   // Send Friend Request
//   const sendFriendRequest = async (targetUserId) => {
//     try {
//       const targetRef = doc(db, "users", targetUserId);
//       const currentRef = doc(db, "users", user.userId);

//       // Update local state immediately
//       setSentRequests((prev) => [...prev, targetUserId]);

//       // Firestore updates
//       await addDoc(collection(db, "friendrequests"), {
//         fromUserId: user.userId,
//         toUserId: targetUserId,
//         status: "pending",
//         timestamp: new Date(),
//       });

//       await updateDoc(targetRef, {
//         "Friend Request": arrayUnion(user.userId),
//       });

//       await updateDoc(currentRef, {
//         "Sent Request": arrayUnion(targetUserId),
//       });

//       console.log("Friend request sent!");
//     } catch (error) {
//       console.error("Error sending friend request:", error);
//       // rollback local state if error
//       setSentRequests((prev) => prev.filter((id) => id !== targetUserId));
//     }
//   };

//   // Accept Friend Request
//   const acceptFriendRequest = async (senderId) => {
//     try {
//       const currentUserRef = doc(db, "users", user.userId);
//       const senderRef = doc(db, "users", senderId);

//       const requestsQuery = query(
//         collection(db, "friendrequests"),
//         where("fromUserId", "==", senderId),
//         where("toUserId", "==", user.userId),
//         where("status", "==", "pending")
//       );
//       const requestsSnapshot = await getDocs(requestsQuery);
//       if (!requestsSnapshot.empty) {
//         const requestDoc = requestsSnapshot.docs[0];
//         await updateDoc(doc(db, "friendrequests", requestDoc.id), { status: "accepted" });
//       }

//       await updateDoc(currentUserRef, {
//         friends: arrayUnion(senderId),
//         "Friend Request": (friendRequests || []).filter((id) => id !== senderId),
//       });

//       await updateDoc(senderRef, {
//         friends: arrayUnion(user.userId),
//         "Sent Request": (sentRequests || []).filter((id) => id !== user.userId),
//       });

//       // Update friends list immediately
//       setFriendRequests((prev) => prev.filter((id) => id !== senderId));
//       const newFriend = allUsers.find((u) => u.userId === senderId);
//       if (newFriend) setFriends((prev) => [...prev, newFriend]);

//       console.log("Friend request accepted!");
//     } catch (error) {
//       console.error("Error accepting friend request:", error);
//     }
//   };

//   const UserTile = ({ item, actionLabel, onAction }) => (
//     <View style={styles.tile}>
//       <Image
//         source={{ uri: item.profileUrl || "https://via.placeholder.com/50" }}
//         style={styles.avatar}
//       />
//       <Text style={styles.name}>{item.username || "Unknown"}</Text>
//       <TouchableOpacity
//         style={[styles.button, actionLabel === "Pending" && { backgroundColor: "#aaa" }]}
//         onPress={onAction}
//         disabled={actionLabel === "Pending"}
//       >
//         <Text style={styles.buttonText}>{actionLabel}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const FriendTile = ({ item }) => (
//     <View style={styles.tile}>
//       <Image
//         source={{ uri: item.profileUrl || "https://via.placeholder.com/50" }}
//         style={styles.avatar}
//       />
//       <Text style={styles.name}>{item.username || "Unknown"}</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() =>
//           router.push(`/chat?friendId=${item.userId}&friendName=${item.username}`)
//         }
//       >
//         <Text style={styles.buttonText}>Chat</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Suggestions Section */}
//       <Text style={styles.sectionTitle}>People You May Know</Text>
//       <FlatList
//         data={suggestions}
//         horizontal
//         keyExtractor={(item) => item.userId}
//         renderItem={({ item }) => {
//           const isPending = sentRequests.includes(item.userId);
//           return (
//             <UserTile
//               item={item}
//               actionLabel={isPending ? "Pending" : "Add Friend"}
//               onAction={() => !isPending && sendFriendRequest(item.userId)}
//             />
//           );
//         }}
//       />

//       {/* Friend Requests Section */}
//       <Text style={styles.sectionTitle}>Friend Requests</Text>
//       <FlatList
//         data={(friendRequests || [])
//           .map((id) => allUsers.find((u) => u.userId === id))
//           .filter(Boolean)}
//         horizontal
//         keyExtractor={(item) => item.userId}
//         renderItem={({ item }) => (
//           <UserTile
//             item={item}
//             actionLabel="Accept"
//             onAction={() => acceptFriendRequest(item.userId)}
//           />
//         )}
//       />

//       {/* Friends Section */}
//       <Text style={styles.sectionTitle}>Your Friends</Text>
//       <FlatList
//         data={friends}
//         horizontal
//         keyExtractor={(item) => item.userId}
//         renderItem={({ item }) => <FriendTile item={item} />}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 16 },
//   sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
//   tile: {
//     backgroundColor: "#f1f1f1",
//     borderRadius: 10,
//     padding: 10,
//     alignItems: "center",
//     marginRight: 10,
//     width: 120,
//   },
//   avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 8 },
//   name: { fontSize: 14, fontWeight: "500", marginBottom: 5, textAlign: "center" },
//   button: {
//     backgroundColor: "#007bff",
//     paddingHorizontal: 8,
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   buttonText: { color: "#fff", fontSize: 12 },
// });
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Connection() {
  const { user } = useAuth();
  const router = useRouter();

  const [friends, setFriends] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  // Fetch friends for current user
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() || {};
        return {
          id: docSnap.id,
          friends: Array.isArray(data.friends) ? data.friends : [],
          ...data,
        };
      });

      if (user?.userId) {
        const currentUserData = usersData.find((u) => u.userId === user.userId) || {};
        setFriends(
          usersData.filter((u) => (currentUserData.friends || []).includes(u.userId))
        );
      }
    });

    return () => unsubscribe();
  }, [user?.userId]);

  const FriendTile = ({ item }) => (
    <View style={styles.tile}>
      <View style={styles.leftContent}>
      <Image
        source={{ uri: item.profileUrl || "https://via.placeholder.com/50" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.username || "Unknown"}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push(`/chat?friendId=${item.userId}&friendName=${item.username}`)
        }
      >
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleMenuOption = (option) => {
    setMenuVisible(false);
    if (option === "People You May Know") {
      router.push("/people");
    } else if (option === "Friend Requests") {
      router.push("/request");
    } else if (option === "Back") {
      router.push("/home"); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
        <Ionicons name="menu" size={30} color="#000" />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption("People You May Know")}>
              <Text style={styles.menuText}>People You May Know</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption("Friend Requests")}>
              <Text style={styles.menuText}>Friend Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuOption("Back")}>
              <Text style={styles.menuText}>Back</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Friends Section */}
      <Text style={styles.sectionTitle}>Your Friends</Text>
      <FlatList
        data={friends}
        // horizontal={false}
        numColumns={1}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => <FriendTile item={item} />}
        contentContainerStyle={styles.list}
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, position: "relative", },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    marginTop: 20,
    padding: 15, // Increased padding for better tap area
    backgroundColor: "rgba(245, 236, 236, 0.8)",
    borderWidth: 1, // Added border for debugging
    borderColor: "red", // Visible border to locate button
    borderRadius: 5, // Rounded corners
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  modalContent: {
    marginTop: 60,
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10, marginLeft: 10, marginTop: 80, },
  list: {
     paddingBottom: 20,
   
  },
 
  tile: {
     flexDirection: "row",         
  justifyContent: "space-between", 
  alignItems: "center",        
  backgroundColor: "#f1f1f1",
  borderRadius: 10,
  padding: 12,
  marginVertical: 8,
  width: "100%",
  },
leftContent: {
  flexDirection: "row",
  alignItems: "center",
},

  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "500",  },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 14 },
});