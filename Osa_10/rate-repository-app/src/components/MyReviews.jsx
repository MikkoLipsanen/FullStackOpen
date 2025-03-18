import { View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigate } from "react-router";
import { format } from 'date-fns'
import Text from './Text';
import { GET_USER } from '../graphql/queries';
import useDelete from '../hooks/useDelete';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    flexContainer: {
        display: 'flex',
    },
    flexItem: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.white,
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        alignContent: 'space-around',
        gap: 5,
        margin: 5
    },
    columnLeft: {
        flexDirection: 'column',
        justifyContent: 'left',
        gap: 5
    },
    rating: {
        flexDirection: 'column',
        justifyContent: 'left',
        gap: 5,
        width: 50,
        height: 50,
        margin: 5,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center'
    },
    buttonStyle: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 3,
        justifyContent: 'center'
    },
})

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, navigate, onDelete }) => {
    return (
        <View testID="repositoryItem" style={styles.flexContainer}>
            <View style={styles.flexItem}>
                <View style={styles.row}>
                    <View style={styles.rating}>
                        <Text fontWeight="bold" fontSize="subheading" align="center" color="blue">{review.rating}</Text>
                    </View>
                    <View style={styles.columnLeft}>
                        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
                        <Text  color="textSecondary">{format(review.createdAt, 'dd.MM.yyyy')}</Text>
                        <Text>{review.text}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => {navigate(`/items/${review.repositoryId}`)}}>
                        <Text align='center' color="white" fontWeight="bold" fontSize="subheading">View repository</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.buttonStyle, backgroundColor: theme.colors.error}} onPress={() => onDelete(review.id)}>
                        <Text align='center' color="white" fontWeight="bold" fontSize="subheading">Delete review</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const MyReviews = () => {
    const { loading, error, data, refetch } = useQuery(GET_USER, { variables: { includeReviews: true }, fetchPolicy: 'cache-and-network'});
    const navigate = useNavigate();
    const [deleteReview] = useDelete();

    if (loading)  {
        return <Text>loading...</Text>
    };

    const reviews = data?.me?.reviews?.edges.map(e => e.node)

    const onDelete = async (id) => {
        console.log(id)
        try {
          const deleted = await deleteReview({ id });
          if (deleted) {
            refetch()
          }
        } catch (e) {
          console.log(e);
        }
    };

    const deleteAlert = (id) => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Delete', onPress: () => onDelete(id)},
        ]);
    };

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} navigate={navigate} onDelete={deleteAlert} />}
            keyExtractor={({ id }) => id}
        />
    );
};

export default MyReviews;