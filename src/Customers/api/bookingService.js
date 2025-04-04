import { https } from "./config";

export const bookedTicketService = (data) => {
  const url = `/api/QuanLyDatVe/DatVe`;
  return https.post(url, data);
};
