import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './Slices/UserSlice';
import mainReducer from './Slices/UserDataSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'userData'], // Add the reducer key(s) you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const UserdataReducer = persistReducer(persistConfig, mainReducer);

const MainrootReducer = combineReducers({
  user: persistedReducer,
  userData: UserdataReducer,
});

export const store = configureStore({
  reducer: MainrootReducer,
});

export const persistor = persistStore(store);
