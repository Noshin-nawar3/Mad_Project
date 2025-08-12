import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import FullWidthButton from "../../components/FullwidthButton";
import HomeHeader from "../../components/HomeHeader";
import SquareButton from "../../components/SquareButton";
import { useAuth } from "../../context/authContext";
//import BottomNavigator from "../../components/BottomNavigator";

export default function Home() {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  console.log("user data ", user);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome, {user?.username || "Guest"}!
          </Text>

          <View style={styles.wrapper}>
            <View style={styles.row}>
              <SquareButton
                title="Notice"
                iconName="bell-outline"
                onPress={() => router.push("/notice")}
                style={styles.largeButton}
              />
              <SquareButton
                title="Event"
                iconName="calendar"
                onPress={() => router.push("/event")}
                style={styles.largeButton}
              />
            
              <SquareButton
                title="Course"
                iconName="book"
                onPress={() => router.push("/course")}
                style={styles.largeButton}
              />
              <SquareButton
                title="Feedback"
                iconName="message-text-outline"
                onPress={() => router.push("/feedback")}
                style={styles.largeButton}
              />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <FullWidthButton
              title="School"
              description="Click to see the School"
              onPress={() => router.push("/school")}
            />
            <FullWidthButton
              title="Contact Us"
              description="Feel free to reach out!"
              // onPress={() => router.push("/event")}
            />
            <FullWidthButton
              title="About Us"
              description="Click to see more infos"
              // onPress={() => router.push("/notice")}
            />
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.bottomNavWrapper}>
        <BottomNavigator />
      </View> */}
      <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: hp(5),
    marginTop: 20,
  },
  wrapper: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  largeButton: {
    width: wp(40), 
    height: hp(15), 
    marginHorizontal: 10, 
  },
  buttonSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
  },
});