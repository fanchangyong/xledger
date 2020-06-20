import { combineReducers } from 'redux';
import bills from './bills';
import categories from './categories';
import user from './user';

const rootReducer = combineReducers({
  user,
  bills,
  categories,
});

export default rootReducer;
