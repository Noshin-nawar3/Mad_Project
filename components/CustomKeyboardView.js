import { KeyboardAvoidingView, Platform, ScrollView }


// use as usual in your components
 from 'react-native';
 

// use as usual in your components


const ios = Platform.OS == 'ios';
export default function CustomKeyboardView({children}) {
    return (
        <KeyboardAvoidingView
            behavior={ios ? "padding" : "height"}
            style={{flex: 1}}>
            <ScrollView
                style={{flex: 1}}
                bounces={false}
                showsHorizontalScrollIndicator={false}>
                {
                    children
                }

            </ScrollView>
        </KeyboardAvoidingView>
    )
}