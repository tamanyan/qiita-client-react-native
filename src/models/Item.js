'use strict';

import { Record } from 'immutable';
import User from './User';
import moment from 'moment';

const ItemRecord = Record({
    id: '',
    title: '',
    url: '',
    time: '',
    user: new User({}),
    tags: []
});


export default class Item extends ItemRecord {
    constructor(item) {
        const createAtMoment = moment(item.created_at);
        const diffSeconds = moment().diff(createAtMoment, 'seconds');
        const diffMinutes = moment().diff(createAtMoment, 'minutes');
        const diffHours = moment().diff(createAtMoment, 'hours');
        const diffDays = moment().diff(createAtMoment, 'days');

        const time = (() => {
            if (diffSeconds < 60) {
                return `${diffSeconds}s`;
            } else if (diffMinutes < 60) {
                return `${diffMinutes}m`;
            } else if (diffHours < 24) {
                return `${diffHours}h`;
            } else if (diffDays < 7) {
                return `${diffDays}d`;
            } else {
                return createAtMoment.format('YYYY/MM/DD HH:mm:ss');
            }
        })();

        super({
            id: item.id,
            title: item.title,
            time: time,
            url: item.url,
            user: new User(item.user),
            tags: item.tags.map(tag => tag.name)
        });
    }
}
