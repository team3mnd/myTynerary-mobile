import { ADD_OR_DEL_FAV, GET_FAVOURITES } from '../constants'

// inicia el state con los datos que le definimos
const initialState = {};

// se tiene que pasar una const con el state y el action, al state se le define el initialState para que no marque undefiend
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVOURITES:
      return {
        ...state,
        favourites: action.favourites
      }
    case ADD_OR_DEL_FAV:
      return {
        ...state,
        favourites: action.favourites
      }
    default:
      return state;
  }
};