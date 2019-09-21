import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import ENV from '../env';

const MapPreview = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latitude},${props.location.longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color&markers=color:red%7Clabel:C%7C${props.location.latitude},${props.location.longitude}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.mapPreview, props.style]}>
      {imagePreviewUrl
        ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
        : props.children
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})
export default MapPreview;