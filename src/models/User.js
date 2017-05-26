'use strict';

import { Record } from 'immutable';

const UserRecord = Record({
    id: '',
    name: '',
    description: '',
    profileImageUrl: '',
    followeesCount: 0,
    followersCount: 0,
    itemsCount: 0,
    organization: ''
});

export default class User extends UserRecord {
    constructor(user) {
        super({
            id: user.id,
            name: user.name,
            description: user.description,
            profileImageUrl: user.profile_image_url,
            followeesCount: user.followees_count,
            followersCount: user.followers_count,
            itemsCount: user.items_count,
            organization: user.organization,
        });
    }
}
