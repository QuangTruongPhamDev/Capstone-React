import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import loginAnimation from "../../../assets/Animation - 1743332484387.json";
import { useDispatch } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { loginService } from "../../api/userService";
import { setUserAction } from "../../redux/userSlice";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import "./index.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    loginService(user)
      .then((res) => {
        const user = res.data.content;
        dispatch(setUserAction(user));
        localStorage.setItem("USER", JSON.stringify(user));

        // Kiểm tra quyền và điều hướng
        if (user.maLoaiNguoiDung === "QuanTri") {
          navigate("/AdminPage");
        } else {
          navigate("/");
        }

        toast.success("Đăng nhập thành công!");
      })
      .catch(() => {
        toast.error(
          "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập!"
        );
      });
  };

  const onFinish = (values) => handleLogin(values);
  return (
    <div className="login-page">
      <div
        className="min-h-screen flex items-center justify-center bg-gray-900 p-4"
        style={{
          backgroundImage: "url('/images/background_app.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
          {/* Animation */}
          <div className="w-full md:w-2/3 flex justify-center">
            <Lottie
              animationData={loginAnimation}
              className="w-full max-w-md"
            />
          </div>

          {/* Form Login */}
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">
              Đăng nhập
            </h2>
            <Form
              name="loginForm"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                taiKhoan: "",
                matKhau: "",
              }}
            >
              <Form.Item
                label="Tài khoản"
                name="taiKhoan"
                rules={[
                  { required: true, message: "Tài khoản không được bỏ trống" },
                ]}
              >
                <Input className="w-full py-2 px-4 border border-gray-300 rounded-lg" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="matKhau"
                rules={[
                  { required: true, message: "Mật khẩu không được bỏ trống" },
                ]}
              >
                <Input.Password className="w-full py-2 px-4 border border-gray-300 rounded-lg" />
              </Form.Item>

              {/* Nút Đăng nhập */}
              <Form.Item className="w-full">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-orange-500 hover:bg-orange-700 text-white py-2 rounded-lg transition-all"
                >
                  Đăng nhập
                </Button>
              </Form.Item>

              {/* Nút Đăng ký với câu hỏi "Đã có tài khoản?" */}
              <div className="text-center mt-4">
                <Button
                  type="link"
                  onClick={() => navigate("/register")}
                  className="text-orange-500 hover:text-orange-700"
                >
                  Đã có tài khoản? Đăng ký
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
