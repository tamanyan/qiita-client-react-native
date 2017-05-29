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
    location: '',
    organization: '',
});

export default class User extends UserRecord {
    constructor(user) {
        // For stored data
        if ('profileImageUrl' in user) {
            super(user);
        } else {
            super({
                id: user.id,
                name: user.name,
                description: user.description,
                profileImageUrl: user.profile_image_url,
                followeesCount: user.followees_count,
                followersCount: user.followers_count,
                itemsCount: user.items_count,
                organization: user.organization,
                location: user.location,
            });
        }
    }
}
