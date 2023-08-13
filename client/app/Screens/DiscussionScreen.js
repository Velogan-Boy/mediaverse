import { View, Text,StyleSheet,StatusBar, Button,ScrollView,Image,RefreshControl ,TouchableWithoutFeedback,Dimensions, TouchableOpacity} from 'react-native'
import React,{useState,useEffect,useRef,useCallback} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MyCard from '../Components/MyCard';

import Carousel from 'react-native-snap-carousel';
import { FormBtn } from '../Components/forms';
import SearchBar from '../Components/SearchBar';
import List from '../Components/List';
import CustomButton from '../Components/CustomButton';
import axios from 'axios';  
import host from '../Config/ip';

const {width,height} = Dimensions.get('window');

export default function DiscussionScreen({navigation}) {

  

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  const [trendingquestion,setTrendingquestion] = useState([]);
  const [trendingTopic,setTrendingTopic] = useState([]);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTrendingQuestions();
      getTrendingTopic();
      // The screen is focused
      // Call any action and update data

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  const renderItem = ( data ) => {
    // console.log("here lies",data);
    return(
    <TouchableOpacity onPress={() => navigation.navigate("QuestionView",{"questid":data.item._id})}>
  <MyCard
        
        imageurl={data.item.topic.cover}
        title={data.item.question}
        subtitle={data.item.description}
        
        />
  </TouchableOpacity>
    )
  };

  
  const qns = [
    { qn: 'foo1', des: 'bar1', key: 1 },
    { qn: 'foo2', des: 'bar2', key: 2 },
    { qn: 'foo3', des: 'bar3', key: 3 },
    { qn: 'foo4', des: 'bar4', key: 4 },
    { qn: 'foo5', des: 'bar5', key: 5 },
  ]

  
 

  const handleSearch = (searchPhrase) => {
    navigation.navigate("QuestionResults",{query:searchPhrase})
  }

  const getTrendingQuestions = async() => {
    const response = await axios.get(`${host}/discussions/questions/trending`);
    // console.log(response.data.data);
    setTrendingquestion(response.data.data);
  }
  
  const getTrendingTopic = async() => {
    const response = await axios.get(`${host}/discussions/topic/trending`);
    console.log("here are topics ",response.data.data);
    setTrendingTopic(response.data.data);
  }

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>

<MaterialCommunityIcons name="chat" size={38} color={colors.white} style={{margin:8}}/>
<Text style={styles.headerContent}>Discussion Forum</Text>

</View>

<ScrollView 
 refreshControl={
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
}
style={{backgroundColor:colors.white}}>

<View style={styles.root}>
        {!clicked}
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          placeholder="Search for Topics"
          onFinish={() => handleSearch(searchPhrase)}
        />

        {/* {clicked && (
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}

          />
        )} */}

      </View>



      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View>
          {
            forums.map((forum, index) => {
              return (
                <View key={index} style={styles.forum}>
                  <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.img} />
                  <Text style={styles.untext}>{forum.dname}</Text>
                </View>
              )
            })
          }
        </View> */}
      </ScrollView>

      
   

    <View style={{margin:20,marginTop:20,display:"flex",flexDirection:"row",marginBottom:-10}}>

      
      <View>
      <Text style={{fontSize:30,fontWeight:"bold",
      color:colors.primary  
    }}>Trending Question</Text>
      </View>

      <View style={{marginHorizontal:30,marginTop:5}}>
      <CustomButton
            size={28}
            type="plus-circle"
            style={{height:70,width:70}}
            onPress={() => navigation.navigate("AddQuestion")}
      />
      </View>
      
    </View>
{/* 
    <Corousel data={exampleItems} navigation={navigation}/> */}

    {/* corousel goes here */}
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
         layout={'tinder'} layoutCardOffset={`9`}
        // layout={'stack'} layoutCardOffset={`18`}
        //   layout="default"
          ref={ref}
          data={trendingquestion}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </View>

    


    <View style={{margin:20,marginTop:20}}>
      <Text style={{fontSize:25,margin:10,fontWeight:"bold",color:colors.primary}}>Trending Categories</Text>
    </View>

    <View style={{margin:20,marginTop:-5}}>
    
    {trendingTopic.map(topic => 
    <FormBtn onPress={()=> navigation.navigate('Forum',{"topic":topic})} title={topic.name}/>
    )}
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
    headerContent : {
      color:"white",
      fontSize:19,
      fontWeight:"bold",
      fontStyle:"italic",
      textTransform:"capitalize",
      textAlign:"center",
    },
    root: {
      marginTop: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      width: "100%",
      marginTop: 20,
      fontSize: 25,
      fontWeight: "bold",
      marginLeft: "10%",
    },
    img: {
      height: 30,
      width: 30,
      backgroundColor: 'grey',
      borderRadius: 50,
      marginRight: 20
    },
    forum: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ededed',
      flexDirection: 'row',
      alignItems: 'center',
    },
})