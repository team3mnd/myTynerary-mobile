import {GET_CITIES, IS_FETCHING} from '../constants'

const initialState = {
  cities: [],
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return {
        ...state,
        cities: action.cities
      }
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload  
      }
    default:
      return state;
  }
};

