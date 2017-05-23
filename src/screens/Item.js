'use strict';

import React, { Component, PropTypes } from 'react';
import {
    WebView,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { getItems } from '../actions';
import { ItemListView } from '../components';

class Item extends Component {
    static navigatorStyle = {
        tabBarHidden: true,
        backButtonTitle: ""
    };

    static propTypes = {
        url: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <WebView
                source={{uri: this.props.url}}
                style={{}}
            />
        );
  }
}

const mapStateToProps = (state) => {
    return {
    };
}

export default connect(mapStateToProps)(Item);
