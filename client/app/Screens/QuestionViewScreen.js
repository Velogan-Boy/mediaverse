import { View, Text,StyleSheet,StatusBar,Image,Dimensions,ScrollView,Button, Alert } from 'react-native' 
import {SafeAreaView} from 'react-native-safe-area-context';
import React,{useState,useEffect} from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {FormBtn,FormInp, FormInput} from '../Components/forms';
import Question from '../Components/Question';
import AnswerCard from '../Components/AnswerCard';
import axios from 'axios';
import host from '../Config/ip';
import { auth } from '../Config/firebase';
import CustomButton from '../Components/CustomButton';

const {width,height} = Dimensions.get('window');

export default function QuestionViewScreen({navigation,route}) {

  console.log(route.params.questid);

  const [question,setQuestion] = useState({});

  const [answer, setAnswer] = useState(null);

  const handleAnswer = async() => {
      console.log(answer);
      const response = await axios.post(`${host}/discussions/questions/answer/${route.params.questid}`,{
        answer:answer,
    },{
      headers:{
        Authorization:auth.currentUser.uid,
      }
    },);
    console.log(response.data.status);
    if(response.data.status=="success"){
      setAnswer(null);
      Alert.alert("Answer Submitted");
      setTimeout(() => {
        getQuestion();
      }, 1000);
    }
  
  }

  useEffect(() => {
    getQuestion();
  },[])


  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getQuestion();
  //     // The screen is focused
  //     // Call any action and update data

  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const getQuestion = async() => {
    const response = await axios.get(`${host}/discussions/questions/${route.params.questid}`);
    console.log(response.data.data);
    setQuestion(response.data.data);
  }

  console.log("answers",question.answers)

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.white}}>
    <ScrollView
   style={styles.container}
    >
        <View style={styles.header}>

<MaterialCommunityIcons name="post" size={38} color={colors.light} style={{margin:8}}/>
<Text style={styles.headerContent}>Question From {question.userid?.fname}</Text>


    </View>

    

    <View style={{marginTop:10}}>
      

      <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>

      <Image source={{uri:question.userid?.profileImg}} style={styles.img}/>
      
      <View>
      
      <Text style={styles.untext}>{question.userid?.username}</Text>
      
      </View>
      
      </View>

      <View style={{height:175,margin:10}}>

      <Question title={question.question} description={question.description} time={question.createdAt}/>

      </View>
    

      {/* base view */}
    <View style={{marginTop:15,margin:10}}>
          <Text style={{fontSize:20,
          fontWeight:"bold",
          margin:10,
          }}>People Thoughts</Text>

          <ScrollView horizontal={true}>

          { question.answers && question.answers.map((answer) => 
               <AnswerCard name={answer.userid.username} profileImg={answer.userid.profileImg} content={answer.answer}/>
          )}

          {question.answers && question.answers.length == 0 && 
          <Text style={{fontSize:18,margin:10,textAlign:"center"}}>No Answers Yet</Text>
          }
          
         
            </ScrollView>
    </View>
      

    </View>

    <View style={{margin:20}}>

    {answer?
    <View style={{height:60,width:10,margin:10,alignSelf:"flex-end",marginRight:90}}>
      <CustomButton
            size={40}
            type="plus-circle"
            style={{height:80,width:80}}
            onPress={() => handleAnswer()}
          />
    </View>
    :null}

    <FormInput
        // labelValue={""}
        onChangeText={(e) => setAnswer(e)}
        placeholderText="Type Answer"
        iconType=""
        secureTextEntry={true}
   
      />
     
    </View>

    </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
    
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex:1,
      
      },
      header : {
        backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
        display:"flex",flexDirection:"row",justifyContent:"center"
    
      },
      // headerContent : {
      //   color:"white",
      //   fontSize:25,
      //   textAlign:"center",
      // },
      headerContent : {
        color:"white",
        fontSize:19,
        fontWeight:"bold",
        fontStyle:"italic",
        textTransform:"capitalize",
        textAlign:"center",
      },
      untext:{
        fontSize:20,
        fontWeight:"bold",
        textTransform:"capitalize",
        color:colors.dark,
        marginLeft:20,
        marginTop:20

      },
      img:{
        width:70,
        height:70,
        borderRadius:35,
        marginLeft:20,
        marginTop:20,

      },
      question:{
        marginTop:5,
        marginLeft:20,
      },
      questionContent:{
        fontSize:25,
        color:colors.dark,
        marginLeft:20,
        marginTop:20
      },
      answer:{
        marginTop:20,
        marginLeft:20,
      },
      answerContent:{
        fontSize:25,
        color:colors.dark,  
        marginLeft:20,
        marginTop:20
      }
      
      

})