import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function Template_Booking({ content }) {
  return (
    <div style={{ minHeight: "100vh" }} className="flex flex-col">
      <Header />
      <div className="grow">{content}</div>
    </div>
  );
}
