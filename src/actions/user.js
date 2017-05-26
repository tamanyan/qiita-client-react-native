'use strict';

import * as types from '../types';
import * as constants from '../constants';
import User from '../models/User';
import LoadingItem from '../models/LoadingItem';
import itemData from '../mocks/items.json';
import { encodeParams } from '../utils';

const action = (type, payload=null, error=null) => (
    {type, payload, error}
);

export const getAccessToken = (code) => {
    return async (dispatch, getState) => {
        try {
            dispatch(action(types.GET_ACCESS_TOKEN));

            if (false) {
                const payload = {
                    token: "8d98bdbc543ea8d503d01ef54060ab8a3895f9bb"
                };

                dispatch(action(types.GET_ACCESS_TOKEN_SUCCESSE, payload));
            } else {
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

                const userResponse = await fetch('https://qiita.com/api/v2/authenticated_user', {
                    method: 'POST',
                    headers: {
                        'Authorizationt': `Bearer ${token}`,
                    }
                });
                const userResponseJson = await userResponse.json();

                const payload = {
                    token: token,
                    authedUser: new User(userResponseJson)
                };

                dispatch(action(types.GET_ACCESS_TOKEN_SUCCESSE, payload));
            }
        } catch(error) {
            console.error(error);
        }
    }
}
