import { useState } from "react";

export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDeadline, setNewDeadline] = useState(task.deadline || "");
  const [newTags, setNewTags] = useState(task.tags?.join(", ") || "");

  const handleSave = () => {
    onEdit(task.id, newTitle, newDeadline, newTags.split(",").map(tag => tag.trim()).filter(tag => tag));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setNewDeadline(task.deadline || "");
    setNewTags(task.tags?.join(", ") || "");
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            placeholder="Deadline"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Lưu
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div>
              <h2 className={`text-xl font-semibold ${task.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h2>
              {task.deadline && (
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Deadline:</span> {task.deadline}
                </p>
              )}
              {task.tags && task.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {task.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggle(task.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
            >
              Xóa
            </button>
          </div>
        </>
      )}
    </div>
  );
}