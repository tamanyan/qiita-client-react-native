'use strict';

import * as types from '../types';
import userData from '../mocks/authenticated_user.json';
import User from '../models/User';

export default(state = {token: "", authedUser: undefined}, action) => {
    switch (action.type) {
        case types.GET_ACCESS_TOKEN:
            return state;
        case types.GET_ACCESS_TOKEN_SUCCESSE:
            return {
                token: action.payload.token,
                authedUser: action.payload.authedUser
            };
        case types.GET_ACCESS_TOKEN:
            return state;
        default:
            return state;
    }
}
