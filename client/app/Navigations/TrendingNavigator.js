//components to be rendered


//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import TrendingScreen from '../Screens/TrendingScreen';
import PostDetailsScreen from '../Screens/PostDetailsScreen';
import TrendingPostdetails from '../Screens/TrendingPostDetails';
import CommentsScreen from '../Screens/CommentsScreen';


//initialization
const Stack = createNativeStackNavigator();

const TrendingNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="Trending" component={TrendingScreen} />
      <Stack.Screen name="PostDetails" component={PostDetailsScreen}/>
      <Stack.Screen name="TrendingPostdetails" component={TrendingPostdetails}/>
      <Stack.Screen name="Comments" component={CommentsScreen}/>

     
    </Stack.Navigator>
  );
}

export default TrendingNavigator;