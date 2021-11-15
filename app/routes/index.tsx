import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import stylesUrl from "../styles/app.css";
import Button from "~/components/Button/Button";
import db from "~/lib/db";
import { Project } from "@prisma/client";
import { ProjectCardList } from "~/components/ProjectCardList";
import ProjectCard from "~/components/ProjectCard";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter Site",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

type LoaderData = {
  projects: Project[];
};

export let loader: LoaderFunction = async (): Promise<LoaderData> => {
  const projects = await db.project.findMany();

  return { projects };
};

export default function Index() {
  let data = useLoaderData<LoaderData>();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <ProjectCardList>
        {data?.projects.map((project) => (
          <ProjectCard key={project.id} project={project}></ProjectCard>
        ))}
      </ProjectCardList>
      <form method="post">
        <label htmlFor="add-project">Add Project</label>
        <input
          id="add-project"
          name="name"
          className="border-purple-700"
        ></input>
        <Button type="submit">Create Project</Button>
      </form>
    </div>
  );
}
