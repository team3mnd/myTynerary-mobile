import { GET_ITINERARY, IS_FETCHING_ITINERARY } from '../constants'

// inicia el state con los datos que le definimos
const initialState = {
  itineraryCity: [],
  isFetching: false
};

// se tiene que pasar una const con el state y el action, al state se le define el initialState para que no marque undefiend
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ITINERARY:
      return {
        ...state,
        itineraryCity: action.itineraryCities
      }
    case IS_FETCHING_ITINERARY:
      return {
        ...state,
        isFetching: action.payload
      }
    default:
      return state;
  }
};