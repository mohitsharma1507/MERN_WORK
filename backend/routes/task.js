const {
  CreateTask,
  GetAllTask,
  UpdateTask,
  DeleteTask,
} = require("../controller/task");
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

router.post("/", auth, CreateTask);
router.get("/:projectId", auth, GetAllTask);
router.put("/:taskId", auth, UpdateTask);
router.delete("/:taskId", auth, DeleteTask);
module.exports = router;
