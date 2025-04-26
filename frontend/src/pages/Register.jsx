import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = () => {
    let validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email không được để trống";
    }

    if (!formData.password) {
      validationErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!formData.passwordConfirm) {
      validationErrors.passwordConfirm = "Mật khẩu xác nhận không được để trống";
    } else if (formData.password !== formData.passwordConfirm) {
      validationErrors.passwordConfirm = "Mật khẩu xác nhận không khớp";
    }

    if (!formData.gender) {
      validationErrors.gender = "Vui lòng chọn giới tính";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const newUser = {
        email: formData.email,
        password: formData.password,
        gender: formData.gender
      };
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      alert('Đăng ký thành công! Mời bạn đăng nhập.');
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row border rounded shadow p-4">
        {/* Đăng nhập */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-4">THÔNG TIN ĐĂNG KÝ</h2>
          <div className="mb-3">
            <label className="form-label text-danger">* Họ tên</label>
            <input type="text" className="form-control" placeholder="Họ tên"/>
          </div>
          <div className="mb-3">
            <label className="form-label text-danger">* Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword1"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            <label className="form-check-label" htmlFor="showPassword1">Hiển thị mật khẩu</label>
          </div>
          <div className="mb-3">
            <label className="form-label text-danger">* Ngày sinh</label>
            <input type="date" className="form-control"/>
          </div>
          <div className="mb-3">
            <label className="form-label text-danger">* Số điện thoại</label>
            <input type="tel" className="form-control" placeholder="Số điện thoại"/>
          </div>
        </div>

        {/* Đăng ký */}
        <div className="col-md-6 bg-primary text-white p-4 rounded">
          <h2 className="fw-bold mb-4">ĐĂNG KÝ</h2>
          <div className="mb-3">
            <label className="form-label text-warning">* Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-warning mt-1">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label text-warning">* Xác nhận lại mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              name="passwordConfirm"
              className="form-control"
              placeholder="Xác nhận lại mật khẩu"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
            {errors.passwordConfirm && <div className="text-warning mt-1">{errors.passwordConfirm}</div>}
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword2"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            <label className="form-check-label" htmlFor="showPassword2">Hiển thị mật khẩu</label>
          </div>
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Giới tính</option>
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
              <option value="khac">Khác</option>
            </select>
            {errors.gender && <div className="text-warning mt-1">{errors.gender}</div>}
          </div>
          <div className="d-grid mt-4">
            <button className="btn btn-light text-primary fw-bold" onClick={handleRegister}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}