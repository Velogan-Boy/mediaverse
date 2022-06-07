//components to be rendered

//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../Screens/AccountScreen';

//screens
import HomeScreen from '../Screens/HomeScreen';
import PostDetailsScreen from '../Screens/PostDetailsScreen';
import ChatScreen from '../Screens/ChatScreen';
import ChatDetailScreen from '../Screens/ChatDetailScreen';
import PrivateChatScreen from '../Screens/PrivateChatScreen';
import MapScreen from '../Screens/MapScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import CommentsScreen from '../Screens/CommentsScreen';
import AccountSearchResultsScreen from '../Screens/AccountSearchResultsScreen';
import OtherAccountScreen from '../Screens/OtherAccountScreen';
import FollowersScreen from '../Screens/FollowersScreen';
import FollowingScreen from '../Screens/FollowingScreen';
import TrendingPostDetails from '../Screens/TrendingPostDetails';



//initialization
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddPost" component={AddPostScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen}/>
      <Stack.Screen name="Comments" component={CommentsScreen}/>
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <Stack.Screen name="PrivateChat" component={PrivateChatScreen}/>
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="AccountSearchResults" component={AccountSearchResultsScreen} />
      <Stack.Screen name="OtherAccount" component={OtherAccountScreen} />
      <Stack.Screen name="Followers" component={FollowersScreen} />
      <Stack.Screen name="Following" component={FollowingScreen} />
      <Stack.Screen name="TrendingPostDetails" component={TrendingPostDetails} />
      

    </Stack.Navigator>
  );
}

export default HomeNavigator;