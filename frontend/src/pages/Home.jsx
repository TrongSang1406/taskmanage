import React, { useState, useEffect } from "react";
import axios from "axios";
import LeftSidebar from "../components/LeftSidebar";
import GroupBoards from "./GroupBoards";
import GroupMembers from "./GroupMembers";

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [view, setView] = useState("home");

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3001/groups");
      const sortedGroups = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setGroups(sortedGroups);
    } catch (error) {
      console.error("Lỗi lấy nhóm:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleViewBoards = (group) => {
    setSelectedGroup(group);
    setView("boards");
  };

  const handleViewMembers = (group) => {
    setSelectedGroup(group);
    setView("members");
  };

  const handleBack = () => {
    setView("home");
    setSelectedGroup(null);
  };

  return (
    <div className="d-flex">
      <LeftSidebar reloadGroups={fetchGroups} />
      <div className="flex-grow-1 p-4" style={{ marginLeft: "270px" }}>
        {view === "home" && (
          <>
            <h2 className="text-primary">Danh sách Nhóm</h2>
            <div className="row">
              {groups.map((group) => (
                <div key={group.id} className="col-md-4 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body text-center">
                      <h5 className="card-title">{group.name}</h5>
                      <button className="btn btn-primary w-100 my-2">Tạo bảng mới</button>
                      <button
                        className="btn btn-info w-100 my-2 text-white"
                        onClick={() => handleViewBoards(group)}
                      >
                        Xem danh sách bảng
                      </button>
                      <button
                        className="btn btn-cyan w-100 my-2"
                        style={{ backgroundColor: "#17c1e8", color: "white" }}
                        onClick={() => handleViewMembers(group)}
                      >
                        Xem thành viên
                      </button>
                      <button className="btn btn-warning w-100 my-2">Cài đặt nhóm</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "boards" && selectedGroup && (
          <div>
            <button className="btn btn-secondary mb-3" onClick={handleBack}>
              ← Quay lại
            </button>
            <GroupBoards group={selectedGroup} />
          </div>
        )}

        {view === "members" && selectedGroup && (
          <div>
            <button className="btn btn-secondary mb-3" onClick={handleBack}>
              ← Quay lại
            </button>
            <GroupMembers group={selectedGroup} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;