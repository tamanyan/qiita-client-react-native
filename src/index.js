import {
    Actions,
    Scene,
    Router,
    Modal,
    Reducer
} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect, Provider } from 'react-redux';
import React, { Component } from 'react';
import AllPosts from './scenes/AllPosts';
import Profile from './scenes/Profile';
import TabIcon from './components/TabIcon';
import store from './store';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#eee',
    },
    titleStyle: {
        fontWeight: "bold"
    }
});

const RouterWithRedux = connect()(Router);

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };

    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 64;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux getSceneStyle={getSceneStyle}>
                    <Scene key="modal" component={Modal} >
                        <Scene key="root">
                            <Scene
                                key="main"
                                tabs={true}
                                tabBarStyle={styles.tabBarStyle}
                                tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                            >
                                <Scene key="allPosts" component={AllPosts} title="すべての投稿" titleStyle={styles.titleStyle} initial icon={TabIcon} />
                                <Scene key="profile" component={Profile} title="プロフィール" titleStyle={styles.titleStyle} icon={TabIcon} />
                            </Scene>
                        </Scene>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}
