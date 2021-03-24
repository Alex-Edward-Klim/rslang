import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import { getUserDataFromState } from "../../redux/selectors";

const LoginStatus = () => {
  const history = useHistory();

  const userData = useSelector(getUserDataFromState);

  return userData &&
    Object.keys(userData).length === 0 &&
    userData.constructor === Object ? (
    <>
      <div>Гость</div>
      <div onClick={() => history.push("/login")}>Войти</div>
    </>
  ) : (
    <>
      <div>{userData.name}</div>
      <img src={userData.photo} alt="user" />
    </>
  );
};

export default LoginStatus;
