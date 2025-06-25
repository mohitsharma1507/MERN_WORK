import { useEffect, useState } from "react";
import { getCurrentUser } from "../utils/auth";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    const FetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8080/projects", {
          withCredentials: true,
        });
        if (res.data.status && Array.isArray(res.data.data)) {
          setProjects(res.data.data);
        } else {
          console.error("Projects data is not an array:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    FetchProjects();
  }, []);

  if (!user)
    return (
      <p className="text-center text-white">
        Please login to view your dashboard.
      </p>
    );

  return (
    <div className="container p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-success">
        Welcome, {user.name}!
      </h1>
      <p className="mb-4 text-center text-white">Country: {user.country}</p>
      <div className="mb-4 text-center">
        <Link
          to="/projects/new"
          className="btn btn-success text-white px-4 py-2 rounded"
        >
          Create New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-white">
          No projects yet. Create your first one!
        </p>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div key={project.id} className="col-md-4 mb-4">
              <div className="card text-white bg-dark">
                <div className="card-body">
                  <h5 className="card-title text-success">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <p className="card-footer text-success">
                    Created on:{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/projects/${project.id}/tasks`}
                    className="btn btn-outline-success"
                  >
                    View Tasks
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
