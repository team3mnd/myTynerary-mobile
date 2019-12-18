import { WAS_SEND_COMMENT, IS_SENDING } from "../constants";
import store from '../store'

export function isSending(value) {
    return { type: IS_SENDING, payload: value }
}

const sendFetch = async (comment) => {
    let res = await fetch('https://mytinerary-back.herokuapp.com/comments/add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    let data = await res.json();
    console.log("data", data)
    return data;
}

export function fetchDataComment(value) {
    return { type: WAS_SEND_COMMENT, comment: value }
}

export function sendComment(comment) {
    //is sending comment
    store.dispatch(isSending(true))
    return async function (dispatch) {
        try {
            const data = await sendFetch(comment);
            //the comment was send
            dispatch(isSending(false))
            let fetchData = fetchDataComment(data)
            return dispatch(fetchData);
        } catch (err) {
            dispatch(isSending(false))
            console.error("err", err)
        }
    }
}