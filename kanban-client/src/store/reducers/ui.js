import {
  UI_START_FORM_LOADING,
  UI_STOP_FORM_LOADING,
} from '../actions/actionTypes';
import { updateObject } from '../../utility/AppUtil';

const initialState = {
  formLoading: false,
};

const startFormLoading = (state) => updateObject(state, { formLoading: true });

const stopFormLoading = (state) => updateObject(state, { formLoading: false });


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_FORM_LOADING:
      return startFormLoading(state);
    case UI_STOP_FORM_LOADING:
      return stopFormLoading(state);
    default:
      return state;
  }
};

export default reducer;
