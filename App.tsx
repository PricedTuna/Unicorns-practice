import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackNavigator from './src/presentation/navigation/StackNavigator';
import {useColorScheme} from 'react-native';

import themeCustom from './src/config/theme/UiKittenCustomTheme/custom-theme.json';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const App = () => {
  // TanStack
  const queryClient = new QueryClient();

  // Ui Kitten and React nav Themes
  const colorScheme = useColorScheme();
  const themeMode = colorScheme === 'dark' ? eva.dark : eva.light;

  const bgColor =
    colorScheme === 'dark'
      ? themeMode['color-basic-800']
      : themeMode['color-basic-100'];

  const CustomTheme: any = themeCustom;

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...themeMode, ...CustomTheme}}>
        <NavigationContainer
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: CustomTheme['color-primary-900'],
              background: bgColor,
              card: CustomTheme['color-basic-100'],
              text: CustomTheme['text-basic-color'],
              border: CustomTheme['color-basic-600'],
              notification: CustomTheme['color-primary-500'],
            },
          }}>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
};

export default App;
