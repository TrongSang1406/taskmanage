import { useNavigate } from "react-router-dom";

const GroupItem = ({ group }) => {
  const navigate = useNavigate();

  const handleViewBoards = () => {
    navigate(`/groups/${group.id}/boards`);
  };

  return (
    <button onClick={handleViewBoards}>Xem bảng</button>
  );
};