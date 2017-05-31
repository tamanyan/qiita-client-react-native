'use strict';

import * as types from '../types';
import User from '../models/User';
import LoadingItem from '../models/LoadingItem';
import Item from '../models/Item';
import { encodeParams } from '../utils';
import Config from 'react-native-config'

const action = (type, payload=null, error=null) => (
    {type, payload, error}
);

export const authenticate = (code) => {
    return async (dispatch, getState) => {
        try {

            /* Get Access Token */

            dispatch(action(types.GET_ACCESS_TOKEN));

            let token = "";

            if (Config.USE_MOCK == 1) {
                const tokenResponseJson = require('../mocks/access_token.json');
                token = tokenResponseJson.token
            } else {
                const tokenResponse = await fetch('https://qiita.com/api/v2/access_tokens', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: Config.CLIENT_ID,
                        client_secret: Config.CLIENT_SECRET,
                        code: code,
                    })
                });
                const tokenResponseJson = await tokenResponse.json();
                token = tokenResponseJson.token
            }

            /* Get User Info */

            let userResponseJson = {};

            if (Config.USE_MOCK == 1) {
                userResponseJson = require('../mocks/authenticated_user.json');
            } else {
                // Get User
                const userResponse = await fetch('https://qiita.com/api/v2/authenticated_user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                userResponseJson = await userResponse.json();
            }

            dispatch(action(types.GET_ACCESS_TOKEN_SUCCESSE, {
                token: token,
                authedUser: new User(userResponseJson)
            }));

            /* Get User Items */

            dispatch(action(types.GET_USER_ITEMS));

            let userItemsResponseJson = {};

            if (Config.USE_MOCK == 1) {
                userItemsResponseJson = require('../mocks/authenticated_user_items.json');
            } else {
                const userItemsResponse = await fetch('https://qiita.com/api/v2/authenticated_user/items', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                userItemsResponseJson = await userItemsResponse.json();
            }

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

            let userItemsResponseJson = {};

            if (Config.USE_MOCK == 1) {
                userItemsResponseJson = require('../mocks/authenticated_user_items.json');
            } else {
                const userItemsResponse = await fetch('https://qiita.com/api/v2/authenticated_user/items', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                userItemsResponseJson = await userItemsResponse.json();
            }

            dispatch(action(types.GET_USER_ITEMS_SUCCESSE, {
                items: userItemsResponseJson.map(item => new Item(item)),
            }));
        } catch(error) {
            console.error(error);
        }
    }
}
