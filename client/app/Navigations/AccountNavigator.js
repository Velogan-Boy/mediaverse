//components to be rendered


//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import AccountScreen from '../Screens/AccountScreen';
import EditProfileScreen from '../Screens/EditProfileScreen';
import FollowersScreen from '../Screens/FollowersScreen';
import FollowingScreen from '../Screens/FollowingScreen';
import OtherAccountScreen from '../Screens/OtherAccountScreen';
import TrendingPostDetailsScreen from '../Screens/TrendingPostDetails';
import CommentsScreen from '../Screens/CommentsScreen';


//initialization
const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
      <Stack.Screen name="Followers" component={FollowersScreen}/>
      <Stack.Screen name="Following" component={FollowingScreen}/>
      <Stack.Screen name="OtherAccount" component={OtherAccountScreen}/>
      <Stack.Screen name="TrendingPostDetails" component={TrendingPostDetailsScreen}/>
      <Stack.Screen name="Comments" component={CommentsScreen}/>
     
    </Stack.Navigator>
  );
}

export default AccountNavigator;