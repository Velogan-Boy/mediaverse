import React, { useState, useCallback, useRef} from 'react';
import { Text, View, SafeAreaView ,Dimensions,Image,TouchableWithoutFeedback} from 'react-native';


import Carousel from 'react-native-snap-carousel';
import colors from '../Config/colors';

const {width,height} = Dimensions.get("window");

const CustomCarousel = ({data,navigation}) => {
    

   const exampleItems=data.data;
   console.log(exampleItems);
  
//    console.log(exampleItems);
    

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const renderItem = useCallback(({ item, index }) => (
      <TouchableWithoutFeedback onPress={() => navigation.navigate("QuestionView",{"data":exampleItems})}>
    <View
    // onPress={() => console.log(item)}
      style={{
        backgroundColor: colors.primary,
        borderRadius: 10,
        height: 250,
        padding: 30,
        width:width/1.2,
        margin:width/15
        // marginLeft: 25,
        // marginRight: 25,
      }}
    >
      <Text style={{ fontSize: 30 ,color:"white",textTransform:"capitalize"}}>{item.title}</Text>
      <Text style={{color:"white",textTransform:"capitalize"}}>{item.text}</Text>

      <View style={{marginLeft:width/2.5}}>
      <Image source={{uri:`https://cdn.mos.cms.futurecdn.net/uqXiBtqw7YnQrRJTGq8DDB-1200-80.jpg`}} style={{height:100,width:100,borderRadius:50}}/>
      </View>
     

    </View>
    </TouchableWithoutFeedback>
  ), []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
         layout={'tinder'} layoutCardOffset={`9`}
        // layout={'stack'} layoutCardOffset={`18`}
        //   layout="default"
          ref={ref}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomCarousel;