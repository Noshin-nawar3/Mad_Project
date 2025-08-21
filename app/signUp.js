// import { Octicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker"; // Corrected import
// import { useRouter } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { useRef, useState } from "react";
// import {
//   Alert,
//   Image,
//   Pressable,
//   ScrollView,
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";
// import CustomKeyboardView from "../components/CustomKeyboardView";
// import Loading from "../components/Loading";
// import { useAuth } from "../context/authContext";

// export default function SignUp() {
//   console.log("SignUp component rendering");
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth() || {}; // Fallback to empty object if useAuth is undefined
//   const usernameRef = useRef("");
//   const emailRef = useRef("");
//   const passwordRef = useRef("");
//   const profileRef = useRef("");
//   const roleRef = useRef("");
//   const [selectedRole, setSelectedRole] = useState("Special Child"); // Default role
//   const { register } = useAuth();

//   const handleRegister = async () => {
//     if (
//       !usernameRef.current ||
//       !emailRef.current ||
//       !passwordRef.current ||
//       !profileRef.current
//     ) {
//       Alert.alert("Sign Up", "Please fill in all fields");
//       return;
//     }
//     setLoading(true);

//     let response = await register(
//       emailRef.current,
//       passwordRef.current,
//       usernameRef.current,
//       profileRef.current,
//       selectedRole
//     );
//     setLoading(false);

//     console.log("Registration response:", response);
//     if (!response.success) {
//       Alert.alert("Sign Up", response.msg);
//     }
//   };

//   return (
//     <KeyboardAvoidingView>
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <View style={styles.container}>
//           <StatusBar style="dark" />

