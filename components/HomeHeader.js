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
    
    const {top} = useSafeAreaInsets();

    const handleProfile = () => {

    }
    const handleLogout = async () => {
        await logout();
    }
    return(
        <View style={{paddingTop: ios? top: top+10}} className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow">
            <View>
                <Text style={{fontSize: heightPercentageToDP(3)}} className="font-medium text-white">
                    Home </Text>
            </View>
            <View>
                <Menu>
                    <MenuTrigger customStyles={{
                        triggerWrapper: {
                            // trigger wraper style
                        }
                    }}>
                        <Image
                            style={{ height: heightPercentageToDP(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.profileUrl}
                            placeholder={{ blurhash }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions
                        customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                borderCurve: 'continuous',
                                marginTop: 40,
                                marginLeft: -30,
                                backgroundColor: 'white',
                                shadowOpacity: 0.2,
                                shadowOffset: { width: 0, height: 2 },
                                width: 160
                            }

                        }}>
                        <MenuItem
                            text="Profile"
                            action={handleProfile}
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)} color="#737373" />}
                        />
                        <Divider />
                        <MenuItem
                            text="Sign Out"
                            action={handleLogout}
                            value={null}
                            icon={<AntDesign name='logout' size={hp(2.5)} color="#737373" />}
                        />
                    </MenuOptions>
                </Menu>
            </View>
        </View>
    )
}

const Divider = () =>{
    return(
        <View className="p-[1px] w-full bg-neutral-200"/>
    )
}