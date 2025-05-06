import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const GroupSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");

  const fetchGroup = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/groups/${id}`);
      setGroupName(response.data.name);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateName = async () => {
    if (!groupName.trim()) return;
    try {
      await axios.patch(`http://localhost:3001/groups/${id}`, { name: groupName });
      toast.success("Cập nhật tên nhóm thành công");
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleDeleteGroup = async () => {
    if (window.confirm("Bạn chắc chắn muốn xóa nhóm này?")) {
      try {
        await axios.delete(`http://localhost:3001/groups/${id}`);
        toast.success("Xóa nhóm thành công");
        navigate("/");
      } catch (error) {
        toast.error("Xóa thất bại");
      }
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Cài đặt nhóm</h2>
      <input
        className="form-control mb-2"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button className="btn btn-primary mb-3" onClick={handleUpdateName}>Cập nhật tên</button>
      <br />
      <button className="btn btn-danger" onClick={handleDeleteGroup}>Xóa nhóm</button>
      <br />
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>Quay lại Trang chủ</button>
    </div>
  );
};

export default GroupSettings;