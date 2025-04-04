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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Điều khiển menu cho màn hình nhỏ

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
    <div className="px-5 sm:px-20 flex justify-between items-center h-20 fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="CyberSoft Cinema"
          className="h-24 w-auto max-w-[250px] brightness-125 contrast-300 drop-shadow-md"
        />
      </Link>

      {/* Menu */}
      <nav className="flex sm:space-x-8 space-x-4 text-white font-semibold text-lg hidden sm:flex">
        <button
          onClick={() => handleNavigateAndScroll("list-movie")}
          className="cursor-pointer hover:text-orange-500 transition"
        >
          Lịch chiếu
        </button>
        <button
          onClick={() => handleNavigateAndScroll("cinema-list")}
          className="cursor-pointer hover:text-orange-500 transition"
        >
          Cụm rạp
        </button>
        <button
          onClick={() => handleNavigateAndScroll("download-app")}
          className="cursor-pointer hover:text-orange-500 transition"
        >
          Ứng dụng
        </button>
      </nav>

      {/* Hamburger menu for mobile */}
      <button
        className="sm:hidden text-white text-3xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Dropdown & Avatar inside Hamburger Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 bg-black/40 backdrop-blur-md shadow-md rounded-lg p-4 w-full text-white sm:hidden">
          {/* Các mục menu */}
          <button
            onClick={() => handleNavigateAndScroll("list-movie")}
            className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
          >
            Lịch chiếu
          </button>
          <button
            onClick={() => handleNavigateAndScroll("cinema-list")}
            className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
          >
            Cụm rạp
          </button>
          <button
            onClick={() => handleNavigateAndScroll("download-app")}
            className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
          >
            Ứng dụng
          </button>

          {/* Avatar & Dropdown merged into menu */}
          {user ? (
            <>
              <Link
                to="/profile"
                className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
              >
                Thông tin cá nhân
              </Link>
              <span
                onClick={handleLogout}
                className="block py-2 px-4 rounded cursor-pointer hover:bg-gray-800 hover:text-red-500 transition"
              >
                Logout
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      )}

      {/* Avatar & Dropdown for larger screens */}
      <div className="hidden sm:flex items-center space-x-6 relative">
        <div
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu for small screens
        >
          <img
            src="https://www.svgrepo.com/show/452030/avatar-default.svg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 right-0 bg-black/30 backdrop-blur-md shadow-md rounded-lg p-4 w-48 text-white">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
                >
                  Thông tin cá nhân
                </Link>
                <span
                  onClick={handleLogout}
                  className="block py-2 px-4 rounded cursor-pointer hover:bg-gray-800 hover:text-red-500 transition"
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="block py-2 px-4 rounded hover:bg-gray-800 hover:text-orange-500 transition"
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
