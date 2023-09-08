import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import appReducer from './features/appSlice';
import { bitcoinApi } from './services/app';
import { tradApi } from './services/tradeServices';
import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';
import miningReducer from './features/mining/miningSlice';
import tradeReducer from './features/trade/tradeSlice';
import cryptoReducer from './cryptoSlice';
const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth', 'app'],
};

export const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	[tradApi.reducerPath]: tradApi.reducer,
	[bitcoinApi.reducerPath]: bitcoinApi.reducer,
	app: appReducer,
	auth: authReducer,
	mining: miningReducer,
	trade: tradeReducer,
	crypto: cryptoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware, tradApi.middleware, bitcoinApi.middleware);
	},
});
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
