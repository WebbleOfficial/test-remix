import db from "~/lib/db";

export const createProject = async ({ name }: { name: string }) => {
  const project = await db.project.create({ data: { name } });

  return project;
};

export const deleteProject = async ({ id }: { id: number }) => {
  const project = await db.project.delete({ where: { id } });

  return project;
};

export const getProject = async ({ id }: { id: number }) => {
  return await db.project.findFirst({ where: { id } });
};
