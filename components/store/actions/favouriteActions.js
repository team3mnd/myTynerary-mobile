import { ADD_OR_DEL_FAV, GET_FAVOURITES } from '../constants'
//import store from '../store'

const fetchFavourite = (favourites) => {
  return {
    type: ADD_OR_DEL_FAV,
    favourites
  }
}

const fetchDataFavourites = (favourites) => {
  return {
    type: GET_FAVOURITES,
    favourites
  }
}

const getFavouritesList = async (userId) => {
  let pathname = 'https://mytinerary-back.herokuapp.com/users/favourite/' + userId;
  // console.log(pathname);
  let res = await fetch(pathname, {
    method: "GET",
  })
  let data = await res.json();

  return data;
}

export const getAllFavourites = (userId) => {
  return async function (dispatch) {
    try {
      const data = await getFavouritesList(userId);
      let dataFetched = fetchDataFavourites(data);
      return dispatch(dataFetched);
    } catch (err) {
      console.error(err)
    }
  }
}

const postFavFetch = async (userId, itineraryId) => {

  //console.log("userId", userId);
  //console.log("itineraryId", itineraryId);

  let res = await fetch('https://mytinerary-back.herokuapp.com/users/favourite', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        userId: userId,
        itineraryId: itineraryId
      })
  })

  let data = await res.json();
  return data;
}

export const postFavourites = (userId, itineraryId) => {
  return async function (dispatch) {
    try {
      const data = await postFavFetch(userId, itineraryId);

      let dataFetched = fetchFavourite(data);

      return dispatch(dataFetched);
    } catch (err) {
      console.error("err", err)
    }
  }
}