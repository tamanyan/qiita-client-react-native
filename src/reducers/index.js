'use strict';

import { combineReducers } from 'redux';
import stream from './stream';
import user from './user';

export default combineReducers({
    stream,
    user
});
