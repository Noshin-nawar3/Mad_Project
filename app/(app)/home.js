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

export default function Home({ navigation }) {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  console.log("user data ", user);

  return (
    <View className="flex-1 bg-white">
      <HomeHeader />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        
          <View className="flex items-center">
            <Text style={{ fontSize: hp(5) }}>
              Welcome, {user?.username || "Guest"}!
            </Text>

            <View style={styles.wrapper}>
              <SquareButton
                title="All User"
                iconName="account"
                navigateTo="AllUserScreen"
                navigation={navigation}
              />
              <SquareButton
                title="Notice"
                iconName="bell-outline"
                navigateTo="NoticeScreen"
                navigation={navigation}
              />
              <SquareButton
                title="Event"
                iconName="calendar"
                navigateTo="EventScreen"
                navigation={navigation}
              />
              <SquareButton
                title="Students"
                iconName="school"
                navigateTo="StudentScreen"
                navigation={navigation}
              />
              <SquareButton
                title="Course"
                iconName="book"
                navigateTo="CourseScreen"
                navigation={navigation}
              />
              <SquareButton
                title="Feedback"
                iconName="message-text-outline"
                navigateTo="FeedbackScreen"
                navigation={navigation}
              />
            </View>

            <View className="mt-5 space-y-4 px-4 w-full">
              <FullWidthButton
                title="Join the Event"
                description="Click to register for the upcoming session"
                onPress={() => navigation.navigate("EventScreen")}
              />
              <FullWidthButton
                title="Click the Post"
                description="Click to register for the upcoming session"
                onPress={() => navigation.navigate("EventScreen")}
              />
              <FullWidthButton
                title="Check the Blog"
                description="Click to register for the upcoming session"
                onPress={() => navigation.navigate("EventScreen")}
              />
              <FullWidthButton
                title="Enroll the course"
                description="Click to register for the upcoming session"
                onPress={() => navigation.navigate("EventScreen")}
              />
              <FullWidthButton
                title="Give Feedback"
                description="Click to register for the upcoming session"
                onPress={() => navigation.navigate("EventScreen")}
              />
              <FullWidthButton
                title="Quiz"
                description="Click to register for the upcoming session"
                onPress={() => navigation.navigate("EventScreen")}
              />
            </View>
          </View>
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "light"} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
});
