import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './slices/citySlice';
import itinerariesReducer from '../store/reducer/itinerariesReducer';


const store = configureStore({
    reducer: {
        city: cityReducer,
        itineraries: itinerariesReducer,

    },
});

export default store;

