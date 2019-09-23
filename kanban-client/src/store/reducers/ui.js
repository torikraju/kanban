import {
  UI_START_FORM_LOADING,
  UI_STOP_FORM_LOADING,
  SET_ACTIVE_LINK,
  REMOVE_ACTIVE_LINK,
} from '../actions/actionTypes';
import { updateObject } from '../../utility/AppUtil';

const initialState = {
  formLoading: false,
  activeLink: '',
};

const startFormLoading = (state) => updateObject(state, { formLoading: true });

const stopFormLoading = (state) => updateObject(state, { formLoading: false });

const setActiveLink = (state, action) => updateObject(state, { activeLink: action.activeLink });

const removeActiveLink = (state) => updateObject(state, { activeLink: '' });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_FORM_LOADING:
      return startFormLoading(state);
    case UI_STOP_FORM_LOADING:
      return stopFormLoading(state);
    case SET_ACTIVE_LINK:
      return setActiveLink(state, action);
    case REMOVE_ACTIVE_LINK:
      return removeActiveLink(state);
    default:
      return state;
  }
};

export default reducer;
