//default apis
import React from "react";
import { View, StyleSheet ,Platform,StatusBar,Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//lottie animation
import LottieView from "lottie-react-native";

//color palette
import colors from "../Config/colors";

const {width,height} = Dimensions.get("window");

function ActivityIndicator({ visible = false,type }) {
  if (!visible) return null;

  return (
    <SafeAreaView style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../animation/loading.json")}
      />
    </SafeAreaView>
  );
}

export default ActivityIndicator;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: colors.secondary,
    height: "110%",
    opacity: 0.8,
    // marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: "100%",
    zIndex: 1,
    paddingBottom:20,
  },
});