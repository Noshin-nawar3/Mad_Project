// import { AntDesign, Feather } from '@expo/vector-icons';
// import { Image } from 'expo-image';
// import { Platform, Text, View } from "react-native";
// import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
// import { heightPercentageToDP } from 'react-native-responsive-screen';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useAuth } from '../context/authContext';
// import { blurhash } from '../utils/common';
// import { MenuItem } from './CustomMenuItems';

// const ios = Platform.OS === 'ios';
// export default function HomeHeader() {
//     const { user, logout } = useAuth();
    
//     const { top } = useSafeAreaInsets();

//     const handleProfile = () => {
//     }

//     const handleLogout = async () => {
//         await logout();
//     }

//     return (
//         <View style={{ paddingTop: ios ? top : top + 10 }} className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow">
//             <View>
//                 <Text style={{ fontSize: heightPercentageToDP(3) }} className="font-medium text-white">
//                     Home
//                 </Text>
//             </View>
//             <View>
//                 <Menu>
//                     <MenuTrigger customStyles={{
//                         triggerWrapper: {
//                             // trigger wrapper style
//                         }
//                     }}>
//                         <Image
//                             style={{ height: heightPercentageToDP(4.3), aspectRatio: 1, borderRadius: 100 }}
//                             source={user?.profileUrl}
//                             placeholder={{ blurhash }}
//                             transition={500}
//                         />
//                     </MenuTrigger>
//                     <MenuOptions
//                         customStyles={{
//                             optionsContainer: {
//                                 borderRadius: 10,
//                                 borderCurve: 'continuous',
//                                 marginTop: 40,
//                                 marginLeft: -30,
//                                 backgroundColor: 'white',
//                                 shadowOpacity: 0.2,
//                                 shadowOffset: { width: 0, height: 2 },
//                                 width: 160
//                             }
//                         }}>
//                         <MenuItem
//                             text="Profile"
//                             action={handleProfile}
//                             value={null}
//                             icon={<Feather name='user' size={heightPercentageToDP(2.5)} color="#737373" />}
//                         />
//                         <Divider />
//                         <MenuItem
//                             text="Sign Out"
//                             action={handleLogout}
//                             value={null}
//                             icon={<AntDesign name='logout' size={heightPercentageToDP(2.5)} color="#737373" />}
//                         />
//                     </MenuOptions>
//                 </Menu>
//             </View>
//         </View>
//     )
// }

// const Divider = () => {
//     return (
//         <View className="p-[1px] w-full bg-neutral-200" />
//     )
// }

import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Platform, Pressable, Text, View, StyleSheet } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import { useRouter } from 'expo-router';
import { blurhash } from '../utils/common';
import { MenuItem } from './CustomMenuItems';

const ios = Platform.OS === 'ios';
export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  const handleProfile = () => {
    if (user?.role === 'Admin') {
      router.push('/admin_dashboard');
    } else if (user?.role === 'Special Child') {
      router.push('/specialChild_dashboard');
    } else if (user?.role === 'Parent') {
      router.push('/parent_dashboard');
    } else if (user?.role === 'Educator') {
      router.push('/educator_dashboard');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleHome = () => {
    router.push('/home');
  };

  console.log('User in HomeHeader:', user);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Pressable onPress={handleHome}>
          <Text style={styles.titleText}>Growth Assist</Text>
        </Pressable>
      </View>
      <View style={styles.profileContainer}>
        {user ? (
          <Menu>
            <MenuTrigger>
              <Image
                style={styles.profileImage}
                source={user.profileUrl ? { uri: user.profileUrl } : require('../assets/images/login.png')}
                placeholder={{ blurhash }}
                transition={500}
                onError={(e) => {
                  try {
                    console.log('Image load error:', {
                      nativeEvent: e.nativeEvent,
                      url: user.profileUrl,
                      error: e?.nativeEvent?.error
                    });
                  } catch (err) {
                    console.log('Error in onError:', err);
                  }
                }}
              />
            </MenuTrigger>
            <MenuOptions>
              <MenuItem
                text="Profile"
                action={handleProfile}
                value={null}
                icon={<Feather name='user' size={heightPercentageToDP(2.5)} color="#737373" />}
              />
              <Divider />
              <MenuItem
                text="Sign Out"
                action={handleLogout}
                value={null}
                icon={<AntDesign name='logout' size={heightPercentageToDP(2.5)} color="#737373" />}
              />
            </MenuOptions>
          </Menu>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
}

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#6366F1',
    height: 150,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingTop: Platform.OS === 'ios' ? 10 : 20, // Adjusted for safe area
  },
  titleContainer: {
    paddingTop: Platform.OS === 'ios' ? 10 : 20, // Safe area adjustment
  },
  titleText: {
    paddingTop: 60,
    fontSize: heightPercentageToDP(3),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  profileContainer: {
    paddingTop: 20, 
  },
  profileImage: {
    height: heightPercentageToDP(5),
    aspectRatio: 1,
    borderRadius: 100,
  },
  divider: {
    padding: 1,
    width: '100%',
    backgroundColor: '#E5E7EB',
  },
});