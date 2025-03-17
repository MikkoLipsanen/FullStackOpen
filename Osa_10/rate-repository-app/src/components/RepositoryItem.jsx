import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme';
import Text from './Text'

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
});

const modifyNumber = (number) => {
  return (number >= 1000) ? (number / 1000).toFixed(1).toString() + 'k' : number
}

const Item = ({item}) => (
    <View testID="repositoryItem" style={styles.flexContainer}>
      <View style={styles.flexItem}>
        <View style={styles.row}>
          <View style={styles.columnLeft}>
            <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
          </View>
          <View style={styles.columnLeft}>
            <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
            <Text color="textSecondary">{item.description}</Text>
            <View style={styles.languageTag}>
              <Text color="white">{item.language}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.columnCenter}>
            <Text fontWeight="bold">{modifyNumber(item.stargazersCount)}</Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View style={styles.columnCenter}>
            <Text fontWeight="bold">{modifyNumber(item.forksCount)}</Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View style={styles.columnCenter}>
            <Text fontWeight="bold">{modifyNumber(item.reviewCount)}</Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View style={styles.columnCenter}>
            <Text fontWeight="bold">{modifyNumber(item.ratingAverage)}</Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
      </View>
    </View>
);

export default Item;