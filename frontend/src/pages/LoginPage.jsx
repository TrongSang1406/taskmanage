import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }

    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu');
      return;
    }

    try {
      setLoading(true);

      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = storedUsers.find(u => u.email === username && u.password === password);

      if (!user) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }

      if (rememberMe) {
        localStorage.setItem('authToken', 'dummy-token');
      } else {
        sessionStorage.setItem('authToken', 'dummy-token');
      }

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/boards');

    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi đăng nhập');
      console.error('Lỗi đăng nhập:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <div className="logo">
          <span className="logo-icon">TM</span>
          <span className="logo-text">Task Management</span>
        </div>

        <h1>Quản lý công việc hiệu quả</h1>
        <ul className="feature-list">
          <li>Giúp bạn quản lý nhiều dự án cùng lúc</li>
          <li>Dễ dàng phân công và theo dõi tiến độ công việc</li>
          <li>Theo dõi và thông báo khi đến thời hạn công việc</li>
        </ul>
      </div>

      <div className="login-right-panel">
        <div className="login-form-container">
          <div className="login-header">
            <h2>Đăng Nhập</h2>
            <p>Vui lòng đăng nhập để tiếp tục</p>
          </div>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập (Email)</label>
              <input 
                type="text"
                id="username"
                className="form-input"
                placeholder="Nhập email đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-input"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-option">
                <input 
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>

              <button 
                type="button"
                className="forgot-password-link"
                onClick={handleForgotPassword}
                disabled={loading}
              >
                Quên mật khẩu?
              </button>
            </div>

            <button 
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-text">
                  <span className="loader"></span> Đang xử lý...
                </span>
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>

          <div className="register-option">
            <span>Chưa có tài khoản? </span>
            <button 
              type="button"
              className="register-link"
              onClick={handleRegister}
              disabled={loading}
            >
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;