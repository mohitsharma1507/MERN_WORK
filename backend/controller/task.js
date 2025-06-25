
const prisma = require("../prisma/index");

module.exports.CreateTask = async (req, res) => {
  try {
    const { title, description, status, projectId } = req.body;

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.id,
      },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        project: { connect: { id: projectId } },
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.GetAllTask = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: req.user.id,
      },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const tasks = await prisma.task.findMany({
      where: { projectId },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.UpdateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: true,
      },
    });

    if (!task || task.project.userId !== req.user.id) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title: title ?? task.title,
        description: description ?? task.description,
        status: status ?? task.status,
        completedAt: status === "COMPLETED" ? new Date() : null,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.DeleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: true,
      },
    });

    if (!task || task.project.userId !== req.user.id) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    await prisma.task.delete({ where: { id: taskId } });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
