import { View, TouchableOpacity } from 'react-native';
import useSignOut from '../hooks/useSignOut';
import Text from './Text'

const SignoutTab = ({text}) => {
    const signOut = useSignOut();
    const logOut = async () => {
        try {
          await signOut();
        } catch (e) {
          console.log(e);
        }
    };

    return (
        <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
            <TouchableOpacity onPress={logOut}>
                <Text color="white" fontWeight="bold" fontSize="subheading">{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignoutTab;