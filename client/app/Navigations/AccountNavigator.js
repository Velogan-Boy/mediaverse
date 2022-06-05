//components to be rendered


//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import AccountScreen from '../Screens/AccountScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';


//initialization
const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
     
    </Stack.Navigator>
  );
}

export default AccountNavigator;