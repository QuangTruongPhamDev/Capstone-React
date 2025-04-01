import { createSlice } from "@reduxjs/toolkit";

let userData = null;
try {
  const userJson = localStorage.getItem("USER");
  userData = JSON.parse(userJson) || null; // Đảm bảo dữ liệu hợp lệ
} catch (error) {
  console.error("Error parsing user data:", error);
}

const initialState = {
  user: userData,
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
      localStorage.removeItem("USER"); // Xóa dữ liệu khi logout
    },
    saveUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserAction, logoutAction, saveUser } = userSlice.actions;

export default userSlice.reducer;
