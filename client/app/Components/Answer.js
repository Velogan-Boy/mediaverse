import React from 'react'
import { Text, View, StyleSheet} from 'react-native'
import colors from '../Config/colors'


const Answer = ({user, answer, time, qnid}) => {

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={[styles.header, { borderBottomColor: 'gray' }]}>
        <Text style={[styles.authorName, { color: 'blue' }]}>{user}</Text>
        <View style={styles.headerRight}>
          <Text style={[styles.dateText, { color: 'black' }]}>{time}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={[styles.regularFont, { color: 'black' }]}>
          {answer}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginBottom: 7,
    elevation: 1,
    paddingHorizontal: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1
  },
  headerRight: {
    flexDirection: 'row'
  },
  body: {
    marginTop: 5,
    padding: 5
  },
  authorName: {
    marginRight: 10,
    fontFamily: 'Roboto'
  },
  trash: {
    marginLeft: 10
  },
  regularFont: {
    fontFamily: 'Roboto'
  },
  dateText: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontSize: 12
  }
})

export default Answer