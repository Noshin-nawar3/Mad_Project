import { Octicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Loading from "../components/Loading";
import { useAuth } from '../context/authContext';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    gap: 48, // Adjusted from gap-12 to match 12 * 4 (Tailwind spacing)
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    height: hp(25),
  },
  title: {
    fontSize: hp(4),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E293B', // neutral-800
    letterSpacing: 1, // tracking-wider
  },
  inputContainer: {
    height: hp(7),
    flexDirection: 'row',
    gap: 16, // gap-4
    backgroundColor: '#F1F5F9', // neutral-100
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: '600', // font-semibold
    color: '#404040', // neutral-700
  },
  forgotPassword: {
    fontSize: hp(1.8),
    fontWeight: '600', // font-semibold
    color: '#64748B', // neutral-500
    textAlign: 'right',
  },
  button: {
    height: hp(6.5),
    backgroundColor: '#6366F1', // indigo-500
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp(2.7),
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 1, // tracking-wider
  },
  signupText: {
    fontSize: hp(1.8),
    fontWeight: '600', // font-semibold
    color: '#64748B', // neutral-500
  },
  signupLink: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: '#6366F1', // indigo-500
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Please fill in all fields");
      return;
    }
    // login process
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.imageContainer}>
        <Image style={styles.image} resizeMode="contain" source={require('../assets/images/login.png')} />
      </View>
      <View style={{ gap: 40 }}> {/* gap-10 */}
        <Text style={styles.title}>Sign In</Text>
        <View style={{ gap: 16 }}> {/* gap-4 */}
          <View style={styles.inputContainer}>
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={value => emailRef.current = value}
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="gray"
            />
          </View>
          <View style={{ gap: 12 }}> {/* gap-3 */}
            <View style={styles.inputContainer}>
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="gray"
              />
            </View>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </View>
          <View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Pressable onPress={() => router.push('signUp')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}