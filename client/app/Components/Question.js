import { View, Text, StyleSheet } from 'react-native';

export default function Question() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.qntitle}>Question title goes here</Text>
        <View style={styles.headerRight}>
          <Text style={[styles.dateText, { color: 'black' }]}>5 hours ago</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}
      />
      <Text style={styles.qndes}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, rerum? Ipsum eaque magni dolores sed adipisci, error, nihil repellat eligendi dignissimos id vero, quis sint laudantium architecto rerum nisi laborum ducimus illum quae voluptate expedita ullam porro libero? Odit quasi tenetur rem fugit atque nihil facere et pariatur vero officia.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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