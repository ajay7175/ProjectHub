import React from "react";
import reactDom from "react-dom";
import classes from "./FileUpload.module.css";
import { useState, useContext } from "react";
import AuthContext from "../store/auth-context";

const url = "http://localhost:5000";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  const authCtx = useContext(AuthContext);
  console.log(props.projId);

  const [file, setFile] = useState(null);

  const submitFile = async (e) => {
    e.preventDefault();

    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(url + `/projects/${props.projId}/file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
        body: formData,
        redirect: "follow",
      });
      console.log(res);
      const data = await res.json();
      console.log("from file upload");
      console.log(data);
      if (data.error) throw new Error();
    } catch (e) {
      console.log(e);
      console.log("file bs");
    }

    props.onConfirm();
  };
  return (
    <div className={classes.modal}>
      <div className={classes.header}>
        <h2>Upload File</h2>
      </div>
      <form encType="multipart/form-data" onSubmit={submitFile}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button onClick={submitFile}>Upload</button>
      </form>
    </div>
  );
};

export default function FileUpload(props) {
  if (!props.ready) return null;
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} projId={props.projId} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}
