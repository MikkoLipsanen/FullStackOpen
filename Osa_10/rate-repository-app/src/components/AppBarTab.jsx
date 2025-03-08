import { View } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text'

const AppBarTab = ({text, link}) => {
    return (
        <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
            <Link to={link}>
                <Text color="white" fontWeight="bold" fontSize="subheading">{text}</Text>
            </Link>
        </View>
    );
};

export default AppBarTab;