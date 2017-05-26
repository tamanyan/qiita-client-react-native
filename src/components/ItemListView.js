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
import {
     MAIN_TEXT_COLOR,
     SUB_TEXT_COLOR,
     DEFAULT_PADDING,
     SMALL_PADDING,
     SMALL_MARGIN,
     EXTRA_SMALL_MARGIN,
} from '../appearance';

export class ItemListView extends Component {
    static defaultProps = {
        onItemDidSelect: (id) => {},
        onRefresh: () => { console.log('refresh') },
        onEndReached: (next) => {},
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        page: PropTypes.number.isRequired,
        onItemDidSelect: PropTypes.func,
        onRefresh: PropTypes.func,
        onEndReached: PropTypes.func,
    }

    state = {
        refreshing: false
    }

    constructor(props) {
        super(props);
    }

    renderItem(index, item) {
        return (
            <TouchableHighlight onPress={() => this.props.onItemDidSelect(index, item)}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Image
                            source={{uri: item.user.profileImageUrl}}
                            style={styles.thumbnail}/>
                    </View>
                    <View style={styles.rightContainer}>
                        <View style={styles.userNameContainer}>
                            {(() => {
                                if (item.user.name.length > 0)
                                    return <Text style={styles.userName}>{item.user.name}</Text>;
                            })()}
                            <Text style={styles.userId}>@{item.user.id}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.tagContainer}>
                            {item.tags.map((tag, i) => {
                                return <Text key={`${item.id}_${i}`} style={styles.tag}>{tag}</Text>
                            })}
                        </View>
                    </View>
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

    onRefresh() {
        this.setState({refreshing: true});
    }

    render() {
        return (
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
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
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingTop: SMALL_PADDING,
        paddingBottom: SMALL_PADDING,
        paddingLeft: DEFAULT_PADDING,
        paddingRight: DEFAULT_PADDING,
    },
    leftContainer: {
        marginRight: SMALL_MARGIN
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 3,
    },
    rightContainer: {
        flex: 1
    },
    userNameContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    userName: {
        fontSize: 13,
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold',
        marginRight: EXTRA_SMALL_MARGIN
    },
    userId: {
        fontSize: 11,
        color: SUB_TEXT_COLOR,
        marginRight: EXTRA_SMALL_MARGIN
    },
    title: {
        fontSize: 14,
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: 18,
        marginTop: 3
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: EXTRA_SMALL_MARGIN,
    },
    tag: {
        fontSize: 9,
        color: MAIN_TEXT_COLOR,
        marginRight: 5,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 5,
        paddingRight: 5,
        height: 20,
        backgroundColor: '#E0E0E0',
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        overflow: 'hidden'
    },
    time: {
        fontSize: 11,
        color: SUB_TEXT_COLOR,
        textAlign: 'left',
    },
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
