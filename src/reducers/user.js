'use strict';

import * as types from '../types';
import userData from '../mocks/authenticated_user.json';
import User from '../models/User';
import Item from '../models/Item';
import { REHYDRATE } from 'redux-persist/constants'

export default(state = {token: "", authedUser: undefined, items: []}, action) => {
    switch (action.type) {
        case REHYDRATE:
            if ('user' in action.payload && action.payload.user != null &&
                'authedUser' in action.payload.user && action.payload.user.authedUser != null) {
                const user = action.payload.user;
                return {
                    authedUser: new User(user.authedUser),
                    items: user.items.map(i => new Item(i)),
                    token: user.token,
                };
            } else {
                return state;
            }
        case types.GET_ACCESS_TOKEN:
            return state;
        case types.GET_ACCESS_TOKEN_SUCCESSE:
            return {
                ...state,
                token: action.payload.token,
                authedUser: action.payload.authedUser,
            };
        case types.GET_USER_ITEMS:
            return state;
        case types.GET_USER_ITEMS_SUCCESSE:
            return {
                ...state,
                items: action.payload.items
            };
        default:
            return state;
    }
}
