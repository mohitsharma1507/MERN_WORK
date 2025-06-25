import React, { useState } from "react";
import axios from "axios";

const TaskCreationForm = ({ projectId, onTaskCreated, onCancel }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [error, setError] = useState("");

  const handleCreateTask = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/tasks`,
        { ...newTask, projectId },
        {
          withCredentials: true,
        }
      );
      onTaskCreated(res.data);
      setNewTask({ title: "", description: "", status: "" });
    } catch (err) {
      console.error("Failed to create task:", err);
      setError("Could not create task");
    }
  };

  return (
    <div className="mb-4">
      <h3>Create a New Task</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="taskTitle" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="taskTitle"
          className="form-control"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="taskDescription" className="form-label">
          Description
        </label>
        <textarea
          id="taskDescription"
          className="form-control"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="taskStatus" className="form-label">
          Status
        </label>
        <select
          id="taskStatus"
          className="form-select"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <button
        className="btn btn-success"
        onClick={handleCreateTask}
        disabled={!newTask.title.trim()}
      >
        Create Task
      </button>
      <button className="btn btn-secondary ms-2" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default TaskCreationForm;
