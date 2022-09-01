import InfoRow from "./InfoRow";
import classes from "./ProfileDescription.module.css";

const ProfileDescription = (props) => {
  return (
    <div className={classes.container}>
      <InfoRow label="Name" info={props.name} />
      <InfoRow label="email" info={props.email} />
      <InfoRow label="age" info={props.age} />
      <InfoRow label="joined" info={props.joined} />
    </div>
  );
};

export default ProfileDescription;
