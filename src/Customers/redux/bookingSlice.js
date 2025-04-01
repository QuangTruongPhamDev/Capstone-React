import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRoomDetailService } from "../api/cinemaService";

export const fetchRoomDetail = createAsyncThunk(
  "booking/fetchRoomDetail",
  async (id) => {
    const response = await getRoomDetailService(id); // Gọi service có sẵn
    return response.data.content;
  }
);

const initialState = {
  roomData: null,
  loading: false,
  error: null,
  selectedSeats: [],
};

const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    selectSeat: (state, action) => {
      const seat = action.payload;
      const isSelected = state.selectedSeats.find(
        (s) => s.maGhe === seat.maGhe
      );

      if (isSelected) {
        // Bỏ chọn ghế
        state.selectedSeats = state.selectedSeats.filter(
          (s) => s.maGhe !== seat.maGhe
        );
      } else {
        // Chọn ghế
        state.selectedSeats.push(seat);
      }
    },
    resetSelection: (state) => {
      state.selectedSeats = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.roomData = action.payload;
      })
      .addCase(fetchRoomDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectSeat, resetSelection } = bookingSlice.actions;

export default bookingSlice.reducer;
