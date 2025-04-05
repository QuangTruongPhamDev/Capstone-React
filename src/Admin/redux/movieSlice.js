import { createSlice } from "@reduxjs/toolkit";
import { getAdminService } from "../api/adminService";

const initialState = {
    getAdminService: getAdminService
};

const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.getAdminService.push(action.payload);
    },
    deleteMovie: (state, action) => {
      state.getAdminService.filter((movie) => movie.maPhim != action.payload);
    },
  },
});

export const { addMovie, deleteMovie } = movieSlice.actions;

export default movieSlice.reducer;
