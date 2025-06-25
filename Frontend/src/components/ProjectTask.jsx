import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskCreationForm from "./TaskForm";
import TaskEditForm from "./TaskEdit";

const ProjectTask = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/tasks/${projectId}`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Could not load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    setShowCreateForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setShowEditForm(false);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "In Progress":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowEditForm(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${taskId}`, {
        withCredentials: true,
      });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError("Could not delete task");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-success">Tasks</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <button
        className="btn btn-success mb-4"
        onClick={() => setShowCreateForm(true)}
      >
        Create Task
      </button>

      {showCreateForm ? (
        <TaskCreationForm
          projectId={projectId}
          onTaskCreated={handleTaskCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      ) : showEditForm ? (
        <TaskEditForm
          taskId={editingTask.id}
          initialTask={editingTask}
          onTaskUpdated={handleTaskUpdated}
          onCancel={() => setShowEditForm(false)}
        />
      ) : (
        <div className="row">
          {tasks.length === 0 ? (
            <p className="text-muted">No tasks found for this project.</p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="col-md-6 mb-4">
                <div className="card bg-dark text-success shadow">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>

                    <div className="mb-2 d-flex align-items-center gap-2">
                      <strong>Status:</strong>
                      <span
                        className={`badge ${getStatusBadgeClass(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    {task.completedAt && (
                      <p className="mb-1">
                        <small className="text-success">
                          Completed on:{" "}
                          {new Date(task.completedAt).toLocaleString()}
                        </small>
                      </p>
                    )}

                    <p className="mb-0">
                      <small className="text-success">
                        Created on: {new Date(task.createdAt).toLocaleString()}
                      </small>
                    </p>
                    <div style={{ marginTop: "15px" }}>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEditClick(task)}
                      >
                        EDIT
                      </button>

                      <button
                        className="btn btn-danger delbtn"
                        style={{ marginLeft: "10px" }}
                        onClick={() => handleDelete(task.id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectTask;
