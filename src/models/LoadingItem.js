'use strict';

import { Record } from 'immutable';
import User from './User';
import moment from 'moment';

const LoadingItemRecord = Record({
    id: '',
    height: 30
});

export default class LoadingItem extends LoadingItemRecord {
    constructor(item) {
        super(item)
    }
}
