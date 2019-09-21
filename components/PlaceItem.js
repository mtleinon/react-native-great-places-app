import React from 'react'
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

const PlaceItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.placeItem}>
      <Image style={styles.image} source={{ uri: props.place.imageUri ? props.place.imageUri : null }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.place.title}</Text>
        <Text style={styles.address}>{props.place.address}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'blue',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: Colors.lightGrey,
    fontSize: 16
  }
})
export default PlaceItem;