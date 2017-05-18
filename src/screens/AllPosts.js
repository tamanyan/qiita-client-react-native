'use strict';

import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { getItems } from '../actions';
import { ItemListView } from '../components';

class AllPosts extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(getItems(1));
    }

    onItemDidSelect(id) {
        console.log(id);
    }

    onRefresh() {
        this.props.dispatch(getItems(1));
    }

    onEndReached(nextPage) {
        this.props.dispatch(getItems(nextPage));
    }

    render() {
        return (
            <ItemListView
                items={this.props.items}
                page={this.props.page}
                onRefresh={() => this.onRefresh()}
                onItemDidSelect={(id) => this.onItemDidSelect(id)}
                onEndReached={(nextPage) => this.onEndReached(nextPage)}
             />
        );
  }
}

const mapStateToProps = (state) => {
    return {
        items: state.items.items,
        page: state.items.page,
    };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps)(AllPosts);

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
