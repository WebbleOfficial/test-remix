import { Project } from "@prisma/client";
import { Link } from "react-router-dom";
import { useFetcher } from "remix";
import Button from "./Button/Button";

type Props = {
  project: Pick<Project, "name" | "id">;
};

const ProjectCard = ({ project }: Props) => {
  const deleteProject = useFetcher();

  return (
    <div className="bg-white shadow-md">
      <Link to={project.id.toString()}>View</Link>
      <ProjectCardTitle name={project.name}></ProjectCardTitle>
      <Button
        type="button"
        onClick={() => {
          deleteProject.submit(
            { id: project.id.toString() },
            { method: "delete", action: "/projects" }
          );
        }}
      >
        {deleteProject.state === "submitting" ? "Loading" : "Delete"}
      </Button>
    </div>
  );
};

const ProjectCardTitle = ({ name }: { name: string }) => {
  return <p className="font-bold text-lg w-52 h-20 text-center flex">{name}</p>;
};

export default ProjectCard;
