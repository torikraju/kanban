import axios from '../../utility/Axios';

import { startFormLoading, stopFormLoading } from './ui';

export const saveProject = (formData) => (dispatch) => {
  dispatch(startFormLoading());
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axios.post('/api/project', formData);
      console.log(request.data);
      resolve(request.data);
      dispatch(stopFormLoading());
    } catch (e) {
      dispatch(stopFormLoading());
      reject(e.response);
    }
  });
};

export const getAllProject = () => () => new Promise(async (resolve, reject) => {
  try {
    const request = await axios.get('/api/project/all');
    console.log(request.data);
    resolve(request.data);
  } catch (e) {
    reject(e.response);
  }
});
