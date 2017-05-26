import { Navigation } from 'react-native-navigation';

import AllPosts from './AllPosts';
import Profile from './Profile';
import Item from './Item';
import Login from './Login';

export default (store, Provider) => {
    // Register Components here as screen
    Navigation.registerComponent('qiita.AllPosts', () => AllPosts, store, Provider);
    Navigation.registerComponent('qiita.Profile', () => Profile, store, Provider);
    Navigation.registerComponent('qiita.Item', () => Item, store, Provider);
    Navigation.registerComponent('qiita.Login', () => Login, store, Provider);
};
