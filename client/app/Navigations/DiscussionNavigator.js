//components to be rendered

//for stack navigations
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../Screens/AccountScreen';

//screens
import DiscussionScreen from '../Screens/DiscussionScreen';
import ForumScreen from '../Screens/ForumScreen';
import QuestionViewScreen from '../Screens/QuestionViewScreen';
import AddQuestionScreen from '../Screens/AddQuestionScreen';
import QuestionSearchScreen from '../Screens/QuestionSearchResultsScreen';



//initialization
const Stack = createNativeStackNavigator();

const DiscussionNavigator = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
        
      <Stack.Screen name="Discussion" component={DiscussionScreen} />
      <Stack.Screen name="Forum" component={ForumScreen} />
      <Stack.Screen name="QuestionResults" component={QuestionSearchScreen}/>
      <Stack.Screen name="QuestionView" component={QuestionViewScreen} />
      <Stack.Screen name="AddQuestion" component={AddQuestionScreen} />


    </Stack.Navigator>
  );
}

export default DiscussionNavigator;