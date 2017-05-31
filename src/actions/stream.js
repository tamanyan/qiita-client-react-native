'use strict';

import * as types from '../types';
import Item from '../models/Item';
import LoadingItem from '../models/LoadingItem';
import itemData from '../mocks/items.json';
import { encodeParams } from '../utils';

const action = (type, payload=null, error=null) => (
    {type, payload, error}
);

export const getItems = (page) => {
    return async (dispatch, getState) => {
        try {
            if (getState().stream.isLoading) {
                throw new Error('can\'t call when isLoading equal to true');
            }

            dispatch(action(types.GET_ITEMS, {page: page}));

            if (false) {
                const payload = {
                    items: itemData.map(item => new Item(item)).concat([new LoadingItem()]),
                    page: page
                };

                setTimeout(() => {
                    dispatch(action(types.GET_ITEMS_SUCCESSE, payload));
                }, 3000);
            } else {
                let queryString = encodeParams({page: page, per_page: 30});
                const response = await fetch('https://qiita.com/api/v2/items?' + queryString);
                const responseJson = await response.json();
                const payload = {
                    items: responseJson.map(item => new Item(item)).concat([new LoadingItem()]),
                    page: page
                };

                dispatch(action(types.GET_ITEMS_SUCCESSE, payload));
            }
        } catch(error) {
            console.error(error);
        }
    }
}
