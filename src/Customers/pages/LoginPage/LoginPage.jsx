import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import loginAnimation from "../../../assets/Animation - 1743332484387.json";
import { useDispatch } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { loginService } from "../../api/userService";
import { setUserAction } from "../../redux/userSlice";
import toast from "react-hot-toast";
import Lottie from "lottie-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    loginService(user)
      .then((res) => {
        const user = res.data.content;
        dispatch(setUserAction(user));
        localStorage.setItem("USER", JSON.stringify(user));
        navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        {/* Animation */}
        <div className="w-full md:w-2/3 flex justify-center">
          <Lottie animationData={loginAnimation} className="w-full max-w-md" />
        </div>

        {/* Form Login */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-all"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
