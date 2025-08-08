import { Octicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker'; // Corrected import
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomKeyboardView from "../components/CustomKeyboardView";
import Loading from "../components/Loading";
import { useAuth } from '../context/authContext';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(8),
    paddingHorizontal: wp(5),
    gap: 48,
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
    color: '#1E293B',
    letterSpacing: 1,
  },
  inputContainer: {
    height: hp(7),
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: '600',
    color: '#404040',
  },
  button: {
    height: hp(6.5),
    backgroundColor: '#6366F1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: hp(2.7),
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  signInText: {
    fontSize: hp(1.8),
    fontWeight: '600',
    color: '#64748B',
  },
  signInLink: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    color: '#6366F1',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pickerContainer: {
    height: hp(7),
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SignUp() {
  console.log('SignUp component rendering');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth() || {}; // Fallback to empty object if useAuth is undefined
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileRef = useRef("");
  const roleRef = useRef("");
  const [selectedRole, setSelectedRole] = useState("Special Child"); // Default role
  const {register} = useAuth();

  const handleRegister = async () => {
    if (!usernameRef.current || !emailRef.current || !passwordRef.current || !profileRef.current) {
      Alert.alert('Sign Up', "Please fill in all fields");
      return;
    }
    setLoading(true);
   
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current, profileRef.current, selectedRole);
    setLoading(false);

    console.log('Registration response:', response);
    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  };

  return (
    <CustomKeyboardView>
    <ScrollView>
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../assets/images/register.jpg')}
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
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
          <View style={styles.inputContainer}>
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="gray"
              keyboardType="email-address"
            />
          </View>
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
              style={{ height: hp(7), width: '100%' }}
            >
              <Picker.Item label="Special Child" value="Special Child" />
              <Picker.Item label="Educator" value="Educator" />
              <Picker.Item label="Parent" value="Parent" />
              
            </Picker>
          </View>
          <View>
            {loading ? (
              <View style={styles.loadingContainer}>
                {Loading ? <Loading size={hp(6.5)} /> : <Text>Loading fallback</Text>}
              </View>
            ) : (
              <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.linkContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <Pressable
            onPress={() => {
              console.log('Navigating to signIn');
              router.push('signIn');
            }}
            onPressIn={() => console.log('Pressable pressed')}
          >
            <Text style={styles.signInLink}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
    </ScrollView>
    </CustomKeyboardView>
  );
}