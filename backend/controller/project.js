const prisma = require("../prisma/index");

module.exports.CreateProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const count = await prisma.project.count({
      where: { userId },
    });

    if (count >= 4) {
      return res
        .status(400)
        .json({ error: "Maximum 4 projects allowed per user" });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        user: { connect: { id: userId } },
      },
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.GetAllProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ status: true, data: projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res
      .status(500)
      .json({ status: false, message: "Failed to fetch projects" });
  }
};
