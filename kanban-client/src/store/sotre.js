import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';

import uiReducer from './reducers/ui';
import projectReducer from './reducers/project';
import authReducer from './reducers/auth';


const rootReducer = combineReducers({
  ui: uiReducer,
  project: projectReducer,
  auth: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
