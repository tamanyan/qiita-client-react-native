'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
// import { getItems } from '../actions';
import { UserProfile } from '../components';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id === 'willAppear') {
            console.log(event);
            if (this.props.user == undefined) {
                this.props.navigator.showModal({
                    screen: "qiita.Login",
                    title: "ログイン",
                    passProps: {},
                    navigatorStyle: {},
                    animationType: 'slide-up'
                });
            }
        }
    }

    render() {
        if (this.props.user == undefined) {
            return (
                <Text>You should login</Text>
            );
        } else {
            return (
                <UserProfile user={this.props.user} />
            );
        }
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.authedUser
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
