import { Project } from "@prisma/client";
import { LoaderFunction, useFetcher, useLoaderData } from "remix";
import { getProject } from "~/services/projects";

type LoaderData = {
  project: Project | null;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const { id } = params;
  const project = await getProject({ id: Number(id) });

  return { project };
};

const ProjectDetailsPage = () => {
  const data = useLoaderData();
  const projectsFetcher = useFetcher();
  const projects = projectsFetcher.load("/projects");

  return <div>Cool {JSON.stringify({ projects })}</div>;
};

export default ProjectDetailsPage;
