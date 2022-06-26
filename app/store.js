import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import authReducer from '../features/auth/authSlice';
import notesReducer from '../features/notes/notesSlice'
import storage from 'redux-persist/lib/storage' //localStorage

const rootReducer = combineReducers({
    notes: notesReducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['notes']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store)
