import {View, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'ItemScreen'> {}

const ItemScreen = ({navigation, route}: Props) => {
  const item = route.params.item;

  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default ItemScreen;
