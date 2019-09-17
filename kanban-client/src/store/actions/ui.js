import {
  UI_START_FORM_LOADING,
  UI_STOP_FORM_LOADING,
} from './actionTypes';


export const startFormLoading = () => ({
  type: UI_START_FORM_LOADING,
});


export const stopFormLoading = () => ({
  type: UI_STOP_FORM_LOADING,
});
