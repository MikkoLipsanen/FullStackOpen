import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native';
import { format } from 'date-fns'
import theme from '../theme';
import Text from './Text';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
  },
  flexItem: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.white,
    gap: 10,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    gap: 10,
    borderRadius: 3,
    alignSelf: 'flex-start'
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
  columnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5
  },
  image: {
    width: 50,
    height: 50,
    margin: 5
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
  separator: {
    height: 10,
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
  }
});

  
const ItemSeparator = () => <View style={styles.separator} />;

const modifyNumber = (number) => {
  return (number >= 1000) ? (number / 1000).toFixed(1).toString() + 'k' : number
}

const RepositoryInfo = ({ repository }) => {
    return (
        <View testID="repositoryItem" style={styles.flexContainer}>
            <View style={styles.flexItem}>
                <View style={styles.row}>
                    <View style={styles.columnLeft}>
                        <Image style={styles.image} source={{ uri: repository.ownerAvatarUrl }} />
                    </View>
                    <View style={styles.columnLeft}>
                        <Text fontWeight="bold" fontSize="subheading">{repository.fullName}</Text>
                        <Text color="textSecondary">{repository.description}</Text>
                        <View style={styles.languageTag}>
                            <Text color="white">{repository.language}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.columnCenter}>
                        <Text fontWeight="bold">{modifyNumber(repository.stargazersCount)}</Text>
                        <Text color="textSecondary">Stars</Text>
                    </View>
                    <View style={styles.columnCenter}>
                        <Text fontWeight="bold">{modifyNumber(repository.forksCount)}</Text>
                        <Text color="textSecondary">Forks</Text>
                    </View>
                    <View style={styles.columnCenter}>
                        <Text fontWeight="bold">{modifyNumber(repository.reviewCount)}</Text>
                        <Text color="textSecondary">Reviews</Text>
                    </View>
                    <View style={styles.columnCenter}>
                        <Text fontWeight="bold">{modifyNumber(repository.ratingAverage)}</Text>
                        <Text color="textSecondary">Rating</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonStyle} onPress={() => {Linking.openURL(repository.url)}}>
                    <Text align='center' color="white" fontWeight="bold" fontSize="subheading">Open in GitHub</Text>
                </TouchableOpacity>
            </View>
            <ItemSeparator/>
        </View>
    )
};
  
const ReviewItem = ({ review }) => {
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
            </View>
        </View>
    )
};

const SingleRepository = () => {
    //const [item, setItem] = useState(null);
    const { id } = useParams();
    const { data, error, loading } = useQuery(GET_REPOSITORY, { variables: { id }, fetchPolicy: 'cache-and-network'});
    
    if (loading)  {
        return <Text>loading...</Text>
    };

    const repository = data?.repository
    const reviews = repository?.reviews?.edges.map(e => e.node)

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        />
    );
};

export default SingleRepository;