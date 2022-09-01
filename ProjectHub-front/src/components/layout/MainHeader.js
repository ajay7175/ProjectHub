import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login / Signup</Link>
            </li>
          )}

          <li>
            <Link to="/welcome">Welcome</Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/signout">Signout</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
