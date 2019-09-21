export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';
import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../helpers/db';
import ENV from '../env';

export const addPlace = (title, tempImageUri, location) => {
  return async dispatch => {

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${ENV.googleApiKey}`);

    if (!response.ok) {
      throw new Error('geocode API call failed');
    }

    const responseData = await response.json();
    const address = responseData.results[0].formatted_address;

    let imageUri = '';
    if (tempImageUri) {
      const fileName = tempImageUri.split('/').pop();
      imageUri = FileSystem.documentDirectory + fileName;
      try {
        await FileSystem.moveAsync({
          from: tempImageUri,
          to: imageUri
        });
      } catch (error) {
        throw error;
      }
    }

    dbResult = await insertPlace(
      title,
      imageUri,
      address,
      location.latitude,
      location.longitude);

    dispatch({
      type: ADD_PLACE, placeData: {
        id: dbResult.insertId.toString(),
        title,
        imageUri,
        address,
        latitude: location.latitude,
        longitude: location.longitude
      }
    })
  }
};

export const loadPlaces = () => {
  return async dispatch => {
    dbResult = await fetchPlaces();
    dispatch({
      type: SET_PLACES,
      places: dbResult.rows._array
    }
    );
  }
};
