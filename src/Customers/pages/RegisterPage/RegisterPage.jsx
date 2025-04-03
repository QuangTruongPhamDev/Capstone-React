import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../../api/userService";
import { Button, Form, Input, message } from "antd";
import { saveUser } from "../../redux/userSlice";
import registerAnimation from "../../../assets/register_animation.json";
import Lottie from "lottie-react";
import "./index.css";
export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      values.maNhom = "GP01"; // Nhóm mặc định
      await registerUserService(values); // Gọi API đăng ký

      message.success("Đăng ký thành công!"); // Hiển thị thông báo

      // Chuyển hướng đến trang đăng nhập sau 1s
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      message.error(error.response?.data?.content || "Đăng ký thất bại!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center register-container">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-4xl bg-black/30 shadow-lg rounded-2xl p-8">
        {/* Animation */}
        <div className="register-animation w-full md:w-2/3 flex justify-center mb-8 md:mb-0">
          <Lottie
            animationData={registerAnimation}
            className="w-full max-w-md"
          />
        </div>

        {/* Form Register */}
        <div className="register-form w-full md:w-1/3">
          <h2 className="register-title text-2xl font-bold text-white mb-6 text-center">
            Đăng ký tài khoản
          </h2>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="hoTen"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input className="register-input" />
            </Form.Item>

            <Form.Item
              name="taiKhoan"
              label="Tài khoản"
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input className="register-input" />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password className="register-input" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Vui lòng nhập email hợp lệ!",
                },
              ]}
            >
              <Input className="register-input" />
            </Form.Item>

            <Form.Item
              name="soDt"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input className="register-input" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <div className="text-center">
              <Button
                type="link"
                onClick={() => navigate("/login")}
                className="register-link"
              >
                Đã có tài khoản? Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
