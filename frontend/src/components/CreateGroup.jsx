import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupType, setGroupType] = useState('');
  const [groupPermission, setGroupPermission] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!groupName.trim()) newErrors.groupName = 'Tên nhóm là bắt buộc.';
    if (!groupType.trim()) newErrors.groupType = 'Loại nhóm là bắt buộc.';
    if (!groupPermission.trim()) newErrors.groupPermission = 'Quyền là bắt buộc.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    const newGroup = {
      name: groupName,
      type: groupType,
      permission: groupPermission,
      description,
      admin: 'current_user_id' // Thay bằng ID người dùng hiện tại
    };

    try {
      await axios.post('http://localhost:3001/groups', newGroup);
      toast.success('Tạo nhóm thành công!');
      navigate('/'); // Điều hướng đến danh sách nhóm
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tạo nhóm.');
      console.error('Error creating group:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Tạo Nhóm Mới</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="groupName" className="mb-3">
          <Form.Label>Tên nhóm *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên nhóm"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            isInvalid={!!errors.groupName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.groupName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="groupType" className="mb-3">
          <Form.Label>Loại nhóm *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập loại nhóm"
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            isInvalid={!!errors.groupType}
          />
          <Form.Control.Feedback type="invalid">
            {errors.groupType}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="groupPermission" className="mb-3">
          <Form.Label>Quyền *</Form.Label>
          <Form.Select
            value={groupPermission}
            onChange={(e) => setGroupPermission(e.target.value)}
            isInvalid={!!errors.groupPermission}
          >
            <option value="">-- Chọn quyền --</option>
            <option value="public">Công khai</option>
            <option value="private">Riêng tư</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.groupPermission}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập mô tả (tùy chọn)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Tạo nhóm
        </Button>
      </Form>
    </div>
  );
};

export default CreateGroup;
