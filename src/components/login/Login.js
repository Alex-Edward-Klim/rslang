import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/user/userActions";
import styles from "../login/login.module.scss";
import signInImg from "../../images/icons/sign-in.png";
// import { getUserDataFromState } from "../../redux/selectors";
import axios from "axios";

const Login = () => {
  const history = useHistory();

  // const userData = useSelector(getUserDataFromState);
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setDisabled(true);
    setErrMessage("");

    axios
      .post("https://rslang-server-2021.herokuapp.com/signin", {
        email: userEmail,
        password: userPassword,
      })
      .then((response) => {
        localStorage.setItem(
          "RSLangUserData78fe8a83ef752bd23c98c262b7264947",
          JSON.stringify(response.data)
        );
        setDisabled(false);
        dispatch(setUserData(response.data));
        history.push("/")
      })
      .catch((err) => {
        setErrMessage("Неправильный адрес электронной почты или пароль!");
        setDisabled(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      {/* <button onClick={() => console.log(userData)}>Log User Data</button> */}

      <form onSubmit={handleSubmit}>
        <div className={styles.signInUp}>
          <h1 className={styles.signInBtn}>Вход</h1>
          <button className={styles.signUpBtn} type="button" onClick={() => history.push("/signup")}>
            Регистрация
          </button>
        </div>
        
        <div className={styles.infoAndImg}>
          <div className={styles.backMain}>
            <img className={styles.signInImg} src={signInImg} alt='sign_in' />
            <div>
              <button type="button" onClick={() => history.push("/")}>
                На главную страницу
              </button>
            </div>
          </div>
          <div className={styles.sidebar}>
              <div>
                <label htmlFor="userEmail">Электронная Почта:</label>
                <input
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$"
                  id="userEmail"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="userPassword">Пароль:</label>
                <input
                  type="password"
                  id="userPassword"
                  required
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
            <div>
                <div className={styles.buttons}>
                  <button type="submit" disabled={disabled}>
                    Войти
                  </button>
                  {disabled ? (
                    <span>&nbsp;(Выполняется запрос на сервер...)</span>
                  ) : null}
                </div>

                <div style={{ color: "red" }}>{errMessage ? errMessage : null}</div>

                
              </div>
              </div>
          </div>
      </form>
    </div>
  );
};

export default Login;