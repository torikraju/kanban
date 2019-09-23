import axios from '../../utility/Axios';
import { startFormLoading, stopFormLoading } from './ui';

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
