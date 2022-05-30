import { View, Text,StyleSheet,StatusBar, Button,SafeAreaView,ScrollView,Image } from 'react-native'
import React,{useState,useEffect} from 'react';
import colors from '../Config/colors';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Corousel from '../Components/Corousel';
import { FormBtn } from '../Components/forms';
import SearchBar from '../Components/SearchBar';
import List from '../Components/List';

export default function DiscussionScreen({navigation}) {

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();

  
  const qns = [
    { qn: 'foo1', des: 'bar1', key: 1 },
    { qn: 'foo2', des: 'bar2', key: 2 },
    { qn: 'foo3', des: 'bar3', key: 3 },
    { qn: 'foo4', des: 'bar4', key: 4 },
    { qn: 'foo5', des: 'bar5', key: 5 },
  ]

  const forums = [
    { dname: 'Foo1' },
    { dname: 'Foo2' },
    { dname: 'Foo3' },
    { dname: 'Foo4' },
    { dname: 'Foo5' },
    { dname: 'Foo6' },
    { dname: 'Foo7' },
    { dname: 'Foo8' },
    { dname: 'Foo9' },
  ]
  useEffect(() => {
    setFakeData(qns);
  }, []);
  
  const exampleItems = [
    {
      title: 'What is react native?',
      text: 'JACK SPARROW',
    },
    {
      title: 'jack',
      text: 'Text 2',
    },
    {
      title: 'iron man',
      text: 'Text 3',
    },
    {
      title: 'Item 4',
      text: 'Text 4',
    },
    {
      title: 'Item 5',
      text: 'Text 5',
    },
  ];
  return (
    <View style={styles.container}>
       <View style={styles.header}>

<MaterialCommunityIcons name="chat" size={38} color={colors.white} style={{margin:8}}/>
<Text style={styles.headerContent}>Discussion Forum</Text>

</View>

<ScrollView>

<SafeAreaView style={styles.root}>
        {!clicked}
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          onFinish={() => console.log(searchPhrase)}

        />
        {/* {clicked && (
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
        )} */}
      </SafeAreaView>
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



   

    <View style={{margin:20,marginTop:20}}>
      <Text style={{fontSize:30}}>Trending Question</Text>
    </View>

    <Corousel data={exampleItems}/>

    <View style={{margin:20,marginTop:20}}>
      <Text style={{fontSize:30}}>Trending Categories</Text>
    </View>

    <View style={{marginTop:-10}}>
    <FormBtn onPress={()=> navigation.navigate('Forum')} title="Attck on Titan"/>
    <FormBtn onPress={()=> navigation.navigate('Forum')} title="Forum"/>
    <FormBtn onPress={()=> navigation.navigate('Forum')} title="Forum"/>
    </View>

    </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create({

    container:{
  
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flex:1,
    
    },
    header : {
      backgroundColor: colors.primary,borderBottomLeftRadius:20,borderBottomRightRadius:20,height:60,justifyContent:"center",alignItems:"center",
      display:"flex",flexDirection:"row",justifyContent:"center"
  
    },
    headerContent : {
      color:"white",
      fontSize:25,
      textAlign:"center",
    },
    root: {
      marginTop: 40,
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