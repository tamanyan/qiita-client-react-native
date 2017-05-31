'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import Item from '../models/Item';
import LoadingItem from '../models/LoadingItem';
import { ItemCell } from './ItemCell';
import {
     MAIN_TEXT_COLOR,
     SUB_TEXT_COLOR,
     DEFAULT_PADDING,
     SMALL_PADDING,
     SMALL_MARGIN,
     EXTRA_SMALL_MARGIN,
} from '../appearance';

export class ItemList extends Component {
    static defaultProps = {
        onItemDidSelect: (id) => {},
        onRefresh: () => { console.log('refresh') },
        onEndReached: (next) => {},
    }

    static propTypes = {
        isRefreshing: PropTypes.bool.isRequired,
        items: PropTypes.array.isRequired,
        page: PropTypes.number.isRequired,
        onItemDidSelect: PropTypes.func,
        onRefresh: PropTypes.func,
        onEndReached: PropTypes.func,
    }

    constructor(props) {
        super(props);
    }

    renderItem(index, item) {
        return (
            <TouchableHighlight onPress={() => this.props.onItemDidSelect(index, item)}>
                <View>
                    <ItemCell item={item} />
                </View>
            </TouchableHighlight>
        );
    }

    renderLoadingItem(item) {
        return (
            <ActivityIndicator
                animating={true}
                style={styles.loading}
                size="small"
            />
        );
    }

    render() {
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.isRefreshing}
                        onRefresh={() => this.props.onRefresh()}
                    />
                }
                enableEmptySections={true}
                keyExtractor={(item, index) => { return `${item.id}_${index}`; }}
                data={this.props.items}
                renderItem={ data => {
                    if (data.item instanceof Item) {
                        return this.renderItem(data.index, data.item);
                    } else if (data.item instanceof LoadingItem) {
                        return this.renderLoadingItem(data.item);
                    }
                }}
                onEndReached={() => this.props.onEndReached(this.props.page + 1)}
                style={styles.listView}
            />
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: '#FFFFFF',
    },
    loading: {
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 10,
        padding : 15,
        height: 30
    }
});
