import axios from '../../utility/Axios';

import { startFormLoading, stopFormLoading } from './ui';

export const saveProject = (formData) => (dispatch) => {
  dispatch(startFormLoading());
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axios.post('/api/project', formData);
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
    resolve(request.data);
  } catch (e) {
    reject(e.response);
  }
});

export const deleteProject = (identifier) => () => new Promise(async (resolve, reject) => {
  try {
    console.log(identifier);
    const request = await axios.delete(`api/project/${identifier}`);
    resolve(request.data);
  } catch (e) {
    console.log(e.response);
    reject(e.response);
  }
});
