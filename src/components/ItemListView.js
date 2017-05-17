import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    FlatList,
    RefreshControl
} from 'react-native';

export class ItemListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    renderItem(item) {
        return (
            <TouchableHighlight onPress={() => this.props.onItemDidSelect(item.kijiId)}>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.tagContainer}>
                            {item.tags.map(tag => {
                                return <Text style={styles.tag}>{tag}</Text>
                            })}
                        </View>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>
                    {(() => {
                        if (item.user !== null)
                            return <Image
                                source={{uri: item.user.profileImageUrl}}
                                style={styles.thumbnail}/>
                    })()}
                </View>
            </TouchableHighlight>
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
                keyExtractor={(item, index) => item.id }
                data={this.props.items}
                renderItem={
                    (data) => {
                        return this.renderItem(data.item);
                    }
                }
                style={styles.listView}
            />
        );
    }
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingTop: 12,
        paddingBottom: 12,
    },
    leftContainer: {
        flex: 1,
        marginLeft: 15,
        marginRight: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        lineHeight: 20,
    },
    tagContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    tag: {
        marginTop: 5,
        fontSize: 10,
        marginRight: 5,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 5,
        paddingRight: 5,
        height: 20,
        color: '#000000',
        backgroundColor: '#E0E0E0',
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        overflow: 'hidden'
    },
    time: {
        fontSize: 12,
        marginTop: 10,
        textAlign: 'left',
        color: '#929292'
    },
    thumbnail: {
        width: 60,
        height: 60,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 3
    },
    listView: {
        backgroundColor: '#FFFFFF',
    },
});
