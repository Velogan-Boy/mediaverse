//default apis
import React from "react";
import { View, StyleSheet ,Platform,StatusBar,Dimensions} from "react-native";

//lottie animation
import LottieView from "lottie-react-native";

//color palette
import colors from "../Config/colors";

const {width,height} = Dimensions.get("window");

function ActivityIndicator({ visible = false,type }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        autoPlay
        loop
        source={require("../animation/loading.json")}
      />
    </View>
  );
}

export default ActivityIndicator;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: colors.primary,
    height: "100%",
    opacity: 0.8,
    // marginTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    width: "100%",
    zIndex: 1,
  },
});