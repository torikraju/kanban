import {
  UI_START_FORM_LOADING,
  UI_STOP_FORM_LOADING,
  SET_ACTIVE_LINK,
  REMOVE_ACTIVE_LINK,
} from './actionTypes';


export const startFormLoading = () => ({
  type: UI_START_FORM_LOADING,
});


export const stopFormLoading = () => ({
  type: UI_STOP_FORM_LOADING,
});

export const setActiveLink = (activeLink) => ({
  type: SET_ACTIVE_LINK,
  activeLink,
});


export const removeActiveLink = () => ({
  type: REMOVE_ACTIVE_LINK,
});