//           <View style={styles.imageContainer}>
//             <Image
//               style={styles.image}
//               resizeMode="contain"
//               source={require("../assets/images/register.jpg")}
//               onError={(e) =>
//                 console.log("Image load error:", e.nativeEvent.error)
//               }
//             />
//           </View>
//           <View style={{ gap: 40 }}>
//             <Text style={styles.title}>Sign Up</Text>
//             <View style={{ gap: 16 }}>
//               <View style={styles.inputContainer}>
//                 <Octicons name="person" size={hp(2.7)} color="gray" />
//                 <TextInput
//                   onChangeText={(value) => (usernameRef.current = value)}
//                   style={styles.input}
//                   placeholder="Username"
//                   placeholderTextColor="gray"
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <Octicons name="mail" size={hp(2.7)} color="gray" />
//                 <TextInput
//                   onChangeText={(value) => (emailRef.current = value)}
//                   style={styles.input}
//                   placeholder="Email address"
//                   placeholderTextColor="gray"
//                   keyboardType="email-address"
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <Octicons name="lock" size={hp(2.7)} color="gray" />
//                 <TextInput
//                   onChangeText={(value) => (passwordRef.current = value)}
//                   style={styles.input}
//                   placeholder="Password"
//                   placeholderTextColor="gray"
//                   secureTextEntry
//                 />
//               </View>
//               <View style={styles.inputContainer}>
//                 <Octicons name="link" size={hp(2.7)} color="gray" />
//                 <TextInput
//                   onChangeText={(value) => (profileRef.current = value)}
//                   style={styles.input}
//                   placeholder="Profile URL"
//                   placeholderTextColor="gray"
//                 />
//               </View>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={selectedRole}
//                   onValueChange={(itemValue) => setSelectedRole(itemValue)}
//                   style={{ height: hp(7), width: "100%" }}
//                 >
//                   <Picker.Item label="Special Child" value="Special Child" />
//                   <Picker.Item label="Educator" value="Educator" />
//                   <Picker.Item label="Parent" value="Parent" />
//                 </Picker>
//               </View>
//               <View>
//                 {loading ? (
//                   <View style={styles.loadingContainer}>
//                     {Loading ? (
//                       <Loading size={hp(6.5)} />
//                     ) : (
//                       <Text>Loading fallback</Text>
//                     )}
//                   </View>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={handleRegister}
//                     style={styles.button}
//                   >
//                     <Text style={styles.buttonText}>Sign Up</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//             <View style={styles.linkContainer}>
//               <Text style={styles.signInText}>Already have an account? </Text>
//               <Pressable
//                 onPress={() => {
//                   console.log("Navigating to signIn");
//                   router.push("/signIn");
//                 }}
//                 onPressIn={() => console.log("Pressable pressed")}
//               >
//                 <Text style={styles.signInLink}>Sign In</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: hp(8),
//     paddingHorizontal: wp(5),
//     gap: 48,
//   },
//   imageContainer: {
//     alignItems: "center",
//   },
//   image: {
//     height: hp(25),
//   },
//   title: {
//     fontSize: hp(4),
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#1E293B",
//     letterSpacing: 1,
//   },
//   inputContainer: {
//     height: hp(7),
//     flexDirection: "row",
//     gap: 16,
//     backgroundColor: "#F1F5F9",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: hp(2),
//     fontWeight: "600",
//     color: "#404040",
//   },
//   button: {
//     height: hp(6.5),
//     backgroundColor: "#6366F1",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: hp(2.7),
//     color: "#FFFFFF",
//     fontWeight: "bold",
//     letterSpacing: 1,
//   },
//   signInText: {
//     fontSize: hp(1.8),
//     fontWeight: "600",
//     color: "#64748B",
//   },
//   signInLink: {
//     fontSize: hp(1.8),
//     fontWeight: "bold",
//     color: "#6366F1",
//   },
//   loadingContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   pickerContainer: {
//     height: hp(7),
//     backgroundColor: "#F1F5F9",
//     borderRadius: 10,
//     justifyContent: "center",
//     paddingHorizontal: wp(4),
//   },
//   linkContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
import { Octicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { fetchSignInMethodsForEmail, getAuth } from "firebase/auth";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";

export default function SignUp() {
  console.log("SignUp component rendering");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth() || {};
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileRef = useRef("");
  const [selectedRole, setSelectedRole] = useState("Special Child");
  const [emailError, setEmailError] = useState("");

  // Client-side email validation for Gmail
  const validateEmailFormat = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
    if (!email) {
      return "Email is required";
    }
    if (!gmailRegex.test(email)) {
      return "Please enter a valid Gmail address (e.g., user@gmail.com)";
    }
    return "";
  };

  // Verify email existence with QuickEmailVerification
  const verifyEmailExistence = async (email) => {
    try {
      const apiKey = "76492c0beeacbc626119d68906e2d41ac0f037809b833b9e4a76a1749f8d"; // Replace with your API key
      const response = await fetch(
        `https://api.quickemailverification.com/v1/verify?email=${encodeURIComponent(email)}&apikey=${apiKey}`
      );
      const data = await response.json();
      console.log("QuickEmailVerification response:", data);
      return data.result === "valid";
    } catch (error) {
      console.error("Email verification error:", error);
      return false; // Assume invalid on error to avoid false positives
    }
  };

  // Handle email input change
  const handleEmailChange = (value) => {
    emailRef.current = value;
    setEmailError(validateEmailFormat(value));
  };

  const handleRegister = async () => {
    // Validate inputs
    if (
      !usernameRef.current ||
      !emailRef.current ||
      !passwordRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please fill in all fields");
      return;
    }

    // Client-side Gmail format validation
    const emailValidationError = validateEmailFormat(emailRef.current);
    if (emailValidationError) {
      Alert.alert("Sign Up", emailValidationError);
      return;
    }

    setLoading(true);

    try {
      // Verify email existence
      const isEmailValid = await verifyEmailExistence(emailRef.current);
      if (!isEmailValid) {
        setLoading(false);
        Alert.alert("Sign Up", "This Gmail address does not exist. Please use a valid Gmail account.");
        return;
      }

      // Check if email is already registered in Firebase
      const auth = getAuth();
      const signInMethods = await fetchSignInMethodsForEmail(auth, emailRef.current);
      console.log("Sign-in methods:", signInMethods);

      if (signInMethods.length > 0) {
        setLoading(false);
        Alert.alert("Sign Up", "This email is already registered. Please sign in or use a different Gmail address.");
        return;
      }

      // Proceed with registration
      const response = await register(
        emailRef.current,
        passwordRef.current,
        usernameRef.current,
        profileRef.current,
        selectedRole
      );

      setLoading(false);

      console.log("Registration response:", response);
      if (!response.success) {
        Alert.alert("Sign Up", response.msg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error.code || error.message);
      Alert.alert("Sign Up", "Registration failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <StatusBar style="dark" />

          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require("../assets/images/register.jpg")}
              onError={(e) =>
                console.log("Image load error:", e.nativeEvent.error)
              }
            />
          </View>
          <View style={{ gap: 40 }}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={{ gap: 16 }}>
              <View style={styles.inputContainer}>
                <Octicons name="person" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (usernameRef.current = value)}
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="gray"
                />
              </View>
              <View style={[styles.inputContainer, emailError && styles.inputError]}>
                <Octicons name="mail" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={handleEmailChange}
                  style={styles.input}
                  placeholder="Gmail address (e.g., user@gmail.com)"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              <View style={styles.inputContainer}>
                <Octicons name="lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                />
              </View>
              <View style={styles.inputContainer}>
                <Octicons name="link" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (profileRef.current = value)}
                  style={styles.input}
                  placeholder="Profile URL"
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedRole}
                  onValueChange={(itemValue) => setSelectedRole(itemValue)}
                  style={{ height: hp(7), width: "100%" }}
                >
                  <Picker.Item label="Special Child" value="Special Child" />
                  <Picker.Item label="Educator" value="Educator" />
                  <Picker.Item label="Parent" value="Parent" />
                </Picker>
              </View>
              <View>
                {loading ? (
                  <View style={styles.loadingContainer}>
                    {Loading ? (
                      <Loading size={hp(6.5)} />
                    ) : (
                      <Text>Loading fallback</Text>
                    )}
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.linkContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Pressable
                onPress={() => {
                  console.log("Navigating to signIn");
                  router.push("/signIn");
                }}
                onPressIn={() => console.log("Pressable pressed")}
              >
                <Text style={styles.signInLink}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    gap: 48,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    height: hp(25),
  },
  title: {
    fontSize: hp(4),
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E293B",
    letterSpacing: 1,
  },
  inputContainer: {
    height: hp(7),
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    borderRadius: 10,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: "600",
    color: "#404040",
  },
  errorText: {
    fontSize: hp(1.8),
    color: "red",
    marginLeft: wp(5),
    marginTop: -10,
  },
  pickerContainer: {
    height: hp(7),
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: wp(4),
  },
  button: {
    height: hp(6.5),
    backgroundColor: "#6366F1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: hp(2.7),
    color: "#FFFFFF",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  signInText: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "#64748B",
  },
  signInLink: {
    fontSize: hp(1.8),
    fontWeight: "bold",
    color: "#6366F1",
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});