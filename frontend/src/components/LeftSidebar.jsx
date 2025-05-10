import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const LeftSidebar = ({ onGroupSelect, selectedGroupId }) => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingGroupName, setEditingGroupName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3001/groups");
      setGroups(response.data);
    } catch (error) {
      toast.error("Lỗi tải danh sách nhóm!");
      console.error("Lỗi tải danh sách nhóm:", error);
    }
  };

  const handleCreateGroup = () => {
    navigate('/groups/create');
  };

  const handleEditGroup = (group) => {
    setEditingGroupId(group.id);
    setEditingGroupName(group.name);
  };

  const handleUpdateGroup = async (groupId) => {
    if (!editingGroupName.trim()) {
      toast.warn("Tên nhóm không được để trống!");
      return;
    }
    try {
      await axios.patch(`http://localhost:3001/groups/${groupId}`, {
        name: editingGroupName
      });
      setEditingGroupId(null);
      setEditingGroupName("");
      fetchGroups();
      toast.success("Cập nhật nhóm thành công!");
    } catch (error) {
      toast.error("Lỗi khi cập nhật nhóm!");
      console.error("Lỗi cập nhật nhóm:", error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa nhóm này và toàn bộ dữ liệu liên quan?"
    );
    if (!confirmDelete) return;

    try {
      const boardsRes = await axios.get(`http://localhost:3001/boards?groupId=${groupId}`);
      for (const board of boardsRes.data) {
        await axios.delete(`http://localhost:3001/boards/${board.id}`);
      }

      const membersRes = await axios.get(`http://localhost:3001/members?groupId=${groupId}`);
      for (const member of membersRes.data) {
        await axios.delete(`http://localhost:3001/members/${member.id}`);
      }

      await axios.delete(`http://localhost:3001/groups/${groupId}`);
      fetchGroups();
      toast.success("Xóa nhóm và dữ liệu liên quan thành công!");
    } catch (error) {
      toast.error("Lỗi khi xóa nhóm!");
      console.error("Lỗi khi xóa nhóm:", error);
    }
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#f8f9fa",
        padding: "10px",
        position: "fixed",
        left: 0,
        top: "56px", // đẩy xuống dưới TopMenu
        zIndex: 1000 // đảm bảo hiển thị đúng lớp
      }}
    >
      <h5 className="text-center">Danh Sách Nhóm</h5>

      {groups.map((group) => (
        <div
          key={group.id}
          onClick={() => onGroupSelect(group.id)}
          style={{
            border: selectedGroupId === group.id ? "2px solid #007bff" : "1px solid #ccc",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "10px",
            backgroundColor: "#fff",
            cursor: "pointer"
          }}
        >
          {editingGroupId === group.id ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Control
                value={editingGroupName}
                onChange={(e) => setEditingGroupName(e.target.value)}
                size="sm"
              />
              <Button
                variant="success"
                size="sm"
                style={{ marginLeft: "5px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateGroup(group.id);
                }}
              >
                <FaCheck />
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span>{group.name}</span>
              <div>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditGroup(group);
                  }}
                >
                  <FaPen />
                </Button>
                <Button
                  variant="link"
                  size="sm"
                  className="text-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGroup(group.id);
                  }}
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
      <Button className="w-100 mt-2" variant="primary" onClick={handleCreateGroup}>
        + Tạo nhóm
      </Button>
    </div>
  );
};

export default LeftSidebar;