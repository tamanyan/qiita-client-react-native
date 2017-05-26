'use strict';

import { combineReducers } from 'redux';
import items from './items';
import user from './user';

export default combineReducers({
    items,
    user
});
