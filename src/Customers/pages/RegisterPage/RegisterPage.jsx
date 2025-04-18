import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../../api/userService";
import { Button, Form, Input, message } from "antd";
import { saveUser } from "../../redux/userSlice";
import registerAnimation from "../../../assets/register-animation.json";
import Lottie from "lottie-react";
import "./index.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    values.maNhom = "GP01";
    try {
      const response = await registerUserService(values);
      console.log("Đăng ký thành công:", response);

      // Lưu thông tin user vào Redux
      dispatch(saveUser(response.data));

      message.success("Đăng ký thành công!");
      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      setTimeout(() => navigate("/login"), 500); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      console.error("Lỗi đăng ký:", error);

      if (error.response) {
        const errorMessage =
          error.response.data?.content || "Đăng ký thất bại!";
        message.error(errorMessage);
      } else if (error.request) {
        message.error("Không thể kết nối với máy chủ. Vui lòng thử lại!");
      } else {
        message.error("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
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
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
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
              labelCol={{ style: { color: "white" } }}
              rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
            >
              <Input className="register-input" />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              labelCol={{ style: { color: "white" } }}
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password className="register-input" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              labelCol={{ style: { color: "white" } }}
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
              labelCol={{ style: { color: "white" } }}
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
