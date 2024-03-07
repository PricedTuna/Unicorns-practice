import React, {useContext, useState} from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {getAllItems} from '../../actions/get-all-items';
import {useQuery} from '@tanstack/react-query';
import LoadingIndicator from '../components/LoadingIndicator';
import MyTitle from '../components/MyTitle';
import ItemsList from '../components/ItemsList';
import {globalStyles} from '../../config/theme/CustomTheme/appTheme';
import AddModal from '../components/AddModal';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigation/StackNavigator';
import {
  ModalVisibleContext,
  newCrudItemResponses,
} from '../context/ModalVisibleContext';
import NotificationModal from '../components/NotificationModal';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

const HomeScreen = ({}: Props) => {
  const {
    isVisibleAddModal,
    setIsVisibleAddModal,
    itemModal,
    setItemModal,
    isVisibleErrorModal,
    isVisibleSuccessModal,
    setIsVisibleErrorModal,
    setIsVisibleSuccessModal,
  } = useContext(ModalVisibleContext);

  // Query trae todos los items
  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: getAllItems,
    queryKey: ['items', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1000ms * 60 = 1m * 60 = 1h
  });

  return (
    <Layout style={{flex: 1}}>
      <MyTitle
        styles={{fontSize: 48, textAlign: 'center', paddingVertical: 10}}
        text="Unicornios"
      />
      <Layout style={[globalStyles.marginGlobal, {marginVertical: 10}]}>
        <Button
          onPress={() => {
            setItemModal(newCrudItemResponses);
            setIsVisibleAddModal(true);
          }}>
          Agregar Unicornio
        </Button>
      </Layout>
      {isLoading || !items ? <LoadingIndicator /> : <ItemsList data={items} />}
      <AddModal
        refetchQuery={refetch}
        setVisible={setIsVisibleAddModal}
        visible={isVisibleAddModal}
        formValues={itemModal}
      />
      <NotificationModal
        isVisible={isVisibleErrorModal}
        setIsVisible={setIsVisibleErrorModal}
        isSuccess={false}
        text="Operacion no completada, intentelo de nuevo en unos minutos"
        title="Error"
      />
      <NotificationModal
        isVisible={isVisibleSuccessModal}
        setIsVisible={setIsVisibleSuccessModal}
        isSuccess={true}
        title="Exito"
        text="Operacion completada exitosamente"
      />
    </Layout>
  );
};

export default HomeScreen;
