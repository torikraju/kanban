import axios from '../../utility/Axios';
import { startFormLoading, stopFormLoading } from './ui';
import {
  SET_AUTH_TOKEN,
  REMOVE_AUTH_TOKEN,
  SET_EXPIRY_DATE,
  REMOVE_EXPIRY_DATE,
} from './actionTypes';


const setAuthToken = (token) => ({
  type: SET_AUTH_TOKEN,
  token,
});


const removeAuthToken = () => ({
  type: REMOVE_AUTH_TOKEN,
});

const setExpiryDate = (expiresIn) => ({
  type: SET_EXPIRY_DATE,
  expiresIn,
});


const removeExpiryDate = () => ({
  type: REMOVE_EXPIRY_DATE,
});

export const authInfo = (response) => (dispatch) => {
  const { token, expiresIn } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('expiresIn', expiresIn);
  dispatch(setAuthToken(token));
  dispatch(setExpiryDate(expiresIn));
};

export const register = (formData) => (dispatch) => {
  dispatch(startFormLoading());
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axios.post('/api/user/register', formData);
      dispatch(stopFormLoading());
      resolve(request.data);
    } catch (e) {
      dispatch(stopFormLoading());
      reject(e.response);
    }
  });
};

export const tryAuth = (formData) => (dispatch) => {
  dispatch(startFormLoading());
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axios.post('/api/user/login', formData);
      dispatch(authInfo(request));
      dispatch(stopFormLoading());
      resolve(request.data);
    } catch (e) {
      dispatch(stopFormLoading());
      reject(e.response);
    }
  });
};
