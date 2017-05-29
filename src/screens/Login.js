'use strict';

import React, { Component, PropTypes } from 'react';
import {
    WebView,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import urlParse from 'url-parse';
import uuid from 'react-native-uuid';
import * as constants from '../constants';
import { authenticate } from '../actions';

class Login extends Component {
    static navigatorStyle = {
        tabBarHidden: true,
    };

    static navigatorButtons = {
        leftButtons: [
            {
                title: '閉じる', // for a textual button, provide the button title (label)
                id: 'close', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }
        ]
    };

    state = {
        isWebViewHidden: false
    }

    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillMount() {
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'close') {
                this.props.navigator.dismissModal({
                    animationType: 'slide-down'
                });
            }
        }
    }

    onShouldStartLoadWithRequest(event) {
        // Implement any custom loading logic here, don't forget to return!
        const parsedUrl = urlParse(event.url, true);

        if (parsedUrl.host == 'qiita.com' && parsedUrl.query.code != undefined && parsedUrl.query.state != undefined) {
            this.props.dispatch(authenticate(parsedUrl.query.code));
            this.setState({isWebViewHidden: true});
        }

        return true;
    };

    render() {
        // dissmiss modal if authenticated success
        if (this.props.user != undefined) {
            this.props.navigator.dismissModal({
                animationType: 'slide-down'
            });
            return (<View></View>);
        }

        if (this.state.isWebViewHidden == true) {
            return (<View></View>);
        }

        const state = uuid.v4();
        const url = `https://qiita.com/api/v2/oauth/authorize?client_id=${constants.CLIENT_ID}&scope=read_qiita+write_qiita_team&state=${state}`;

        return (
            <WebView
                source={{uri: url}}
                onShouldStartLoadWithRequest={(event) => this.onShouldStartLoadWithRequest(event)}
                style={{}}
            />
        );
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.authedUser
    };
}

export default connect(mapStateToProps)(Login);
