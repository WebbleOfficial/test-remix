import { Project } from "@prisma/client";
import { useEffect } from "react";
import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  Outlet,
  redirect,
  useFetcher,
  useLoaderData,
} from "remix";
import ProjectCard from "~/components/ProjectCard";
import db from "~/lib/db";
import { createProject, deleteProject } from "~/services/projects";
// import tailwindStyles from "app/styles/app.css";

type LoaderData = {
  projects: Project[];
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const projects = await db.project.findMany();

  return { projects };
};

export const action: ActionFunction = async ({ request }) => {
  const body = new URLSearchParams(await request.text());

  if (request.method === "DELETE") {
    console.log({ method: request.method });
    await deleteProject({ id: Number(body.get("id")) });

    return redirect("/projects");
  }

  if (request.method === "POST") {
    await createProject({ name: body.get("name")! });
    return redirect("/projects/");
  }

  return null;
};

export let meta: MetaFunction = () => {
  return {
    title: "Projects!",
    description: "Welcome to remix!",
  };
};

// export let links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: tailwindStyles }];
// };

const ProjectsPage = () => {
  const data = useLoaderData<LoaderData>();
  const adddProject = useFetcher();

  return (
    <div>
      {/* {JSON.stringify({ projects })} */}
      <adddProject.Form method="post">
        <input type="text" name="name" />
        <button type="submit">Add Project</button>
      </adddProject.Form>

      <div className="flex space-x-4 my-10 flex-wrap mx-auto w-[80%] space-y-4">
        {data?.projects.map((project) => (
          <ProjectCard key={project.id} project={project}></ProjectCard>
        ))}
        {adddProject.submission && (
          <ProjectCard
            project={{
              id: 999,
              name: adddProject.submission.formData.get("name")!,
            }}
          ></ProjectCard>
        )}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ProjectsPage;
