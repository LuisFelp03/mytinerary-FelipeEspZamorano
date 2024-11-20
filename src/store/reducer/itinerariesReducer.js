import { createReducer } from "@reduxjs/toolkit";
import { fetchItineraries } from "../actions/itinerariesActions";

const initialState = {
  loading: false,
  itineraries: [],
  error: '',
};


const itinerariesReducer = createReducer(initialState, ((builder) => {
  builder.addCase(fetchItineraries.pending, (state) => {
    state.loading = true;
  })
    .addCase(fetchItineraries.fulfilled, (state, action) => {
      state.loading = false;
      state.itineraries = action.payload;
      state.error = '';
    })
    .addCase(fetchItineraries.rejected, (state, action) => {
      state.loading = false;
      state.itineraries = [];
      state.error = action.error;
    });

}))

export default itinerariesReducer