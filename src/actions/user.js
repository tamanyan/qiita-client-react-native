'use strict';

import * as types from '../types';
import * as constants from '../constants';
import User from '../models/User';
import LoadingItem from '../models/LoadingItem';
import Item from '../models/Item';
import itemData from '../mocks/items.json';
import { encodeParams } from '../utils';

const action = (type, payload=null, error=null) => (
    {type, payload, error}
);

export const authenticate = (code) => {
    return async (dispatch, getState) => {
        try {
            dispatch(action(types.GET_ACCESS_TOKEN));

            // Get Access Token
            const tokenResponse = await fetch('https://qiita.com/api/v2/access_tokens', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: constants.CLIENT_ID,
                    client_secret: constants.CLIENT_SECRET,
                    code: code,
                })
            });
            const tokenResponseJson = await tokenResponse.json();
            const token = tokenResponseJson.token

            // Get User
            const userResponse = await fetch('https://qiita.com/api/v2/authenticated_user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const userResponseJson = await userResponse.json();

            dispatch(action(types.GET_ACCESS_TOKEN_SUCCESSE, {
                token: token,
                authedUser: new User(userResponseJson)
            }));

            dispatch(action(types.GET_USER_ITEMS));

            // Get User Items
            const userItemsResponse = await fetch('https://qiita.com/api/v2/authenticated_user/items', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const userItemsResponseJson = await userItemsResponse.json();

            dispatch(action(types.GET_USER_ITEMS_SUCCESSE, {
                items: userItemsResponseJson.map(item => new Item(item)),
            }));
        } catch(error) {
            console.error(error);
        }
    }
}

export const getAuthedUserItems = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(action(types.GET_USER_ITEMS));
            const token = getState().user.token;

            // Get User Items
            const userItemsResponse = await fetch('https://qiita.com/api/v2/authenticated_user/items', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            const userItemsResponseJson = await userItemsResponse.json();

            dispatch(action(types.GET_USER_ITEMS_SUCCESSE, {
                items: userItemsResponseJson.map(item => new Item(item)),
            }));
        } catch(error) {
            console.error(error);
        }
    }
}
