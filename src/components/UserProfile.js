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

export class UserProfile extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
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

    render() {
        const user = this.props.user;

        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.props.user.profileImageUrl }}
                    style={styles.thumbnail} />
                <View style={styles.userNameContainer}>
                    {(() => {
                        if (user.name.length > 0)
                            return <Text style={styles.userName}>{user.name}</Text>;
                    })()}
                    <Text style={styles.userId}>@{user.id}</Text>
                </View>
                <Text style={styles.description}>{user.description}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.location}>{user.location}</Text>
                    <Text style={styles.organization}>{user.organization}</Text>
                </View>
                <View style={styles.friendsContainer}>
                    <View style={styles.followeesCount}>
                        <Text style={styles.count}>{user.followeesCount}</Text>
                        <Text style={styles.friends}>FOLLOWEES</Text>
                    </View>
                    <View style={styles.followersCount}>
                        <Text style={styles.count}>{user.followeesCount}</Text>
                        <Text style={styles.friends}>FOLLOWERS</Text>
                    </View>
                </View>
                <View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingTop: SMALL_PADDING,
        paddingBottom: SMALL_PADDING,
        paddingLeft: DEFAULT_PADDING,
        paddingRight: DEFAULT_PADDING,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 3,
        marginBottom: SMALL_MARGIN,
    },
    userNameContainer: {
        marginBottom: SMALL_MARGIN,
    },
    userName: {
        fontSize: 13,
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold',
    },
    userId: {
        fontSize: 11,
        color: SUB_TEXT_COLOR,
    },
    description: {
        fontSize: 13,
        color: MAIN_TEXT_COLOR,
        marginBottom: SMALL_MARGIN,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: SMALL_MARGIN,
    },
    location: {
        fontSize: 13,
        color: SUB_TEXT_COLOR,
        marginRight: SMALL_MARGIN
    },
    organization: {
        fontSize: 13,
        color: SUB_TEXT_COLOR,
    },
    friendsContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: SMALL_MARGIN,
    },
    followeesCount: {
        flexDirection: 'row',
        marginRight: SMALL_MARGIN
    },
    followersCount: {
        flexDirection: 'row',
    },
    count: {
        fontSize: 13,
        color: MAIN_TEXT_COLOR,
        marginRight: 3
    },
    friends: {
        fontSize: 13,
        color: SUB_TEXT_COLOR,
    }
});
