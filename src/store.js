'use strict';

import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

const logger = createLogger({
    collapsed: true,
    duration: true,
    predicate: (getState, action) => __DEV__
});

const configureStore = () => {
    const enhancer = compose(
        applyMiddleware(thunk, logger)
    );

    const store = createStore(reducers, enhancer);

    return store;
}

const store = configureStore();

export default store;