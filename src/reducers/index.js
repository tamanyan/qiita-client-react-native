import { combineReducers } from 'redux';
import routes from './routes';
import items from './items';

export default combineReducers({
    routes,
    items,
});