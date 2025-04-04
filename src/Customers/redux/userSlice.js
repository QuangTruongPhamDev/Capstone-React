import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfoService } from "../api/userService";

let userData = null;
try {
  const userJson = localStorage.getItem("USER");
  if (userJson) {
    userData = JSON.parse(userJson);
  }
} catch (error) {
  console.error("Error parsing user data:", error);
}

export const fetchBookingHistory = createAsyncThunk(
  "user/fetchBookingHistory",
  async (_, { rejectWithValue }) => {
    try {
      // Gọi hàm getUserInfoService để lấy dữ liệu lịch sử đặt vé
      const bookingHistory = await getUserInfoService();

      // Trả về dữ liệu lịch sử đặt vé
      return bookingHistory; // Đây là dữ liệu lấy từ response.data.content.thongTinDatVe
    } catch (error) {
      // Nếu có lỗi, trả về error với thông báo lỗi
      return rejectWithValue(
        error.response ? error.response.data : "Đã có lỗi xảy ra"
      );
    }
  }
);

const initialState = {
  user: userData,
  bookingHistory: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserAction: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("USER", JSON.stringify(action.payload)); // Đồng bộ dữ liệu
    },
    logoutAction: (state) => {
      state.user = null;
      state.bookingHistory = []; // Xóa lịch sử đặt vé khi logout
      localStorage.removeItem("USER"); // Xóa dữ liệu khi logout
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("USER", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Xử lý fetchBookingHistory
      .addCase(fetchBookingHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingHistory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched booking history:", action.payload);
        state.bookingHistory = action.payload; // Lưu lịch sử đặt vé
      })
      .addCase(fetchBookingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đã có lỗi xảy ra";
      });
  },
});

export const { setUserAction, logoutAction, saveUser, updateUserInfo } =
  userSlice.actions;

export default userSlice.reducer;
