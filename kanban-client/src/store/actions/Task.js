import axios from '../../utility/Axios';
import { startFormLoading, stopFormLoading } from './ui';


export const saveTask = (formData, identifier) => (dispatch) => {
  dispatch(startFormLoading());
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axios.post(`/api/backlog/${identifier}`, formData);
      resolve(request.data);
      dispatch(stopFormLoading());
    } catch (e) {
      dispatch(stopFormLoading());
      if (e.response) {
        reject(e.response);
      }
      reject(e);
    }
  });
};
