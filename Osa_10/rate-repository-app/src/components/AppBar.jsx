import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab'
import SignoutTab from './SignoutTab'
import { GET_USER } from '../graphql/queries';

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
    const { loading, error, data } = useQuery(GET_USER);
    const user = data?.me?.username;

    return (
        <View style={styles.flexContainer}>
            <View style={styles.container}>
                <ScrollView horizontal>
                    {
                        <>
                            <AppBarTab text="Repositories" link="/"/>
                            {user && 
                            <>  
                                <AppBarTab text="Create a review" link="/review"/>
                                <SignoutTab text="Sign out"/>
                            </>
                            }
                            {!user && 
                                <> 
                                    <AppBarTab text="Sign in" link="/signin"/>
                                    <AppBarTab text="Sign up" link="/signup"/>
                                </>
                            }
                        </>
                    }
                </ScrollView>
            </View>
        </View>
    );
};

export default AppBar;