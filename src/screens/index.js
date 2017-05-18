import { Navigation } from 'react-native-navigation';

import AllPosts from './AllPosts';
import Profile from './Profile';

export default (store, Provider) => {
    // Register Components here as screen
    Navigation.registerComponent('qiita.AllPosts', () => AllPosts, store, Provider);
    Navigation.registerComponent('qiita.Profile', () => Profile, store, Provider);
};
