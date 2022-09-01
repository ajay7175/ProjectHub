import { useState, useContext, useEffect } from "react";

import ProjectList from "./ProjectList";
import classes from "./Projects.module.css";
import AuthContext from "../../store/auth-context";
import FileUpload from "../../UI/FileUpload";

const url = "http://localhost:5000";

const Projects = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const res = await fetch(url + "/allProjects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        });
        const data = await res.json();
        console.log("from AllProjects");
        console.log(data);
        if (data.error) throw new Error();
        setProjects(data);
      } catch (e) {
        console.log(e);
        setProjects([
          {
            id: 0,
            title: "No Projects to show ",
            description:
              "We had Some problem trying to fetch your projects from The server Please wait for a few Momnents and try again",
            completed: "false",
          },
        ]);
        console.log("damn");
      }
    };
    getAllProjects();
  }, []);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Project 1",
      description: "This is the description for the first Project",
      completed: "true",
    },
    {
      id: 2,
      title: "Second Project",
      description: "yet another description for the second Project",
      completed: "false",
    },
    {
      id: 3,
      title: "The Third Project",
      description: "yet another description for the second Project",
      completed: "false",
    },
  ]);

  return (
    <>
      <div className={classes.container}>
        <ProjectList items={projects} show={false} />
      </div>
    </>
  );
};

export default Projects;
