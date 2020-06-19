import Papa from 'papaparse';
import * as types from '../common/actionTypes';

const initialState = {
  bills: [],
};

function billsReducer(state = initialState, action) {
  switch (action.type) {
    case types.REPLACE_BILLS: {
      const csvString = action.payload;
      const result = Papa.parse(csvString, { header: true });
      const bills = result.data.map((d, idx) => ({
        ...d,
        type: Number(d.type),
        amount: Math.abs(Number(d.amount)),
        id: idx,
      }));
      return Object.assign({}, state, {
        bills,
      });
    }
    default: {
      return state;
    }
  }
}

export default billsReducer;
