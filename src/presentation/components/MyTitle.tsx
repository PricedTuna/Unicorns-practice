import React from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import {StyleProp, TextStyle} from 'react-native';

interface Props {
  text: string;
  styles?: StyleProp<TextStyle>;
}

const MyTitle = ({text, styles}: Props) => {
  const theme = useTheme();

  return (
    <Layout>
      <Text style={[{color: theme['color-primary-800']}, styles]} category="h1">
        {text}
      </Text>
    </Layout>
  );
};

export default MyTitle;
