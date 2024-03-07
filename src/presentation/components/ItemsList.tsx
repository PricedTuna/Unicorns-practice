import React from 'react';
import {CrudItemResponses} from '../../infrastructure/interfaces/CrudItemResponse';
import {Divider, List} from '@ui-kitten/components';
import ItemsListItem from './ItemsListItem';

interface Props {
  data: CrudItemResponses[];
}

const ItemsList = ({data}: Props) => {
  return (
    <List
      data={data}
      ItemSeparatorComponent={Divider}
      keyExtractor={item => `${item.name} - ${item._id}`}
      renderItem={({item}) => <ItemsListItem item={item} />}
    />
  );
};

export default ItemsList;
