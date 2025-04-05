import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CheckUser({ children }) {
  const { user } = useSelector((state) => state.userSlice);
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return <div>{children}</div>;
}
