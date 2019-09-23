import {
  SET_AUTH_TOKEN,
  REMOVE_AUTH_TOKEN,
  SET_EXPIRY_DATE,
  REMOVE_EXPIRY_DATE,
} from '../actions/actionTypes';
import { updateObject } from '../../utility/AppUtil';

const initialState = {
  token: '',
  expiresIn: '',
};


const setAuthToken = (state, action) => updateObject(state, { token: action.token });

const removeAuthToken = (state) => updateObject(state, { token: '' });

const setExpiryDate = (state, action) => updateObject(state, { expiresIn: action.expiresIn });

const removeExpiryDate = (state) => updateObject(state, { expiresIn: '' });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return setAuthToken(state, action);
    case REMOVE_AUTH_TOKEN:
      return removeAuthToken(state);
    case SET_EXPIRY_DATE:
      return setExpiryDate(state, action);
    case REMOVE_EXPIRY_DATE:
      return removeExpiryDate(state);
    default:
      return state;
  }
};

export default reducer;
