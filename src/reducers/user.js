'use strict';

import * as types from '../types';

export default(state = {token: "", authedUser: undefined}, action) => {
    switch (action.type) {
        case types.GET_ACCESS_TOKEN:
            return state;
        case types.GET_ACCESS_TOKEN_SUCCESSE:
            return {
                token: action.payload.token,
                authedUser: action.payload.authedUser
            };
        default:
            return state;
    }
}
