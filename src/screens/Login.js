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
import { getAccessToken } from '../actions';

class Login extends Component {
    static navigatorStyle = {
        tabBarHidden: true,
        backButtonTitle: ""
    };

    static propTypes = {
        // url: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    onShouldStartLoadWithRequest(event) {
        // Implement any custom loading logic here, don't forget to return!
        const parsedUrl = urlParse(event.url, true);

        if (parsedUrl.host == 'qiita.com' && parsedUrl.query.code != undefined && parsedUrl.query.state != undefined) {
            this.props.dispatch(getAccessToken(parsedUrl.query.code));
        }

        return true;
    };

    render() {
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
    };
}

export default connect(mapStateToProps)(Login);
