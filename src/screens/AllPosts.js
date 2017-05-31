'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems } from '../actions';
import { ItemList } from '../components';

class AllPosts extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(getItems(1));
    }

    onItemDidSelect(index, item) {
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
            <ItemList
                items={this.props.items}
                page={this.props.page}
                isRefreshing={this.props.isLoading && this.props.page <= 1}
                onRefresh={() => this.onRefresh()}
                onItemDidSelect={(index, item) => this.onItemDidSelect(index, item)}
                onEndReached={(nextPage) => this.onEndReached(nextPage)}
             />
        );
  }
}

const mapStateToProps = (state) => {
    return {
        items: state.stream.items,
        page: state.stream.page,
        isLoading: state.stream.isLoading,
    };
}

export default connect(mapStateToProps)(AllPosts);
