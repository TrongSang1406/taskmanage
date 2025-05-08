import { useNavigate } from "react-router-dom";

const GroupItem = ({ group }) => {
  const navigate = useNavigate();

  const handleViewBoards = () => {
    navigate(`/groups/${group.id}/boards`);
  };
  const handleViewMembers = () => {
    navigate(`/groups/${group.id}/members`);
  };

  return (
    <button onClick={handleViewBoards}>Xem bảng</button>
  );
};