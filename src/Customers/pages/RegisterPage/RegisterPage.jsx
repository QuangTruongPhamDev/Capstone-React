import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../../api/userService";
import { Button, Form, Input, message } from "antd";
import { saveUser } from "../../redux/userSlice";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Đăng ký tài khoản
        </h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="hoTen"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="taiKhoan"
            label="Tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="matKhau"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
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
            <Input />
          </Form.Item>

          <Form.Item
            name="soDt"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
