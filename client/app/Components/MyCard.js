import {
    Text,
    View,
    Image,
    Dimensions,
    Platform,
    ProgressViewIOS,
    ProgressBarAndroid,
    ImageBackground,
    TouchableOpacity,
    ScrollView
  } from "react-native";
import React from 'react';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;


const MyCard = ({imageurl,title,subtitle}) => {

      return (
        <View
          style={{
            backgroundColor: "#fff",
            margin: scale(10),
            flexDirection: "row",
            width: screenWidth - scale(20),
            shadowColor: "#777",
            borderRadius: 12,
            elevation: 2,
            shadowOpacity: 0.16,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 0
            },
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <View
            style={{
              backgroundColor: "transparent",
              height: verticalScale(130),
              justifyContent: "center",
              alignItems: "center",
              width: scale(130),
              flex: 2
            }}
          >
            <Image
              source={{uri: imageurl}}
              style={{
                height: verticalScale(120),
                width: scale(120),
                resizeMode: "cover"
              }}
            />
          </View>
  
          <View
            style={{
              flex: 3,
              height: scale(150),
              padding: scale(5),
              marginTop: 0
            }}
          >
            <View
              style={{
                flexDirection: "row",
  
                flex: 1
              }}
            >
              <View
                style={{
                  backgroundColor: "transparent",
                  flex: 3,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{ color: "#000", margin: scale(3), fontSize: scale(17) }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    color: "#888",
                    textAlign: "justify",
                    margin: scale(3),
                    fontSize: scale(12)
                  }}
                >
                  {subtitle}
                    
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    zIndex: scale(4),
                    flex: 1,
                    marginTop: -0,
                    justifyContent: "flex-start",
                    alignItems: "flex-start"
                  }}
                >
                  
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }

    export default MyCard;
  