import React from 'react'
import { Image, ScrollView, View, Text, StyleSheet } from 'react-native'
import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {
  const place = props.navigation.getParam('place');

  const placeLocation = {
    latitude: place.latitude,
    longitude: place.longitude
  };

  const showMapHandler = () => {
    props.navigation.navigate('Map', {
      readOnly: true,
      initialLocation: placeLocation
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview style={styles.mapPreview}
          onPress={showMapHandler}
          location={placeLocation} />
      </View>
    </ScrollView>
  )
}

PlaceDetailScreen.navigationOptions = navData => {
  const place = navData.navigation.getParam('place');

  return {
    headerTitle: place.title,
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center'
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: Colors.grey,
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})
export default PlaceDetailScreen