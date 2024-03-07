import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {globalStyles} from '../../config/theme/CustomTheme/appTheme';
import {CreateUpdateItem} from '../../actions/create-update-item';
import {CrudItemResponses} from '../../infrastructure/interfaces/CrudItemResponse';
import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from '@tanstack/react-query';
import {
  ModalVisibleContext,
  newCrudItemResponses,
} from '../context/ModalVisibleContext';
import {DeleteItemById} from '../../actions/delete-item-by-id';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  refetchQuery: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<CrudItemResponses[], Error>>;
  formValues?: CrudItemResponses;
}

const AddModal = ({
  visible,
  setVisible,
  refetchQuery,
  formValues = newCrudItemResponses,
}: Props) => {
  const [form, setForm] = useState<Partial<CrudItemResponses>>(formValues);
  const {setIsVisibleErrorModal, setIsVisibleSuccessModal, setItemModal} =
    useContext(ModalVisibleContext);

  useEffect(() => {
    setForm(formValues);
  }, [formValues]);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const newItem = await CreateUpdateItem(form);

    if (newItem) {
      setVisible(false);
      queryClient.invalidateQueries({queryKey: ['items', 'infinite']});
      refetchQuery(); // relanza el query que se acaba de invalidar (por seguridad)
      setIsVisibleSuccessModal(true);
    } else {
      setVisible(false);
      setIsVisibleErrorModal(true);
    }
    setItemModal(newCrudItemResponses);
  };

  const handleDelete = async () => {
    setVisible(false);
    const isDeleted = await DeleteItemById(form._id);
    setVisible(false);

    if (isDeleted) {
      queryClient.invalidateQueries({queryKey: ['items', 'infinite']});
      refetchQuery(); // relanza el query que se acaba de invalidar (por seguridad)
      setIsVisibleSuccessModal(true);
    } else {
      setIsVisibleErrorModal(true);
    }
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={globalStyles.backdrop}
      onBackdropPress={() => setVisible(false)}
      animationType="fade">
      <Card disabled={true}>
        <Text category="h4">Agregar nuevo unicornio</Text>

        <Layout style={{marginVertical: 20, gap: 8}}>
          <Input
            value={form.name}
            label="Nombre"
            placeholder="Nombre del unicornio..."
            onChangeText={newValue => setForm({...form, name: newValue})}
          />

          <Input
            value={form.age?.toString()}
            label="Edad"
            placeholder="Edad del unicornio..."
            keyboardType="number-pad"
            caption={<Text>En años</Text>}
            onChangeText={newValue => setForm({...form, age: Number(newValue)})}
          />

          <Input
            value={form.colour}
            label="Color"
            placeholder="Color del unicornio..."
            caption={<Text>palabra basica (blue, orange, red, etc...)</Text>}
            onChangeText={newValue => setForm({...form, colour: newValue})}
          />
        </Layout>

        <Layout style={{flexDirection: 'row', gap: 10}}>
          {form._id && form._id !== 'new' ? (
            <Button status="danger" style={{flex: 1}} onPress={handleDelete}>
              Borrar
            </Button>
          ) : (
            <Button
              status="warning"
              style={{flex: 1}}
              onPress={() => {
                setVisible(false);
              }}>
              Cancelar
            </Button>
          )}
          <Button status="success" style={{flex: 1}} onPress={handleSubmit}>
            Guardar
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
};

export default AddModal;
