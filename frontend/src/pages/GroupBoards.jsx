import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GroupBoards = ({ currentUserId = 1 }) => {
  const { groupId } = useParams();
  const [boards, setBoards] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin thành viên của người dùng trong nhóm
        const memberRes = await axios.get(`http://localhost:3001/members?groupId=${groupId}&userId=${currentUserId}`);
        const userRole = memberRes.data[0]?.role;
        setRole(userRole);

        // Lấy tất cả các bảng thuộc nhóm
        const boardsRes = await axios.get(`http://localhost:3001/boards?groupId=${groupId}`);
        const allBoards = boardsRes.data;

        let visibleBoards = [];

        if (userRole === "Quản trị" || userRole === "Thành viên") {
          visibleBoards = allBoards;
        } else if (userRole === "Khách") {
          visibleBoards = allBoards.filter(board => board.members?.includes(currentUserId));
        } else {
          toast.warning("Bạn không có quyền truy cập bảng của nhóm này.");
        }

        setBoards(visibleBoards);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        toast.error("Lỗi khi tải danh sách bảng.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId, currentUserId]);

  if (loading) return <p>Đang tải bảng...</p>;

  return (
    <div className="container mt-4">
      <h3>Danh sách bảng của nhóm</h3>
      {boards.length === 0 ? (
        <p>Không có bảng để hiển thị hoặc bạn không có quyền xem bảng trong nhóm này.</p>
      ) : (
        <div className="row">
          {boards.map(board => (
            <div key={board.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{board.name}</h5>
                  <p className="card-text">Bảng thuộc nhóm #{groupId}</p>
                  <button className="btn btn-primary w-100" onClick={() => window.location.href = `/boards/${board.id}`}>
                    Xem bảng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupBoards;
