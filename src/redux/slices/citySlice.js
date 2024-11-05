import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCities = createAsyncThunk('city/fetchCities', async () => {
    const response = await fetch("http://localhost:8080/api/cities");
    if (!response.ok) {
        throw new Error('Request failed');
    }
    const data = await response.json();
    console.log("Data fetched from API:", data.response);
    return data.response;
});

const citySlice = createSlice({
    name: 'city',
    initialState: {
        cities: [],
        filteredCities: [],
        searchText: '',
        status: 'idle',
        error: null,
        selectedCity: null,
    },
    reducers: {
        setSearchText(state, action) {
            state.searchText = action.payload;
            state.filteredCities = state.cities.filter(city =>
                city.name.toLowerCase().startsWith(state.searchText.toLowerCase())
            );
        },
        selectCity(state, action) {
            const cityId = action.payload; // Esto debería ser solo el `id`
            console.log("City ID from action payload:", cityId); // Confirmar que `cityId` es solo el ID
            console.log("Available City IDs:", state.cities.map(city => city._id));

            state.selectedCity = state.cities.find(city => city._id === cityId) || null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cities = action.payload;
                state.filteredCities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setSearchText, selectCity } = citySlice.actions;
export default citySlice.reducer;
