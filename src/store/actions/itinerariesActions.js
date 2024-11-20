import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItineraries = createAsyncThunk('fetchItineraries', async (cityId) => {

  try {

    const itineraries = await axios.get(`http://localhost:8080/api/itineraries/city/${cityId}`);
    return itineraries.data.response;
  } catch (error) {
    return error;
  }

})