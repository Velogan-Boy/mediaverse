//components to be rendered

//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../Screens/AccountScreen';

//screens
import DiscussionScreen from '../Screens/DiscussionScreen';


//initialization
const Stack = createNativeStackNavigator();

const DiscussionNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="Discussion" component={DiscussionScreen} />
      
      

    </Stack.Navigator>
  );
}

export default DiscussionNavigator;