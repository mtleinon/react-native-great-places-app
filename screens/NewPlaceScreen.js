import React, { useState, useCallback } from 'react'
import { Button, View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';

import Colors from '../constants/Colors'
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const [title, setTitle] = useState('');
  const [tempImageUri, setTempImageUri] = useState('');
  const [location, setLocation] = useState();

  const dispatch = useDispatch();

  const locationPickerHandler = useCallback((pickedLocation) => {
    setLocation(pickedLocation);
  }, []);

  const addPlaceHandler = () => {
    dispatch(placesActions.addPlace(title, tempImageUri, location));
    props.navigation.goBack();
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <ImagePicker onImageTaken={setTempImageUri} />
        <LocationPicker navigation={props.navigation}
          locationPickerHandler={locationPickerHandler} />
        <View style={styles.button}>
          <Button title="Add" color={Colors.primary} onPress={addPlaceHandler} />
        </View>
      </View>
    </ScrollView>
  )
}

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add New Place'
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 3
  },
  input: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  button: {
    marginTop: 20,
    alignItems: 'center'
  }
})
export default NewPlaceScreen