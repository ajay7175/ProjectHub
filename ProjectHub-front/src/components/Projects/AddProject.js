import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";

import classes from "./AddProject.module.css";

const url = "http://localhost:5000";

const AddProject = () => {
  const authCtx = useContext(AuthContext);

  const titleInputRef = useRef();
  const descInputRef = useRef();
  const statusInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredStatus = statusInputRef.current.value;

    try {
      const res = await fetch(url + "/projects", {
        method: "POST",
        body: JSON.stringify({
          title: enteredTitle,
          description: enteredDesc,
          status: enteredStatus,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      const data = await res.json();
      console.log("From Adding new project");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Add a new Project</h1>
      <form>
        <div className={classes.box}>
          <label for="title">Title</label>
          <input id="title" name="title" ref={titleInputRef}></input>
        </div>
        <div className={classes.box}>
          <label for="description">Description</label>
          <textarea cols="21" name="description" ref={descInputRef} />
        </div>
        <div className={classes.box}>
          <label for="completed">status</label>
          <input id="status" name="status" ref={statusInputRef}></input>
        </div>
        <div className={classes.actions}>
          <button className={classes.submitBtn} onClick={submitHandler}>
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
