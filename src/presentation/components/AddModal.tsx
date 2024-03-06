import React, {useState} from 'react';
import {Button, Card, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {globalStyles} from '../../config/theme/CustomTheme/appTheme';
import {CreateUpdateItem} from '../../actions/create-update-item';
import {CrudItemResponses} from '../../infrastructure/interfaces/CrudItemResponse';
import {useQueryClient} from '@tanstack/react-query';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddModal = ({visible, setVisible}: Props) => {
  const [form, setForm] = useState<Partial<CrudItemResponses>>({
    _id: 'new',
    name: '',
    age: 0,
    colour: '',
  });

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const newItem = await CreateUpdateItem(form);

    if (newItem) {
      setVisible(false);
      queryClient.invalidateQueries({queryKey: ['items', 'infinite']});
    }
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={globalStyles.backdrop}
      onBackdropPress={() => setVisible(false)}>
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
          <Button style={{flex: 1}} onPress={() => setVisible(false)}>
            Cancelar
          </Button>
          <Button style={{flex: 1}} onPress={handleSubmit}>
            Agregar
          </Button>
        </Layout>
      </Card>
    </Modal>
  );
};

export default AddModal;
