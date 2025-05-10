import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    gender: '',
    fullName: '',
    phone: '',
    birthday: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setFormData({
        email: currentUser.email || '',
        gender: currentUser.gender || '',
        fullName: currentUser.fullName || currentUser.name || '',
        phone: currentUser.phone || '',
        birthday: currentUser.birthday || ''
      });
    } else {
      navigate('/login'); // Nếu chưa đăng nhập, chuyển hướng
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (!currentUser) {
      setMessage('Không tìm thấy người dùng hiện tại.');
      return;
    }

    const updatedUser = { ...currentUser, ...formData };

    const updatedUsers = storedUsers.map(user =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));

    setMessage('Cập nhật thông tin thành công!');

    setTimeout(() => {
      navigate('/boards');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Thông Tin Cá Nhân</h2>

      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label">Email (không thay đổi)</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Họ tên</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ngày sinh</label>
          <input
            type="date"
            name="birthday"
            className="form-control"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Giới tính</label>
          <select
            name="gender"
            className="form-select"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Chọn giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="khac">Khác</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
      </form>
    </div>
  );
}