// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import home from './home';
import config from './config';

const rootReducer = combineReducers({
  home,
  router,
  config,
  form: formReducer
});

export default rootReducer;
