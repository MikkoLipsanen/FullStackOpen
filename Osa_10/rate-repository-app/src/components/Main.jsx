import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Review from './Review';
import MyReviews from './MyReviews';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="items">
              <Route path=":id" element={<SingleRepository />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/review" element={<Review />} />
            <Route path="/myreviews" element={<MyReviews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </View>
  );
};

export default Main;