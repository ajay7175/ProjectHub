import FileUpload from "../../UI/FileUpload";
import { useState, useContext } from "react";
import classes from "./ListItem.module.css";
import AuthContext from "../../store/auth-context";

const url = "http://localhost:5000";

const ListItem = (props) => {
  const [ready, setReady] = useState(false);

  const authCtx = useContext(AuthContext);

  const logger = async (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      console.log("upload");
      return;
    }
    console.log(props.id);

    try {
      const res = await fetch(url + `/projects/${props.id}/file`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      console.log(res);
      const data = await res.json();
      console.log("from get file");
      console.log(data);
      if (data.error) throw new Error();
    } catch (e) {
      console.log(e);
      console.log("old file bs");
    }
  };

  const upload = () => {
    console.log("ready to upload");
    setReady(true);
  };

  const onConfirm = () => {
    setReady(false);
  };

  return (
    <>
      <FileUpload ready={ready} projId={props.id} onConfirm={onConfirm} />
      <div onClick={logger} className={classes.card}>
        <header className={classes.cardHeader}>
          <p>{props.date}</p>
          <h2>{props.title}</h2>
        </header>
        <p>{props.description}</p>
        <h4>completed: {props.completed}</h4>
        {props.show && (
          <button className={classes.btn} onClick={upload}>
            Upload file
          </button>
        )}
      </div>
    </>
  );
};

export default ListItem;
