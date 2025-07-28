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
import { Platform, Text, View } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import { blurhash } from '../utils/common';
import { MenuItem } from './CustomMenuItems';

const ios = Platform.OS === 'ios';
export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleProfile = () => {};
  const handleLogout = async () => {
    await logout();
  };

  console.log('User in HomeHeader:', user);

  return (
    <View style={{ paddingTop: ios ? top : top + 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, backgroundColor: '#6366F1', paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
      <View>
        <Text style={{ fontSize: heightPercentageToDP(3), color: '#FFFFFF', fontWeight: '500' }}>
          Home
        </Text>
      </View>
      <View>
        {user ? (
          <Menu>
            <MenuTrigger>
              <Image
                style={{ height: heightPercentageToDP(4.3), aspectRatio: 1, borderRadius: 100 }}
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
  return <View style={{ padding: 1, width: '100%', backgroundColor: '#E5E7EB' }} />;
};