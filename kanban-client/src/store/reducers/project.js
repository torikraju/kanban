import {
  SET_SELECTED_PROJECT,
  REMOVE_SELECTED_PROJECT,
} from '../actions/actionTypes';
import { updateObject } from '../../utility/AppUtil';

const initialState = {
  project: {},
};

const setProject = (state, action) => updateObject(state, { project: action.project });

const removeProject = (state) => updateObject(state, { project: {} });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_PROJECT:
      return setProject(state, action);
    case REMOVE_SELECTED_PROJECT:
      return removeProject(state);
    default:
      return state;
  }
};

export default reducer;
