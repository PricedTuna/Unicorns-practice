import React from 'react';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import {
  ColorSchemeName,
  StyleProp,
  TextStyle,
  useColorScheme,
} from 'react-native';

interface Props {
  text: string;
  styles?: StyleProp<TextStyle>;
}

const MyTitle = ({text, styles}: Props) => {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const titleStyles =
    colorScheme === 'dark' ? 'color-primary-400' : 'color-primary-700';

  return (
    <Layout>
      <Text style={[{color: theme[titleStyles]}, styles]} category="h1">
        {text}
      </Text>
    </Layout>
  );
};

export default MyTitle;
