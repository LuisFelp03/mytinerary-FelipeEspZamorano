import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './slices/citySlice';

const store = configureStore({
    reducer: {
        city: cityReducer,
    },
});

export default store;
