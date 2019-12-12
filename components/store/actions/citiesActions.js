
import { GET_CITIES, IS_FETCHING } from "../constants";
import store from '../store'

const fetchDataCities = cities => {
  return {
    // siempre el que importe
    type: GET_CITIES,
    cities
  };
};

const getCitiesList = ()  =>
   fetch("https://mytinerary-back.herokuapp.com/cities", { method: "GET" })
    .then(response => response.json())
    .then(cities => cities)


export function isFetching(value) {
  return { type: IS_FETCHING, payload: value }
}

export function getAllCities(){
  store.dispatch(isFetching(true));

  return async function(dispatch){
    try{
      const data = await getCitiesList();
      dispatch(isFetching(false));
      let dataFetched = fetchDataCities(data);
      //console.log(dataFetched);
      return dispatch(dataFetched);
    }catch(err){ 
      dispatch(isFetching(false));
      console.error(err)
    }
  }
}