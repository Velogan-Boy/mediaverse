import { View, Text, ScrollView, Image, StyleSheet,TouchableOpacity } from 'react-native';
import colors from '../Config/colors'
import Question from '../Components/Question';
import { useEffect,useState } from 'react';
import axios from 'axios';
import host from '../Config/ip';



export default function ForumScreen({navigation,route}) {
  // console.log(route.params.topicid);
  const [questions,setQuestions] = useState([]);

  useEffect(() => {
        getQuestions();
  },[])

  const getQuestions = async() => {
    const response = await axios.get(`${host}/discussions/questions/topic/${route.params.topic._id}`);
    console.log("here are questions ",response.data.data);
    setQuestions(response.data.data);
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, height: "100%", marginBottom: 10 }}>
        <Image source={{ uri: route.params.topic.cover}} style={styles.image} />
        <Text style={{ flex: 1, alignItems: 'center', color: 'white', marginTop: 10, justifyContent: 'center', fontSize: 23 }}>{route.params.topic.name}</Text>
        <Text style={{ flex: 1, alignItems: 'center', color: 'white', justifyContent: 'center', fontSize: 13 }}>{route.params.topic.count} Questions</Text>
        <Text style={{ flex: 1, alignItems: 'center', color: 'white', marginTop: 0, justifyContent: 'center', fontSize: 14, marginBottom: 15, textAlign: 'center' }}>This is a forum to discuss about {route.params.topic.name}</Text>

      </View>
      
      {
        questions.map((question) =>

       
         
          <Question title={question.question} description={question.description} time={question.createdAt} onPress={() => navigation.navigate("QuestionView",{"questid":question._id})}/>
         

        )
      }
      {/* <Question style={{ backgroundColor: colors.primary }} onPress={() => navigation.navigate("QuestionView",{"data":"hello"})}/> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 40,
    width: 80,
    height: 80,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.primary
  }
})