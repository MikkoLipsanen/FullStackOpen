import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';
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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={props.setSearchQuery}
          value={props.searchQuery}
        />
        <Picker
          selectedValue={props.variables}
          onValueChange={(itemValue, itemIndex) =>
            props.setVariables(itemValue)
          }
          style={styles.picker}
          itemStyle={styles.picker}>
          <Picker.Item label="Latest repositories" value='CREATED_AT,DESC' />
          <Picker.Item label="Highest rated repositories" value='RATING_AVERAGE,DESC' />
          <Picker.Item label="Lowest rated repositories" value='RATING_AVERAGE,ASC' />
        </Picker>
      </>
    );
  };
  render() {
      const props = this.props;
      const repositoryNodes = props.repositories
        ? props.repositories.edges.map(edge => edge.node)
        : [];

      return (
        <FlatList
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) =>
            <Pressable onPress={() => {props.navigate(`/items/${item.id}`)}}>
              <Item item={item} />
            </Pressable>
          }
          keyExtractor={item => item.id}
          ListHeaderComponent={this.renderHeader}    
          onEndReached={props.onEndReach}
          onEndReachedThreshold={0.5}
        />
      );
    };
};

const RepositoryList = () => {
  const [variables, setVariables] = useState('CREATED_AT,DESC');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  const { repositories, loading, fetchMore } = useRepositories({first: 2, searchKeyword: searchKeyword, orderBy: variables.split(',')[0], orderDirection: variables.split(',')[1]});

  if (loading) {
    return <Text>Loading...</Text>
  }

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer 
    repositories={repositories} 
    variables={variables} 
    setVariables={setVariables} 
    searchQuery={searchQuery} 
    setSearchQuery={setSearchQuery} 
    navigate={navigate}
    onEndReach={onEndReach}
  />;
};

export default RepositoryList;