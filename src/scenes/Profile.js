import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
// import { getItems } from '../actions';
// import { ItemListView } from '../components';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    onItemDidSelect(id) {
        console.log(id);
    }

    render() {
        return (
            <View>
                <Text>Profile</Text>
            </View>
        );
  }
}

const mapStateToProps = (state) => {
    return {
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
