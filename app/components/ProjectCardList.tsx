import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ProjectCardList = ({ children }: Props) => {
  return <div className="flex space-x-4">{children}</div>;
};
