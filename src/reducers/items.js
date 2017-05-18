'use strict';

import * as types from '../types';
import Item from '../models/Item';

export default(state = {page: 0, items: []}, action) => {
    switch (action.type) {
        case types.GET_ITEMS:
            return state;
        case types.GET_ITEMS_SUCCESSE:
            if (state.page < action.payload.page) {
                const prevItems = state.items.filter(i => i instanceof Item)
                return {
                    page: action.payload.page,
                    items: prevItems.concat(action.payload.items)
                };
            } else {
                return {
                    page: action.payload.page,
                    items: action.payload.items
                };
            }
        default:
            return state;
    }
}
