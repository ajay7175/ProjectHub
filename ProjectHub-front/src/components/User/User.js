import { useState, useContext, useEffect } from "react";
import ProfileDescription from "./ProfileDescription";
import ProjectList from "../Projects/ProjectList";
import classes from "./User.module.css";
import AuthContext from "../../store/auth-context";
import AddProject from "../Projects/AddProject";

const url = "http://localhost:5000";

const User = () => {
  const authCtx = useContext(AuthContext);
  const [gotUser, setGotUser] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(url + "/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        });
        const data = await res.json();
        console.log("from user");
        console.log(data);
        if (data.error) throw new Error();
        setUser(data);
        setGotUser(true);
      } catch (e) {
        console.log(e);
        setUser({
          id: 1,
          name: "Source Code",
          email: "source@gmail.com",
          age: 404,
          joined: "25th nov 6969",
        });
        setGotUser(false);
        console.log("damn");
      }
    };

    const getUserProjects = async () => {
      try {
        const res = await fetch(url + "/projects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
        });
        const data = await res.json();
        console.log("from projects");
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
        setGotUser(false);
        console.log("damn");
      }
    };

    getUser();
    getUserProjects();
  }, []);

  const [user, setUser] = useState();

  const [projects, setProjects] = useState([
    {
      id: 4,
      title: "Project 1",
      description: "This is the description for the first Project",
      completed: "true",
    },
    {
      id: 5,
      title: "Second Project",
      description: "yet another description for the second Project",
      completed: "false",
    },
    {
      id: 6,
      title: "The Third Project",
      description: "yet another description for the second Project",
      completed: "false",
    },
  ]);

  return (
    <>
      <div className={classes.showBox}>
        {gotUser && (
          <ProfileDescription
            name={user.name}
            email={user.email}
            age={user.age}
            joined={user.createdAt}
            //name={user.name}
          />
        )}
      </div>
      <div className={classes.container}>
        <ProjectList items={projects} show={true} />
      </div>
      <AddProject />
    </>
  );
};

export default User;
