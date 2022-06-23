import {
    configureStore,
} from '@reduxjs/toolkit';
import notesReducer from '../features/notes/notesSlice'

export const store = configureStore({
    reducer: {
        notes: notesReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
