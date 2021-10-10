import {AsyncStorage} from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import sensitiveReducer from './sensitiveReducer';
import mainReducer from './asyncStorageReducer';

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

const mainPersistConfig = {
  key: 'main',
  storage: AsyncStorage,
  blacklist: ['sensitive'],
};

const authPersistConfig = {
  key: 'sensitive',
  storage: sensitiveStorage,
};

let persistedReducer = combineReducers({
  main: persistReducer(mainPersistConfig, mainReducer),
  sens: persistReducer(authPersistConfig, sensitiveReducer),
});

export default persistedReducer;
