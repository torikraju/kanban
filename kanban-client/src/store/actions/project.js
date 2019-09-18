import axios from '../../utility/Axios';

import {
  SET_SELECTED_PROJECT,
  REMOVE_SELECTED_PROJECT,
} from './actionTypes';

import { startFormLoading, stopFormLoading } from './ui';
import { isObjEmpty } from '../../utility/AppUtil';

export const setProject = (project) => ({
  type: SET_SELECTED_PROJECT,
  project,
});

export const removeProject = () => ({
  type: REMOVE_SELECTED_PROJECT,
});

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
    const request = await axios.delete(`api/project/${identifier}`);
    resolve(request.data);
  } catch (e) {
    reject(e.response);
  }
});


export const getOneProject = (identifier) => () => new Promise(async (resolve, reject) => {
  try {
    const request = await axios.get(`api/project/${identifier}`);
    resolve(request.data);
  } catch (e) {
    reject(e.response);
  }
});

// eslint-disable-next-line max-len
export const resolveProject = (identifier) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  try {
    let { project } = getState().project;
    if (isObjEmpty(project)) {
      project = await dispatch(getOneProject(identifier));
      dispatch(setProject(project));
    }
    resolve(project);
  } catch (e) {
    reject(e.response);
  }
});
