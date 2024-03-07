import React, {useContext} from 'react';
import {CrudItemResponses} from '../../infrastructure/interfaces/CrudItemResponse';
import {ListItem} from '@ui-kitten/components';
import {ModalVisibleContext} from '../context/ModalVisibleContext';

interface Props {
  item: CrudItemResponses;
}

const ItemsListItem = ({item}: Props) => {
  const {setIsVisibleAddModal, setItemModal} = useContext(ModalVisibleContext);

  return (
    <ListItem
      title={item.name}
      description={`Edad: ${item.age} - Numero: ${item._id} - Color: ${item.colour}`}
      onPress={() => {
        setItemModal(item);
        setIsVisibleAddModal(true);
      }}
    />
  );
};

export default ItemsListItem;
