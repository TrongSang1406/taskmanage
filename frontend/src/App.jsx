import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoardsPage from "./pages/BoardsPage";
import LoginPage from './pages/LoginPage';
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Home from "./pages/Home"
import GroupSettings from "./pages/GroupSettings";
import ChangePassword from "./pages/ChangePassword"
import ProfilePage from "./pages/ProfilePage";
import GroupBoards from './pages/GroupBoards';
import GroupMembers from './pages/GroupMembers';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateGroup from './components/CreateGroup';


export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        <Route path="/groups/:groupId/boards" element={<GroupBoards />} />
        <Route path="/groups/:groupId/members" element={<GroupMembers />} />
        <Route path="/groups/:groupId/settings" element={<GroupSettings />} />
          <Route path="boards" element={<BoardsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/groups/create" element={<CreateGroup />} />

        </Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
