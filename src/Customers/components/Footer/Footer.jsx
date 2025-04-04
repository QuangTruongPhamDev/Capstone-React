import React, { useEffect, useState } from "react";
import { getListCinemaService } from "../../api/cinemaService";
import logo from "/images/logo_3.png"; // Đường dẫn đến logo của bạn

export default function Footer() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    getListCinemaService()
      .then((res) => {
        const data = res.data.content || [];
        setPartners(data);
      })
      .catch((err) => {
        console.error("Error fetching cinema systems:", err);
      });
  }, []);
  return (
    <footer className="bg-gray-900 text-white p-6">
      {/* Nội dung chính của Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Phần TIX */}
        <div className="flex flex-col items-center">
          <h4 className="font-bold text-lg mb-3">CYBERSOFT</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQ
              </a>
            </li>
            <li>
              <a
                href="/brand-guidelines"
                className="hover:text-white transition"
              >
                Brand Guidelines
              </a>
            </li>
            <li>
              <a href="/tos" className="hover:text-white transition">
                Thỏa thuận sử dụng
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition">
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>

        {/* Phần Đối Tác */}
        <div className="flex flex-col items-center">
          <h4 className="font-bold text-lg mb-3">ĐỐI TÁC</h4>
          <div className="grid grid-cols-4 gap-4">
            {partners.length > 0 ? (
              partners.slice(0, 8).map(
                (
                  partner // Hiển thị tối đa 8 logo
                ) => (
                  <img
                    key={partner.maHeThongRap}
                    src={partner.logo}
                    alt={partner.tenHeThongRap}
                    className="w-12 h-12 rounded-md transition hover:scale-110"
                  />
                )
              )
            ) : (
              <p className="text-gray-400 col-span-4">Đang tải...</p>
            )}
          </div>
        </div>

        {/* Phần Mobile App */}
        <div className="flex flex-col items-center">
          <h4 className="font-bold text-lg mb-3">MOBILE APP</h4>
          <div className="flex gap-4">
            <a href="/download-ios" className="hover:scale-110 transition">
              <img src="/images/ios_icon.png" alt="iOS" className="w-8 h-8" />
            </a>
            <a href="/download-android" className="hover:scale-110 transition">
              <img
                src="/images/android_icon.png"
                alt="Android"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>

        {/* Phần Social */}
        <div className="flex flex-col items-center">
          <h4 className="font-bold text-lg mb-3">SOCIAL</h4>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              className="hover:scale-110 transition"
            >
              <img
                src="/images/facebook_icon.pn"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href="https://zalo.me" className="hover:scale-110 transition">
              <img src="/images/zalo_icon.png" alt="Zalo" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Đường kẻ ngang */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Căn giữa logo và thông tin liên hệ trên cùng một hàng */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center gap-6">
          {/* Logo */}
          <img src={logo} alt="Logo" className="w-32" />

          {/* Thông tin liên hệ */}
          <div className="text-gray-400 text-left">
            <p>Địa chỉ: 123 Đường ABC, Quận X, TP. XYZ</p>
            <p>Điện thoại: 0123-456-789</p>
            <p>Email: support@cybersoft.vn</p>
          </div>
        </div>

        {/* Dòng Copyright */}
        <p className="text-gray-500 text-sm text-center">
          © 2025 Cybersoft. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
