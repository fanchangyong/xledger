import Papa from 'papaparse';
import * as types from '../common/actionTypes';

const initialState = {
  categoryEntities: {},
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case types.REPLACE_CATEGORIES: {
      const csvString = action.payload;
      const result = Papa.parse(csvString, { header: true });
      const categoryEntities = result.data.reduce((acc, cur) => {
        acc[cur.id] = { ...cur, type: Number(cur.type) };
        return acc;
      }, {});
      return Object.assign({}, state, {
        categoryEntities,
      });
    }
    default: {
      return state;
    }
  }
}

export default categoriesReducer;
