import axios from "axios";
import { useEffect, useState } from "react";

const TaskEditForm = ({ taskId, initialTask, onTaskUpdated, onCancel }) => {
  const [task, setTask] = useState(initialTask);
  const [error, setError] = useState("");

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleUpdateTask = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/tasks/${taskId}`,
        task,
        {
          withCredentials: true,
        }
      );
      onTaskUpdated(res.data);
    } catch (error) {
      console.error("Failed to update task:", error);
      setError("Could not update task");
    }
  };

  return (
    <div className="mb-4">
      <h3>Edit Task</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="taskTitle" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="taskTitle"
          className="form-control"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="taskDescription" className="form-label">
          Description
        </label>
        <textarea
          id="taskDescription"
          className="form-control"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="taskStatus" className="form-label">
          Status
        </label>
        <select
          id="taskStatus"
          className="form-select"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <button
        className="btn btn-success"
        onClick={handleUpdateTask}
        disabled={!task.title.trim()}
      >
        Update Task
      </button>
      <button className="btn btn-secondary ms-2" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};
export default TaskEditForm;
