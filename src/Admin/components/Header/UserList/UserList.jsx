import React, { useState } from "react";
import "./index.css";

export default function UserList() {

    const [useList, setUseList] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const [form, setForm] = useState({
        taiKhoan: "",
        hoTen: "",
        email: "",
        soDT: "",
        maLoaiNguoiDung: "KhachHang",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleAddUser = (e) => {
        e.preventDefault();

        if (isEditing) {
            const updatedList = [...useList];
            updatedList[editingIndex] = form;
            setUseList(updatedList);
            setIsEditing(false);
            setEditingIndex(null);
          } else {
            setUseList([...useList, form]);
          }

        setForm({
          taiKhoan: "",
          hoTen: "",
          email: "",
          soDT: "",
          maLoaiNguoiDung: "KhachHang",
        });
        setShowForm(false);
      };

      const handleEditUser = (index) => {
        setForm(useList[index]);
        setIsEditing(true);
        setEditingIndex(index);
        setShowForm(true);
      };

      const handleDeleteUser = (index) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
          const newList = [...useList];
          newList.splice(index, 1);
          setUseList(newList);
        }
      };

    const filteredUser = useList.filter((userlist) =>
        userlist.taiKhoan.toLowerCase().includes(searchUser.toLowerCase())
    );

    return (
        <div className="user-body">
      <div className="user-container">
        <h1 className="user-h1">Quản Lý Người Dùng</h1>

        <div className="user-header">
          <div className="user-search-box">
            <input
              className="user-input"
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
          </div>
          <button
            className="user-add-btn"
            onClick={() => {
              setShowForm(!showForm);
              setForm({
                taiKhoan: "",
                hoTen: "",
                email: "",
                soDT: "",
                maLoaiNguoiDung: "KhachHang",
              });
              setIsEditing(false);
            }}
          >
            + Thêm người dùng
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAddUser}
            className="user-form space-y-2 p-4 border rounded mb-6"
          >
            <input
              type="text"
              name="taiKhoan"
              placeholder="Tài khoản"
              value={form.taiKhoan}
              onChange={handleChange}
              required
              className="user-input"
            />
            <input
              type="text"
              name="hoTen"
              placeholder="Họ tên"
              value={form.hoTen}
              onChange={handleChange}
              required
              className="user-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="user-input"
            />
            <input
              type="text"
              name="soDT"
              placeholder="Số điện thoại"
              value={form.soDT}
              onChange={handleChange}
              required
              className="user-input"
            />
            <select
              name="maLoaiNguoiDung"
              value={form.maLoaiNguoiDung}
              onChange={handleChange}
              className="user-input"
            >
              <option value="KhachHang">Khách hàng</option>
              <option value="QuanTri">Quản trị</option>
            </select>
            <button
              type="submit"
              className="user-action-btn bg-green-500 text-white p-2 rounded"
            >
              {isEditing ? "Cập nhật" : "Thêm"}
            </button>
          </form>
        )}

        <table className="user-table">
          <thead>
            <tr>
              <th className="user-th">Tài khoản</th>
              <th className="user-th">Họ tên</th>
              <th className="user-th">Email</th>
              <th className="user-th">Số điện thoại</th>
              <th className="user-th">Loại người dùng</th>
              <th className="user-th">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser.map((userlist, index) => (
              <tr key={userlist.taiKhoan}>
                <td className="user-td">{userlist.taiKhoan}</td>
                <td className="user-td">{userlist.hoTen}</td>
                <td className="user-td">{userlist.email}</td>
                <td className="user-td">{userlist.soDT}</td>
                <td className="user-td">{userlist.maLoaiNguoiDung}</td>
                <td className="user-td">
                  <button
                    className="user-action-btn user-edit-btn"
                    onClick={() => handleEditUser(index)}
                  >
                    Sửa
                  </button>
                  <button
                    className="user-action-btn user-delete-btn bg-red-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleDeleteUser(index)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUser.length === 0 && (
          <p className="no-results">Không tìm thấy người dùng phù hợp</p>
        )}
      </div>
    </div>
    );
}
