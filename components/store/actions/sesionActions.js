import { SESSION_OFF, SESSION_ON, NO_ERRORS } from '../constants'
//import store from '../store'

const resultFetch = (data) => {
  return {
    // siempre el que importe
    type: SESSION_ON,
    payload: {
      success: data.success,
      token: data.token,
      errors: data.errors
    }
  }
}

const noErrors = () => {
  return {
    type: NO_ERRORS,
    payload: {
      errors: ""
    }
  }
}

const sendFetch = async (user) => {
  let res = await fetch('https://mytinerary-back.herokuapp.com/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  let data = await res.json();
  console.log("data", data)
  return data;
}

/* export function isFetching(value) {
    return { type: IS_FETCHING_ITINERARY, payload: value }
} */

export const getAccess = (user) => {
  //store.dispatch(isFetching(true));
  console.log('getAccess')
  return async function (dispatch) {
    try {
      const data = await sendFetch(user);

      //dispatch(isFetching(false));
      let dataFetched = resultFetch(data);

      return dispatch(dataFetched);
    } catch (err) {
      //dispatch(isFetching(false));
      console.error("err", err)
    }
  }
}

export const getExit = () => {
  return ({
    type: SESSION_OFF,
    payload: {
      success: false,
      token: ''
    }
  });
}

export const clearErrors = () => {
  console.log('no errors')
  return function (dispatch) {
    try {
      //dispatch(isFetching(false));
      // let dataFetched = resultFetch(data);

      return dispatch(noErrors());
    } catch (err) {
      //dispatch(isFetching(false));
      console.error("err", err)
    }
  }
}