'use strict';

import * as types from '../types';
import Item from '../models/Item';
import LoadingItem from '../models/LoadingItem';
import { REHYDRATE } from 'redux-persist/constants'

export default(state = {page: 0, items: []}, action) => {
    switch (action.type) {
        case REHYDRATE:
            if ('stream' in action.payload && action.payload.stream != null) {
                return {
                    items: action.payload.stream.items.map((item, index) => {
                        if (index == action.payload.stream.items.length - 1) {
                            return new LoadingItem(item);
                        } else {
                            return new Item(item);
                        }
                    }),
                    page: action.payload.stream.page
                };
            } else {
                return state;
            }
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
