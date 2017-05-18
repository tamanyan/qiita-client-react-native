'use strict';

import * as types from '../types';
export default(state = [], action) => {
    switch (action.type) {
        case types.GET_ITEMS:
            return state;
        case types.GET_ITEMS_SUCCESSE:
            return state.concat(action.payload.items);
        default:
            return state;
    }
}
