import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (!currentUser) {
      setError('Không tìm thấy người dùng hiện tại.');
      return;
    }

    const foundUserIndex = storedUsers.findIndex(u => u.email === currentUser.email);

    if (foundUserIndex === -1) {
      setError('Người dùng không tồn tại.');
      return;
    }

    if (storedUsers[foundUserIndex].password !== currentPassword) {
      setError('Mật khẩu cũ không đúng.');
      return;
    }

    // Update password
    storedUsers[foundUserIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(storedUsers));
    localStorage.setItem('user', JSON.stringify(storedUsers[foundUserIndex]));

    setSuccess('Đổi mật khẩu thành công!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    
    // Sau 2s chuyển về dashboard
    setTimeout(() => {
      navigate('/boards');
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Đổi Mật Khẩu</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleChangePassword}>
        <div className="mb-3">
          <label className="form-label">Mật khẩu cũ</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
      </form>
    </div>
  );
}