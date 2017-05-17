import React, {
    PropTypes,
} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

const propTypes = {
    selected: PropTypes.bool,
    title: PropTypes.string
};

const TabIcon = (props) => {
    const icon = (() => {
        if (props.name == "allPosts") {
            return props.selected ? require(`../../images/stream_selected.png`) : require(`../../images/stream.png`);
        } else {
            return props.selected ? require(`../../images/person_selected.png`) : require(`../../images/person.png`);
        }
    })()
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={icon} />
            <Text style={props.selected ? styles.textSelected : styles.text}>
                {props.title}
            </Text>
        </View>
    )
};

TabIcon.propTypes = propTypes;

export default TabIcon;

const styles = StyleSheet.create({
    navigator: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 9,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#656565',
    },
    textSelected: {
        fontSize: 9,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#5BB12D',
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        borderRadius: 0
    }
});
