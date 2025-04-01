import Lottie from "lottie-react";
import React from "react";
import loadingAnimation from "../../../assets/loading_2_animation.json";
import loadingTextAnimation from "../../../assets/loading-text.json";
import { useSelector } from "react-redux";

export default function LoadingPage() {
  let { isLoading } = useSelector((state) => state.loadingSlice);
  console.log("isLoading:", isLoading);

  if (!isLoading) return null; // Ẩn khi không cần loading
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <Lottie
        animationData={loadingAnimation}
        style={{ width: "300px", height: "300px" }}
        loop
      />
      <Lottie
        animationData={loadingTextAnimation}
        style={{ width: "500px", height: "200px" }}
        loop
        className="absolute bottom-10"
      />
    </div>
  );
}
