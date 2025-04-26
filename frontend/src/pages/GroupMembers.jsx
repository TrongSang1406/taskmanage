import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MemberList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [newMember, setNewMember] = useState("");

  const fetchGroup = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/groups/${id}`);
      setGroup(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.trim()) return toast.error("Email không được để trống");
    try {
      await axios.patch(`http://localhost:3001/groups/${id}`, {
        members: [...group.members, newMember]
      });
      toast.success("Thêm thành viên thành công");
      setNewMember("");
      fetchGroup();
    } catch (error) {
      toast.error("Thêm thành viên thất bại");
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  if (!group) return <div>Đang tải...</div>;

  return (
    <div className="container mt-4">
      <h2>Thành viên của {group.name}</h2>
      <input
        className="form-control mb-2"
        placeholder="Email thành viên mới"
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
      />
      <button className="btn btn-success mb-3" onClick={handleAddMember}>Thêm thành viên</button>
      <ul className="list-group">
        {group.members.sort().map((member, index) => (
          <li key={index} className="list-group-item">{member}</li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>Quay lại Trang chủ</button>
    </div>
  );
};

export default MemberList;