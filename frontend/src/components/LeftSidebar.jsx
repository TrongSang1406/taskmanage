import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaPen, FaTrash, FaCheck } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";

const LeftSidebar = ({ onGroupSelect, selectedGroupId }) => {
  const [groups, setGroups] = useState([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editingGroupName, setEditingGroupName] = useState("");

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3001/groups");
      setGroups(response.data);
    } catch (error) {
      toast.error("Lỗi tải danh sách nhóm!");
      console.error(error);
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.warn("Tên nhóm không được để trống!");
      return;
    }
    try {
      await axios.post("http://localhost:3001/groups", { name: newGroupName });
      setNewGroupName("");
      fetchGroups();
      toast.success("Tạo nhóm thành công!");
    } catch (error) {
      toast.error("Lỗi khi tạo nhóm!");
      console.error(error);
    }
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
      await axios.patch(`http://localhost:3001/groups/${groupId}`, { name: editingGroupName });
      setEditingGroupId(null);
      setEditingGroupName("");
      fetchGroups();
      toast.success("Cập nhật nhóm thành công!");
    } catch (error) {
      toast.error("Lỗi khi cập nhật nhóm!");
      console.error(error);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      // Xóa boards liên quan
      const boards = await axios.get(`http://localhost:3001/boards?groupId=${groupId}`);
      for (const board of boards.data) {
        await axios.delete(`http://localhost:3001/boards/${board.id}`);
      }

      // Xóa members liên quan
      const members = await axios.get(`http://localhost:3001/members?groupId=${groupId}`);
      for (const member of members.data) {
        await axios.delete(`http://localhost:3001/members/${member.id}`);
      }

      // Xóa group
      await axios.delete(`http://localhost:3001/groups/${groupId}`);
      fetchGroups();
      toast.success("Xóa nhóm và dữ liệu liên quan thành công!");
    } catch (error) {
      toast.error("Lỗi khi xóa nhóm!");
      console.error(error);
    }
  };

  return (
    <div style={{ width: "250px", height: "100vh", overflowY: "auto", backgroundColor: "#f8f9fa", padding: "10px", position: "fixed", left: 0, top: 0 }}>
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
            cursor: "pointer",
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

      <Form.Control
        placeholder="Tên nhóm mới"
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
      />
      <Button className="w-100 mt-2" variant="primary" onClick={handleCreateGroup}>
        + Tạo nhóm
      </Button>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default LeftSidebar;