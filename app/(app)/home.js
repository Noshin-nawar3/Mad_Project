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
              title="Notice"
              iconName="bell-outline"
              onPress={() => router.push("/notice")}
            />
            <SquareButton
              title="Event"
              iconName="calendar"
               onPress={() => router.push("/event")}
             
            />
          
            <SquareButton
              title="Course"
              iconName="book"
             onPress={() => router.push("/course")}
            />
            <SquareButton
              title="Feedback"
              iconName="message-text-outline"
             onPress={() => router.push("/feedback")}
            />
          </View>

          <View style={styles.buttonSection}>
            <FullWidthButton
              title="Join the Event"
              description="Click to register for the upcoming events"
              onPress={() => router.push("/event")} // Updated to "event"
            />
            <FullWidthButton
              title="Notices"
              description="Click to see the upcoming session"
              onPress={() => router.push("/notice")}
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