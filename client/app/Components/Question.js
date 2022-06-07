import { View, Text, StyleSheet,TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';


export default function Question({ onPress,title,description,time }) {
  const dateTimeAgo = moment(time).fromNow();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.qntitle}>{title}</Text>
        <View style={styles.headerRight}>
          <Text style={[styles.dateText, { color: 'black' }]}>{dateTimeAgo}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}
      />
      <Text style={styles.qndes}>{description}</Text>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
  },
  qntitle: {
    fontSize: 23,
    color: 'black',
    paddingHorizontal: 10,
    marginTop: 10,
    fontWeight: '450',
    marginBottom: 10
  },
  qndes: {
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  headerRight: {
    flexDirection: 'row'
  },
  dateText: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontSize: 12,
    marginRight: 5
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})