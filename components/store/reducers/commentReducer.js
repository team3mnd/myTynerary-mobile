import {WAS_SEND_COMMENT, IS_SENDING} from '../constants'

const initialState = {
    comment: {},
    isSending: false
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case WAS_SEND_COMMENT:
        return {
          ...state,
          comment: action.comment
        }
      case IS_SENDING:
        return {
          ...state,
          isSending: action.payload 
        }
      default:
        return state;
    }
  };