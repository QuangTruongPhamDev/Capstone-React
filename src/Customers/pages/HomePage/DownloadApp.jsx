import { Carousel } from "antd";
import React from "react";

export default function DownloadApp() {
  // Tạo mảng danh sách hình ảnh
  const slides = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    image: `/images/slide_${index + 1}.jpg`,
    alt: `Slide ${index + 1}`,
  }));
  return (
    <section
      className="relative bg-cover bg-center text-white py-12 px-4"
      style={{ backgroundImage: "url('/images/background_app.jpg')" }}
    >
      {/* Layout hàng ngang */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-10">
        {/* Nội dung bên trái */}
        <div className="text-center sm:text-left max-w-md">
          <h1 className="text-lg sm:text-2xl font-bold mb-4">
            Ứng dụng tiện lợi dành cho người yêu điện ảnh
          </h1>
          <p className="text-sm sm:text-base mb-4">
            Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và
            đổi quà hấp dẫn.
          </p>
          <p className="font-bold text-orange-500 mb-6">
            APP MIỄN PHÍ - TẢI VỀ NGAY!
          </p>
        </div>

        {/* Điện thoại bên phải */}
        <div className="relative w-48 sm:w-56">
          {/* Khung điện thoại */}
          <img
            src="/images/phone_frame.png"
            alt="Phone Frame"
            className="w-full"
          />

          {/* Slider bên trong điện thoại */}
          <div className="absolute top-[3%] left-[5%] w-[90%] h-[92%] overflow-hidden rounded-lg">
            <Carousel autoplay>
              {slides.map((slide) => (
                <div key={slide.id} className="h-full">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
