import React from 'react';
import {
  Text,
  Button,
  Card,
  Modal,
  useTheme,
  Layout,
  Icon,
} from '@ui-kitten/components';

interface Props {
  title: string;
  text: string;
  isSuccess?: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationModal = ({
  title,
  text,
  isSuccess = true,
  isVisible,
  setIsVisible,
}: Props) => {
  const theme = useTheme();

  const bgColor = isSuccess
    ? theme['color-success-600']
    : theme['color-danger-600'];

  const icon = isSuccess
    ? 'checkmark-circle-2-outline'
    : 'alert-circle-outline';

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
      onBackdropPress={() => setIsVisible(false)}>
      <Card
        disabled={true}
        style={{
          backgroundColor: bgColor,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.3,

          elevation: 13,

          borderWidth: 2,
          borderColor: theme['color-basic-400'],
        }}>
        <Text style={{color: 'white'}} category="h3">
          {title}
        </Text>
        <Text style={{color: 'white'}} category="h6">
          {text}
        </Text>
        <Layout
          style={{
            backgroundColor: bgColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Icon name={icon} fill={'white'} style={{width: 65, height: 65}} />
        </Layout>
      </Card>
    </Modal>
  );
};

export default NotificationModal;
