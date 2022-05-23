import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button} from 'react-native';

import AuthNavigator from './app/Navigations/AuthNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <>
    {/* <AppBar/> */}
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
