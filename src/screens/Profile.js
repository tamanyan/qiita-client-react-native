'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import Login from './Login';
import Item from '../models/Item';
import { getAuthedUserItems } from '../actions';
import { UserProfile } from '../components';
import { ItemCell } from '../components';
import { AsyncStorage } from 'react-native';
import { store, storageStore } from '../store';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.id === 'willAppear') {
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

    onItemDidSelect(index, item) {
        this.props.navigator.push({
            screen: 'qiita.Item',
            passProps: {
                url: item.url
            }
        })
    }

    deleteCache() {
        storageStore.purge(["user"]);
        console.log("delete cache");
    }

    render() {
        if (this.props.user == undefined) {
            return (
                <View style={styles.container}>
                    <Text style={styles.annotation}>You need to login</Text>
                </View>
            );
        } else {
            const user = this.props.user;
            const items = this.props.items;

            return (
                <ScrollView>
                    <TouchableWithoutFeedback onLongPress={() => this.deleteCache()}>
                        <View>
                            <UserProfile user={this.props.user} />
                        </View>
                    </TouchableWithoutFeedback>
                    {items.map((item, index) => {
                        return (
                            <TouchableHighlight key={`user_touchable_${index}`} onPress={() => this.onItemDidSelect(index, item)}>
                                <View>
                                    <ItemCell key={`user_item_${index}`} item={item} />
                                </View>
                            </TouchableHighlight>
                        );
                    })}
                </ScrollView>
            );
        }
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.authedUser,
        items: state.user.items
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
    },
    annotation: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
