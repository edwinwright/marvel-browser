import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { entities } from '../reducers/entities';
import { pagination } from '../reducers/pagination';
import * as errorMessage from '../reducers/errorMessage';

const rootReducer = combineReducers({
  routing,
  entities,
  pagination,
  errorMessage,
});

export default rootReducer;
