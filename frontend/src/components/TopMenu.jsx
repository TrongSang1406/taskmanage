import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Button, Dropdown } from 'react-bootstrap';

export default function TopMenu({ toggleSidebar }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      sticky="top"
      className="shadow"
      style={{ height: "56px", zIndex: 1040 }} // 👈 đảm bảo chiều cao và nằm trên sidebar
    >
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/public/logo.png"
            alt="Quản Lý Công Việc"
            height="50" // hoặc điều chỉnh lại tùy ý bạn
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topmenu-navbar-nav" />
        <Navbar.Collapse id="topmenu-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang Chủ</Nav.Link>
            <Nav.Link as={Link} to="/boards">Công Việc</Nav.Link>
          </Nav>
          <Nav align="end">
            <Nav.Link as={Link} to="/notification">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
            </Nav.Link>
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="info" id="dropdown-user">
                  {user.fullName || user.name || user.email}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/profile")}>Hồ sơ cá nhân</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger" onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Đăng Nhập</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}