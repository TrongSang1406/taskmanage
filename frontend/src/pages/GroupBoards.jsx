import React from "react";

const GroupBoards = ({ group }) => {
  return (
    <div>
      <h3>Danh sách bảng của {group.name}</h3>
      {group.boards && group.boards.length > 0 ? (
        <ul className="list-group">
          {group.boards.sort((a, b) => a.name.localeCompare(b.name)).map((board, index) => (
            <li key={index} className="list-group-item">
              {board.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có bảng nào trong nhóm này.</p>
      )}
    </div>
  );
};

export default GroupBoards;
