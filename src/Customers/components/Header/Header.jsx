import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/userSlice";
import logo from "/images/logo_3.png"; // Đường dẫn đến logo của bạn
import { scroller, Link as ScrollLink } from "react-scroll";
export default function Header() {
  // lấy user từ redux
  const { user } = useSelector((state) => {
    return state.userSlice;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrollTarget, setScrollTarget] = useState(null); // Lưu vị trí cần scroll

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Điều hướng về trang chủ trước rồi mới scroll
  const handleNavigateAndScroll = (target) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: true,
          duration: 500,
          offset: -70, // Điều chỉnh vị trí nếu Header che khuất
        });
      }, 300); // Đợi trang chủ load trước khi scroll
    } else {
      scroller.scrollTo(target, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  };

  // Khi URL thay đổi về trang chủ, thực hiện scroll đến vị trí đã lưu
  useEffect(() => {
    if (location.pathname === "/" && scrollTarget) {
      scroller.scrollTo(scrollTarget, {
        smooth: true,
        duration: 500,
        offset: -70,
      });
      setScrollTarget(null); // Reset lại target sau khi scroll xong
    }
  }, [location.pathname, scrollTarget]);

  return (
    <div className="px-20 flex justify-between items-center h-20 fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="CyberSoft Cinema"
          className="h-24 w-auto max-w-[250px] brightness-125 contrast-300 drop-shadow-md"
        />
      </Link>

      {/* Menu */}
      <nav className="flex space-x-8 text-white font-semibold text-lg">
        <button
          onClick={() => handleNavigateAndScroll("list-movie")}
          className="cursor-pointer hover:text-red-500 transition"
        >
          Lịch chiếu
        </button>
        <button
          onClick={() => handleNavigateAndScroll("cinema-list")}
          className="cursor-pointer hover:text-red-500 transition"
        >
          Cụm rạp
        </button>
        <button
          onClick={() => handleNavigateAndScroll("download-app")}
          className="cursor-pointer hover:text-red-500 transition"
        >
          Ứng dụng
        </button>
      </nav>

      {/* Avatar & Dropdown */}
      <div className="flex items-center space-x-6 relative">
        <div
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
          onClick={toggleDropdown}
        >
          <img
            src="https://www.svgrepo.com/show/452030/avatar-default.svg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute top-16 right-0 bg-white shadow-md rounded-lg p-4 w-48">
            {user ? (
              <>
                <Link
                  to="/edit-profile"
                  className="block text-black py-2 hover:text-blue-500"
                >
                  Chỉnh sửa thông tin cá nhân
                </Link>
                <span
                  onClick={handleLogout}
                  className="block text-red-500 py-2 cursor-pointer hover:underline"
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-black py-2 hover:text-blue-500"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="block text-black py-2 hover:text-blue-500"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
