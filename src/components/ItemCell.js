'use strict';

import React, { Component, PropTypes } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import Item from '../models/Item';
import {
     MAIN_TEXT_COLOR,
     SUB_TEXT_COLOR,
     DEFAULT_PADDING,
     SMALL_PADDING,
     SMALL_MARGIN,
     EXTRA_SMALL_MARGIN,
} from '../appearance';

export class ItemCell extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image
                        source={{ uri: item.user.profileImageUrl }}
                        style={styles.thumbnail} />
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
