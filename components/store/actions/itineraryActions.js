import { GET_ITINERARY, IS_FETCHING_ITINERARY } from '../constants'
import store from '../store'

const fetchDataItineraries = (itineraryCities) => {
    return {
        // siempre el que importe
        type: GET_ITINERARY,
        itineraryCities
    }
}

const getItinerariesList = async (pathname) => {
    let res = await fetch(pathname, { method: "GET" })
    let data = await res.json();
    return data;
}

export function isFetching(value) {
    return { type: IS_FETCHING_ITINERARY, payload: value }
}

export const getAllItineraries = (pathname) => {
    store.dispatch(isFetching(true));

    return async function (dispatch, ) {
        try {
            const data = await getItinerariesList(pathname);
            
            dispatch(isFetching(false));
            let dataFetched = fetchDataItineraries(data);
            
            return dispatch(dataFetched);
        } catch (err) {
            dispatch(isFetching(false));
            console.error(err)
        }
    }
}