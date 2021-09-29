import {applyMiddleware, createStore} from 'redux';
import persistedReducer from '../reducers/persistReducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);


