import { Feather, Octicons } from '@expo/vector-icons';
import { StatusBar, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import CustomKeyboardView from '../components/CustomKeyboardView';
import Loading from '../components/Loading';
import { useAuth } from '../context/authContext';
// use as usual in your components


console.log('CustomKeyboardView:', CustomKeyboardView);
console.log('Feather:', Feather);
console.log('Octicons:', Octicons);
console.log('useAuth:', useAuth);

export default function SignUp() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");

    const handleRegister = async() => {
        if(!emailRef.current || !passwordRef.current || !usernameRef.current || !profileRef.current) {
            Alert.alert('Sign Up', "Please fill in all fields");
            return;
        }
        //registration process

    }

  return (
    <CustomKeyboardView>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} resizeMode="contain" source={require('../assets/images/register.jpg')} />
                </View>
                <View style={{ gap: 40 }}>
                    <Text style={styles.title}>Sign Up</Text>
                    <View style={{ gap: 16 }}>
                        <View style={styles.inputContainer}>
                            <Feather name="user" size={hp(2.7)} color="gray" />
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
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Octicons name="lock" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={(value) => (passwordRef.current = value)}
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                                placeholderTextColor="gray"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Feather name="image" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChangeText={(value) => (profileRef.current = value)}
                                style={styles.input}
                                placeholder="Profile url"
                                placeholderTextColor="gray"
                            />
                        </View>
                        {loading ? (
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Loading size={hp(6.5)} />
                            </View>
                        ) : (
                            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        )}
                        
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.signInText}>Already have an account? </Text>
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={styles.signInLink}>Sign In</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp(7),
        paddingHorizontal: wp(5),
        flex: 1,
        gap: 48,
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        height: hp(20),
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
});