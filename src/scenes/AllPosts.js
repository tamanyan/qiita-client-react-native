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
        this.props.dispatch(getItems());
    }

    onItemDidSelect(id) {
        console.log(id);
    }

    onRefresh() {
        this.props.dispatch(getItems());
    }

    render() {
        return (
            <ItemListView
                items={this.props.items}
                onRefresh={() => this.onRefresh()}
                onItemDidSelect={(id) => this.onItemDidSelect(id)}
             />
        );
  }
}

const mapStateToProps = (state) => {
    return {
        items: state.items
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
