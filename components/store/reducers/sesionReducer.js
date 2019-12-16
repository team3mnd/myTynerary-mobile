import { SESSION_ON, SESSION_OFF, NO_ERRORS } from '../constants'
import { AsyncStorage } from 'react-native';

// inicia el state con los datos que le definimos
const initialState = {
  success: false,
  token: '',
  errors: ''
};

// se tiene que pasar una const con el state y el action, al state se le define el initialState para que no marque undefiend
export default (state = initialState, action) => {
  switch (action.type) {
    case SESSION_ON:
      AsyncStorage.setItem('success', JSON.stringify(action.payload.success))
      AsyncStorage.setItem('token', action.payload.token)
      return {
        ...state,
        success: action.payload.success,
        token: action.payload.token,
        errors: action.payload.errors
      }
    case SESSION_OFF:
      AsyncStorage.clear()
      console.log('token borrado')
      return {
        ...state,
        success: action.payload.success,
        token: action.payload.token
      }
    case NO_ERRORS:
      return {
        ...state,
        errors: action.payload.errors
      }
    default:
      return state;
  }
};