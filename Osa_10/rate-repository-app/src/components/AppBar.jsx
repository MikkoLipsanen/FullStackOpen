import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex'
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row'
  },
});

const AppBar = () => {
    return (
        <View style={styles.flexContainer}>
            <View style={styles.container}>
                <ScrollView horizontal>
                    {
                        <>
                            <AppBarTab text="Repositories" link="/"/>
                            <AppBarTab text="Sign in" link="/sign"/>
                        </>
                    }
                </ScrollView>
            </View>
        </View>
    );
};

export default AppBar;