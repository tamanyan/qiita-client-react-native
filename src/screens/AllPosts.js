'use strict';

import React, { Component } from 'react';
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

    onItemDidSelect(index, item) {
        console.log(index, item);
        this.props.navigator.push({
            screen: 'qiita.Item',
            passProps: {
                url: item.url
            }
        })
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
                onItemDidSelect={(index, item) => this.onItemDidSelect(index, item)}
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

export default connect(mapStateToProps)(AllPosts);
