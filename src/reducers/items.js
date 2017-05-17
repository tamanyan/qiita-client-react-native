import * as types from '../types';

export default (state=[], action) => {
  switch (action.type) {
    case types.GET_ITEMS:
      return state;

    case types.GET_ITEMS_SUCCESSE:
      return action.payload.items;

    default:
      return state;
  }
}