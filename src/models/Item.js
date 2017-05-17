import { Record, Map } from 'immutable';
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

        const time = (() => {
            if (diffSeconds <= 60) {
                return `${diffSeconds}秒前`;
            } else if (diffMinutes <= 60) {
                return `${diffMinutes}分前`;
            } else if (diffHours <= 12) {
                return `${diffHours}時間前`;
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
