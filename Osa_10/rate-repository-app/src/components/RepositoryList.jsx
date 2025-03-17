import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';
import Item from './RepositoryItem'
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.mainBackground,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.bold
  },
  pickerItem: {

  }
});


const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, variables, setVariables }) => {
  let navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) =>
        <Pressable onPress={() => {navigate(`/items/${item.id}`)}}>
          <Item item={item} />
        </Pressable>
      }
      keyExtractor={item => item.id}
      ListHeaderComponent={() =>  
        <Picker
          selectedValue={variables}
          onValueChange={(itemValue, itemIndex) =>
            setVariables(itemValue)
          }
          style={styles.picker}
          itemStyle={styles.picker}>
          <Picker.Item label="Latest repositories" value='CREATED_AT,DESC' />
          <Picker.Item label="Highest rated repositories" value='RATING_AVERAGE,DESC' />
          <Picker.Item label="Lowest rated repositories" value='RATING_AVERAGE,ASC' />
        </Picker>
      }
    />
  );
};

const RepositoryList = () => {
  const [variables, setVariables] = useState('CREATED_AT,DESC');
  const { repositories, loading } = useRepositories({orderBy: variables.split(',')[0], orderDirection: variables.split(',')[1]});

  if (loading) {
    return <Text>Loading...</Text>
  }
  return <RepositoryListContainer repositories={repositories} variables={variables} setVariables={setVariables} />;
};

export default RepositoryList;