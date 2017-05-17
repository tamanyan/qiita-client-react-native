import { Record } from 'immutable';

const UserRecord = Record({
    id: '',
    name: '',
    profileImageUrl: ''
});

export default class User extends UserRecord {
    constructor(user) {
        super({
            id: user.id,
            name: user.name,
            profileImageUrl: user.profile_image_url
        });
    }
}
