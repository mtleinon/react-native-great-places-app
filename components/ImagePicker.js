import React, { useState } from 'react'
import { Button, View, Text, StyleSheet, Image } from 'react-native'
import Colors from '../constants/Colors'
import * as ExpoImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImagePicker = props => {
  const [pickedImage, setPickedImage] = useState(null);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await ExpoImagePicker.launchCameraAsync(
      {
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,

      }
    );
    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  }

  return (
    <View style={styles.imagePicker}>

      <View style={styles.imagePreview}>
        {!pickedImage
          ? <Text>No image picked yet.</Text>
          : <Image style={styles.image} source={{ uri: pickedImage }} />}
      </View>
      <Button title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 25,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grey,
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
export default ImagePicker;