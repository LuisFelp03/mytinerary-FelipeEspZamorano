import { configureStore } from '@reduxjs/toolkit';
import itinerariesReducer from './reducer/itinerariesReducer.js';
import citiesReducer from './reducer/citiesReducer';
const store = configureStore({
    reducer: {
        itineraries: itinerariesReducer,
        cities: citiesReducer,
    },
});

export default store;
