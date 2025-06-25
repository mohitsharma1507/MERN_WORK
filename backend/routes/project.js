const { GetAllProject, CreateProject } = require("../controller/project");
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

router.post("/", auth, CreateProject);
router.get("/", auth, GetAllProject);

module.exports = router;
