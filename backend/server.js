const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Giả dữ liệu ban đầu
let groups = [
  { id: 1, name: "Nhóm Backend", boards: [], members: ["An", "Bình"] },
  { id: 2, name: "Nhóm Frontend", boards: [], members: ["Nam", "Huyền"] },
  { id: 3, name: "Nhóm QA Tester", boards: [], members: ["Minh", "Linh"] }
];

// Lấy danh sách nhóm
app.get('/groups', (req, res) => {
  res.json(groups);
});

// Thêm bảng mới vào nhóm
app.post('/groups/:groupId/boards', (req, res) => {
  const { groupId } = req.params;
  const { boardName } = req.body;

  const group = groups.find(g => g.id === parseInt(groupId));
  if (!group) return res.status(404).json({ message: 'Nhóm không tồn tại' });

  const newBoard = { id: Date.now(), name: boardName };
  group.boards.push(newBoard);

  res.status(201).json(newBoard);
});

// Xem danh sách bảng trong nhóm
app.get('/groups/:groupId/boards', (req, res) => {
  const { groupId } = req.params;
  const group = groups.find(g => g.id === parseInt(groupId));
  if (!group) return res.status(404).json({ message: 'Nhóm không tồn tại' });

  res.json(group.boards);
});

// Xem thành viên trong nhóm
app.get('/groups/:groupId/members', (req, res) => {
  const { groupId } = req.params;
  const group = groups.find(g => g.id === parseInt(groupId));
  if (!group) return res.status(404).json({ message: 'Nhóm không tồn tại' });

  res.json(group.members);
});

// Cập nhật thông tin nhóm
app.put('/groups/:groupId', (req, res) => {
  const { groupId } = req.params;
  const { name } = req.body;

  const group = groups.find(g => g.id === parseInt(groupId));
  if (!group) return res.status(404).json({ message: 'Nhóm không tồn tại' });

  group.name = name || group.name;
  res.json(group);
});

// Start server
app.listen(port, () => {
  console.log(`Backend API đang chạy tại http://localhost:${port}`);
});
