import { Link } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

export default function TopMenu({ toggleSidebar }) {
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="shadow">
      <div className="container-fluid">
        <Button variant="outline-light" className="me-2" onClick={toggleSidebar}>
          ☰
        </Button>
        <Navbar.Brand as={Link} to="/">
          Quản Lý Công Việc
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topmenu-navbar-nav" />
        <Navbar.Collapse id="topmenu-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Trang Chủ</Nav.Link>
            <Nav.Link as={Link} to="/boards">Công Việc</Nav.Link>
          </Nav>
          <Nav align="end">
            <Nav.Link as={Link} to="/notification"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
            </svg></Nav.Link>
            <Nav.Link as={Link} to="/login">Đăng Nhập</Nav.Link>
          </Nav>
          {/* <Dropdown align="end">
            <Dropdown.Toggle variant="info" id="dropdown-user">
              Tài Khoản
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/login">Hồ sơ cá nhân</Dropdown.Item>
              <Dropdown.Item href="#">Cài đặt</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#" className="text-danger">Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
