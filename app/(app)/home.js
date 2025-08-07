import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import HomeHeader from "../../components/HomeHeader";
import { useAuth } from "../../context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import SquareButton from "../../components/SquareButton";
import FullWidthButton from "../../components/FullwidthButton";
import { useRouter } from "expo-router";

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
            <SquareButton
              title="All User"
              iconName="account"
              // navigateTo="AllUserScreen"
              // navigation={navigation}
            />
            <SquareButton
              title="Notice"
              iconName="bell-outline"
              // navigateTo="NoticeScreen"
              // navigation={navigation}
            />
            <SquareButton
              title="Event"
              iconName="calendar"
              // navigateTo="EventScreen"
              // navigation={navigation}
            />
            <SquareButton
              title="Students"
              iconName="school"
              // navigateTo="StudentScreen"
              // navigation={navigation}
            />
            <SquareButton
              title="Course"
              iconName="book"
              // navigateTo="CourseScreen"
              // navigation={navigation}
            />
            <SquareButton
              title="Feedback"
              iconName="message-text-outline"
              // navigateTo="FeedbackScreen"
              // navigation={navigation}
            />
          </View>

          <View style={styles.buttonSection}>
            <FullWidthButton
              title="Join the Event"
              description="Click to register for the upcoming session"
              onPress={() => router.push("/event")} // Updated to "event"
            />
            <FullWidthButton
              title="Notices"
              description="Click to see the upcoming session"
              onPress={() => router.push("/notice")}
            />
            <FullWidthButton
              title="Check the Blog"
              description="Click to register for the upcoming session"
              onPress={() => router.push("/event")}
            />
            <FullWidthButton
              title="Enroll the course"
              description="Click to register for the upcoming session"
              onPress={() => router.push("/event")}
            />
            <FullWidthButton
              title="Give Feedback"
              description="Click to register for the upcoming session"
              onPress={() => router.push("/event")}
            />
            <FullWidthButton
              title="Quiz"
              description="Click to register for the upcoming session"
              onPress={() => router.push("/event")}
            />
          </View>
        </View>
      </ScrollView>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    width: "100%",
    gap: 16,
  },
});