import React from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Linking, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import HomeHeader from "../../components/HomeHeader";

export default function Contact() {
  const contactMethods = [
    {
      icon: <Ionicons name="mail-outline" size={24} color="#2563eb" />,
      title: "Email",
      info: "info@growthassist.com",
      action: () => Linking.openURL("mailto:info@growthassist.com"),
    },
    {
      icon: <Ionicons name="call-outline" size={24} color="#2563eb" />,
      title: "Phone",
      info: "+880 1234 567 890",
      action: () => Linking.openURL("tel:+8801234567890"),
    },
    {
      icon: <MaterialIcons name="location-on" size={24} color="#2563eb" />,
      title: "Address",
      info: "Board Bazar, Gazipur, Dhaka",
      action: () => {Linking.openURL("https://maps.app.goo.gl/8B1ZEvsB6VA6rFdMA")},
    },
    {
      icon: <FontAwesome name="facebook-official" size={24} color="#2563eb" />,
      title: "Facebook",
      info: "@growth_assist",
      action: () => Linking.openURL("https://www.facebook.com/growthassist"),
    },
    {
      icon: <FontAwesome name="instagram" size={24} color="#2563eb" />,
      title: "Instagram",
      info: "@growth_assist",
      action: () => Linking.openURL("https://www.instagram.com/growthassist"),
    },
  ];

  return (
    <View style={styles.container_home}>
      <HomeHeader />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>
          We'd love to hear from you! Reach out to us using any of the methods below.
        </Text>

        <View style={styles.cardsContainer}>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={method.action}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>{method.icon}</View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{method.title}</Text>
                <Text style={styles.cardInfo}>{method.info}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footerText}>
          &copy; 2025 growthassist. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container_home: {
    flex: 1,
    backgroundColor: "#EFF6FF",
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: '#6366F1',
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#1E293B",
    marginBottom: 20,
    textAlign: "center",
  },
  cardsContainer: {
    gap: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#6366F1',
  },
  cardInfo: {
    fontSize: 14,
    color: "#334155",
    marginTop: 3,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "#64748B",
    marginTop: 40,
  },
});
