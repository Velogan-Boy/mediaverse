import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import colors from '../Config/colors'
import Question from '../Components/Question';


export default function ForumScreen() {
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.secondary, height: "100%", marginBottom: 10 }}>
        <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.image} />
        <Text style={{ flex: 1, alignItems: 'center', color: 'white', marginTop: 10, justifyContent: 'center', fontSize: 23 }}>attackontitan</Text>
        <Text style={{ flex: 1, alignItems: 'center', color: 'gray', justifyContent: 'center', fontSize: 13 }}>400,000 followers - 500 answers</Text>
        <Text style={{ flex: 1, alignItems: 'center', color: 'white', marginTop: 0, justifyContent: 'center', fontSize: 14, marginBottom: 15, textAlign: 'center' }}>This is a forum to discuss about attack on titan anime and make fan theories</Text>

      </View>
      <Question style={{ backgroundColor: colors.primary }} />
      <Question />
      <Question />
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