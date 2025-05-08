import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function GroupMember() {
  const { groupId } = useParams();
  const [members, setMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin nhóm
        const groupRes = await axios.get(`http://localhost:3001/groups/${groupId}`);
        setGroupName(groupRes.data.name);

        // Lấy danh sách thành viên
        const membersRes = await axios.get(`http://localhost:3001/members?groupId=${groupId}`);
        setMembers(membersRes.data);
      } catch (error) {
        console.error("Lỗi khi tải thành viên:", error);
        toast.error("Không thể tải danh sách thành viên.");
      }
    };

    fetchData();
  }, [groupId]);

  return (
    <div className="container mt-4">
      <h3>Thành viên của nhóm: <strong>{groupName}</strong></h3>
      {members.length === 0 ? (
        <p>Không có thành viên nào trong nhóm này.</p>
      ) : (
        <ul className="list-group mt-3">
          {members.map((member) => (
            <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
              {member.name}
              <span className="badge bg-primary rounded-pill">{member.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}