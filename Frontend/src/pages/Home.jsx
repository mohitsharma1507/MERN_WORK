import { useNavigate } from "react-router-dom";
import heroImage from "../assets/TaskPage.jpg";
import { getCurrentUser } from "../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="container-fluid bg-black text-success min-vh-100 d-flex align-items-center">
      <div className="row w-100 p-4">
        <div className="col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <img
            src={heroImage}
            alt="Task Manager"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "400px" }}
          />
        </div>

        <div className="col-md-6 text-center text-md-start d-flex flex-column justify-content-center">
          <h1 className="display-4 fw-bold mb-3">Welcome to Task Manager</h1>
          <p className="fs-5 mb-4">
            Manage your projects efficiently. Stay organized, stay productive.
          </p>
          <button
            onClick={handleDashboardClick}
            className="btn btn-success mt-3"
            style={{ width: "25rem", marginLeft: "8rem" }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
