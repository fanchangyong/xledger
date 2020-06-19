import { combineReducers } from 'redux';
import bills from './bills';
import user from './user';

const rootReducer = combineReducers({
  user,
  bills,
});

export default rootReducer;
