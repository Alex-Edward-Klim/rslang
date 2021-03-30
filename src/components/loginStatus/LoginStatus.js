import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import styles from '../header/header.module.css';
import singInSrc from "../../images/icon/log-out.png";
import userPhoto from "../../images/icon/user-default-avatar.png";

import { getUserDataFromState } from "../../redux/selectors";

const LoginStatus = () => {
  const history = useHistory();

  const userData = useSelector(getUserDataFromState);

  return userData &&
    Object.keys(userData).length === 0 &&
    userData.constructor === Object ? (
    <>
      <div className={styles.headerUser}>
        <div className={styles.headeUserGuest}>Гость</div>
        <img className={styles.headerUserPhoto} src={userPhoto} alt=""  />
        <div className={styles.signIn} onClick={() => history.push("/login")}>Войти</div>
        <img 
          src={singInSrc}
          className={styles.signInImg}
          alt="Вход" />
        </div>
    </>
  ) : (
    <>
      <div className={styles.headerUser}>
        <div className={styles.headeUserGuest}>{userData.name}</div>
        <img className={styles.headerUserPhoto} src={userData.photo} alt="user" />
      </div>
    </>
  );
};

export default LoginStatus;
