import React, { useEffect } from 'react'
import { Platform, View, Text, FlatList, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  const places = useSelector(state => state.places.places);
  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => <PlaceItem
          place={itemData.item}
          onPress={() => props.navigation.navigate('PlaceDetail', { place: itemData.item })} />} />
    </View>
  )
}

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }} />

      </HeaderButtons>
    )

  }

};

const styles = StyleSheet.create({
  place: {
    borderWidth: 1,
    padding: 3,
    margin: 2
  }
})
export default PlacesListScreen;