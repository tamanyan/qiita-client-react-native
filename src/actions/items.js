'use strict';

import * as types from '../types';
import Item from '../models/Item';
import itemData from '../mocks/items.json';

const action = (type, payload=null, error=null) => (
  {type, payload, error}
);

export const getItems = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(action(types.GET_ITEMS));

            if (true) {
                const payload = {
                    items: itemData.map(item => new Item(item))
                };
                dispatch(action(types.GET_ITEMS_SUCCESSE, payload));
            } else {
                const response = await fetch('https://qiita.com/api/v2/items');
                const responseJson = await response.json();
                const payload = {
                    items: responseJson.map(item => new Item(item))
                };
                dispatch(action(types.GET_ITEMS_SUCCESSE, payload));
            }

        } catch(error) {
            console.error(error);
        }
    }
}
