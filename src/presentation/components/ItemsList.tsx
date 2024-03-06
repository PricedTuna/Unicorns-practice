import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {CrudItemResponses} from '../../infrastructure/interfaces/CrudItemResponse';
import {Divider, Layout, List} from '@ui-kitten/components';
import ItemsListItem from './ItemsListItem';
import {globalStyles} from '../../config/theme/CustomTheme/appTheme';

interface Props {
  data: CrudItemResponses[];
}

const ItemsList = ({data}: Props) => {
  return (
    <List
      data={data}
      ItemSeparatorComponent={Divider}
      keyExtractor={item => `${item.name} - ${item._id}`}
      renderItem={ItemsListItem}
    />
  );
};

export default ItemsList;
