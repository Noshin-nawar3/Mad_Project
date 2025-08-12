import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";
import SquareButton from "../../components/SquareButton";
import FullWidthButton from "../../components/FullwidthButton";

export default function School() {
  return (
    
      <View style={styles.container_home}>
        <HomeHeader />
        <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
        <Text style={styles.title}>School</Text>
        {/* <Text style={styles.welcome}>Welcome to the School Screen!</Text> */}

        <View style={styles.wrapper}>
          <View style={styles.row}>
            <SquareButton
              title="Resource"
              iconName="book-open-page-variant"
              onPress={() => router.push("/resources")}
              style={styles.largeButton}
            />

            <SquareButton
              title="Course"
              iconName="book"
              onPress={() => router.push("/course")}
              style={styles.largeButton}
            />
            <SquareButton
              title="Quiz"
              iconName="clipboard-text-outline"
              onPress={() => router.push("/event")}
              style={styles.largeButton}
            />
          </View>
        </View>

        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("course");
          }}
        >
          <Ionicons
            name="document-text-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Take course</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("resource");
          }}
        >
          <Ionicons
            name="time-outline"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>View resource</Text>
        </TouchableOpacity> */}

        <Text style={styles.title}>Courses</Text>
        <View style={styles.buttonSection}>
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/chat")}
          />
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/ChatScreen")}
          />
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/ChatScreen")}
          />
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/ChatScreen")}
          />
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/ChatScreen")}
          />
          <FullWidthButton
            title="Course"
            description="Click to see the Course"
            onPress={() => router.push("/ChatScreen")}
          />
        </View>
      </ScrollView>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#DBEAFE",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 30,
  },
  welcome: {
    marginTop: 16,
    textAlign: "center",
    marginBottom: 40,
  },
   buttonSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 4,
  },
});
