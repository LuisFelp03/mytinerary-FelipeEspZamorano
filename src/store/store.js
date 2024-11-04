import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './reducer/citiesReducer';
import itinerariesReducer from './reducer/itinerariesReducer';

const store = configureStore({
    reducer: {
        cities: citiesReducer,
        itineraries: itinerariesReducer,
    },
});

export default store;