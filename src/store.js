'use strict';

import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';

const configureStore = () => {
    if (__DEV__) {
        const enhancer = composeWithDevTools(
            applyMiddleware(thunk),
            autoRehydrate()
        );
        const store = createStore(reducers, enhancer);
        return store;
    } else {
        const enhancer = compose(
            applyMiddleware(thunk),
            autoRehydrate()
        );
        const store = createStore(reducers, enhancer);
        return store;
    }
}

const store = configureStore();
persistStore(store, {storage: AsyncStorage}).purge();

export default store;
