import React from 'react';
import {CrudItemResponses} from '../../infrastructure/interfaces/CrudItemResponse';
import {ListItem} from '@ui-kitten/components';

interface Props {
  item: CrudItemResponses;
}

const ItemsListItem = ({item}: Props) => {
  return (
    <ListItem
      title={item.name}
      description={`Edad: ${item.age} - Numero: ${item._id} - Color: ${item.colour}`}
    />
  );
};

export default ItemsListItem;
