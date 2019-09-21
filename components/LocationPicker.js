import React, { useState, useEffect } from 'react'
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

const LocationPicker = props => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const pickedLocationInMap = props.navigation.getParam('pickedLocationInMap');
  const { locationPickerHandler } = props;
  useEffect(() => {
    if (pickedLocationInMap) {
      setPickedLocation(pickedLocationInMap);
      locationPickerHandler(pickedLocationInMap);
    }
  }, [pickedLocationInMap, locationPickerHandler]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA, Permissions.LOCATION);
    if (result.status !== 'granted') {
      alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const currentPosition = await Location.getCurrentPositionAsync();
      setPickedLocation(currentPosition.coords);
      props.locationPickerHandler(currentPosition.coords);
      setIsFetching(false);
    } catch (err) {
      setIsFetching(false);
      Alert.alert(
        'Could not fetch location',
        'Please try again or pick location from the map',
        [{ text: 'OK' }]
      );
    }
  }

  const pickLocationHandler = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>

      <MapPreview onPress={pickLocationHandler}
        style={styles.mapPreview} location={pickedLocation}>
        {isFetching
          ? <ActivityIndicator color={Colors.primary} size='large' />
          : <Text>No location chosen yet!</Text>
        }
      </MapPreview>
      <View style={styles.buttonRow}>
        <Button title="Get User Location"
          color={Colors.primary}
          onPress={getLocationHandler} />
        <Button title="Pick location"
          color={Colors.primary}
          onPress={pickLocationHandler} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: Colors.grey,
    borderWidth: 1
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})
export default LocationPicker;