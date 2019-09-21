import { ADD_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/Place';

const initialState = {
  places: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        places: state.places.concat(
          new Place(
            action.placeData.id,
            action.placeData.title,
            action.placeData.imageUri,
            action.placeData.address,
            action.placeData.latitude,
            action.placeData.longitude,
          )
        )
      }
    case SET_PLACES:
      return {
        places: action.places.map(place => new Place(
          place.id,
          place.title,
          place.imageUri,
          place.address,
          place.latitude,
          place.longitude)
        )
      }
  }
  return state;
}
