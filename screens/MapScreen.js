import React, { useState, useEffect, useCallback } from 'react'
import { Alert, TouchableOpacity, View, Text, Platform, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const MapScreen = props => {
  const readOnly = props.navigation.getParam('readOnly');
  const initialLocation = props.navigation.getParam('initialLocation');
  const [pickedLocationInMap, setPickedLocationInMap] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.latitude : 37.78,
    longitude: initialLocation ? initialLocation.longitude : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const saveLocationHandler = useCallback(() => {
    if (!pickedLocationInMap) {
      Alert.alert('Please select location',
        'Please select location by touching the map',
        [{ text: 'OK' }]);
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocationInMap });
  }, [pickedLocationInMap]);

  useEffect(() => {
    props.navigation.setParams({ saveLocationHandler })
  }, [saveLocationHandler]);

  const selectLocationHandler = event => {
    if (readOnly) {
      return;
    }
    setPickedLocationInMap(event.nativeEvent.coordinate);
  };
  return <MapView style={styles.map} onPress={selectLocationHandler} region={region}>
    {pickedLocationInMap && <Marker title="A" coordinate={pickedLocationInMap} />}
  </MapView>
}

MapScreen.navigationOptions = navData => {
  const readOnly = navData.navigation.getParam('readOnly');
  const saveLocationHandler = navData.navigation.getParam('saveLocationHandler');

  if (readOnly) {
    return {};
  }
  return {
    headerTitle: (
      <TouchableOpacity style={styles.header} onPress={saveLocationHandler} >
        <Text style={styles.headerText}>Save</Text>
      </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  header: {
    paddingLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})
export default MapScreen