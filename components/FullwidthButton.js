// import React from 'react';
// import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('window').width;

// export default function FullWidthButton({ title, description, onPress }) {
//   return (
//     <Pressable style={styles.buttonContainer} onPress={onPress}>
//       <View>
//         <Text style={styles.title}>{title}</Text>
//         {description && <Text style={styles.description}>{description}</Text>}
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     width: screenWidth * 0.9,
//     backgroundColor: '#6366F1',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     alignSelf: 'center',
//     marginVertical: 10,
//     height: 150,
//     elevation: 3,
//   },
//   title: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   description: {
//     color: '#E0E0E0',
//     fontSize: 14,
//     fontWeight: '400',
//   },
// });


// import React from 'react';
// import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

// const screenWidth = Dimensions.get('window').width;

// export default function FullWidthButton({
//   title,
//   description,
//   onPress,
//   iconName = 'school',
// }) {
//   return (
//     <Pressable
//       style={({ pressed }) => [
//         styles.buttonContainer,
//         pressed && styles.pressed,
//       ]}
//       onPress={onPress}
//     >
//       <View style={styles.innerContainer}>
//         <View style={styles.iconContainer}>
//           <MaterialIcons name={iconName} size={36} color="#6366F1" />
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>{title}</Text>
//           {description && <Text style={styles.description}>{description}</Text>}
//         </View>
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     width: screenWidth * 0.92,
//     backgroundColor: '#F3F4F6',
//     borderRadius: 16,
//     alignSelf: 'center',
//     marginVertical: 12,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 8,
//     overflow: 'hidden',
//   },
//   pressed: {
//     opacity: 0.85,
//     transform: [{ scale: 0.98 }],
//   },
//   innerContainer: {
//     backgroundColor:'#C7D2FE',
//     flexDirection: 'row',
//     borderRadius: 16,
//     padding: 20,
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: '#EDE9FE',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   title: {
//     color: '#1F2937',
//     fontSize: 20,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   description: {
//     color: '#6B7280',
//     fontSize: 14,
//     fontWeight: '400',
//   },
// });


import React from "react";
import { Pressable, Text, View, StyleSheet, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function FullWidthButton({
  title,
  description,
  onPress,
  iconName = "school",       // default icon
  iconColor = "#6366F1",     // default icon color
  bgColor = "#F3F4F6",       // outer card background
  innerBgColor = "#C7D2FE",  // inner container background
  iconBgColor = "#EDE9FE",   // icon circle background
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        { backgroundColor: bgColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={[styles.innerContainer, { backgroundColor: innerBgColor }]}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <MaterialIcons name={iconName} size={36} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: screenWidth * 0.92,
    borderRadius: 16,
    alignSelf: "center",
    marginVertical: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  innerContainer: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#1F2937",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  description: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "400",
  },
});
