import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import {
  collection,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import HomeHeader from "../../components/HomeHeader";

export default function Connection() {
  const { user } = useAuth();
  const router = useRouter();

  const [friends, setFriends] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [search, setSearch] = useState("");

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
        const currentUserData =
          usersData.find((u) => u.userId === user.userId) || {};
        setFriends(
          usersData.filter((u) =>
            (currentUserData.friends || []).includes(u.userId)
          )
        );
      }
    });

    return () => unsubscribe();
  }, [user?.userId]);

  const FriendTile = ({ item }) => (
    <View style={styles.tile}>
      <View style={styles.leftContent}>
        <Image
          source={{
            uri: item.profileUrl || "https://via.placeholder.com/50",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{item.username || "Unknown"}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push(
            `/chat?friendId=${item.userId}&friendName=${item.username}`
          )
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

  // ✅ Filter friends based on search
  const filteredFriends =
    search.trim() === ""
      ? friends
      : friends.filter((u) =>
          (u.username || "Unknown")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              placeholder="Search Friends..."
            />
          </View>

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
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setMenuVisible(false)}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption("People You May Know")}
                >
                  <Text style={styles.menuText}>People You May Know</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption("Friend Requests")}
                >
                  <Text style={styles.menuText}>Friend Requests</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuOption("Back")}
                >
                  <Text style={styles.menuText}>Back</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>

          {/* Friends Section */}
          <Text style={styles.sectionTitle}>Your Friends</Text>
          <FlatList
            data={filteredFriends}
            numColumns={1}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => <FriendTile item={item} />}
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    padding: 16,
    flex: 1,
    backgroundColor: "#FDF6E4",
  },
  scrollContent: {
    paddingBottom: 50,
  },
  searchContainer: {
    paddingTop: 100,
    backgroundColor: "#FDF6E4",
    borderColor:"#FDF6E4",
    borderRadius: 12,
    marginHorizontal: 1,
    marginTop: 12,
  },
  menuButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
    marginTop: 20,
    padding: 15,
    backgroundColor: "rgba(245, 236, 236, 0.8)",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
    marginTop: 20,
  },
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
  name: { fontSize: 16, fontWeight: "500" },
  button: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 14 },
});
