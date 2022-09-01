import classes from "./InfoRow.module.css";

const InfoRow = (props) => {
  return (
    <div className={classes.row}>
      <label>{props.label}: </label>
      <p>{props.info}</p>
    </div>
  );
};

export default InfoRow;
