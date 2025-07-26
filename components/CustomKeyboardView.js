import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const CustomKeyboardView = ({children}) => {
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{flex: 1}}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CustomKeyboardView;