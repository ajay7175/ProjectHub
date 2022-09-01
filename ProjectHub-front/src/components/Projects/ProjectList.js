import { useState } from "react";
import ListItem from "./ListItem";
import classes from "./ProjectList.module.css";

const ProjectList = (props) => {
  const projects = props.items;

  const [query, setQuery] = useState("");

  const getfilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((item) => item.title.toLowerCase().includes(query));
  };

  const filteredItems = getfilteredItems(query, projects);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a Project ..."
      />
      <ul className={classes.projectslist}>
        {filteredItems.map((project) => {
          return (
            <ListItem
              key={project._id}
              id={project._id}
              title={project.title}
              description={project.description}
              date={project.createdAt}
              completed={project.completed ? "Complete" : "In-Progress"}
              show={props.show}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ProjectList;
