import React, {useState} from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {getAllItems} from '../../actions/get-all-items';
import {useQuery} from '@tanstack/react-query';
import LoadingIndicator from '../components/LoadingIndicator';
import MyTitle from '../components/MyTitle';
import ItemsList from '../components/ItemsList';
import {globalStyles} from '../../config/theme/CustomTheme/appTheme';
import AddModal from '../components/AddModal';

const HomeScreen = () => {
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);

  // Query trae todos los items
  const {data: items, isLoading} = useQuery({
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
        <Button onPress={() => setIsVisibleAddModal(true)}>
          Agregar Unicornio
        </Button>
      </Layout>
      {isLoading || !items ? <LoadingIndicator /> : <ItemsList data={items} />}
      <AddModal setVisible={setIsVisibleAddModal} visible={isVisibleAddModal} />
    </Layout>
  );
};

export default HomeScreen;
