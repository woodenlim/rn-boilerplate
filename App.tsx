// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';

import { store, persistor } from '@/redux/store/store';
import AppNavigator from '@/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/i18n';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={styles.loader}>
            <ActivityIndicator size="large" />
          </View>
        }
        persistor={persistor}
      >
        <View style={styles.container}>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppNavigator />
          </SafeAreaProvider>
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
