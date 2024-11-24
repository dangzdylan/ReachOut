import { NavigationContainer } from '@react-navigation/native';
import { AppState } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator/>
    </GestureHandlerRootView>
  );
}