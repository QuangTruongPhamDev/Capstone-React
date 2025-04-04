import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRoomData = createAsyncThunk(
  "booking/fetchRoomData",
  async (maLichChieu) => {
    const res = await https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    return res.data.content;
  }
);
