import React from "react";
import { useParams } from "react-router-dom";

const BoardsPage = () => {
  const { groupId } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tạo bảng mới cho nhóm {groupId}</h1>
      <p>Form tạo bảng sẽ đặt ở đây.</p>
    </div>
  );
};

export default BoardsPage;