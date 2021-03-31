import { useRef, useState } from "react";
import { useHistory } from "react-router";

import imageCompression from "browser-image-compression";
import axios from "axios";

import styles from "../signup/signup.module.scss";
import signUpImg from "../../images/icons/sign-up.png";

const Signup = () => {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [userCreated, setUserCreated] = useState(false);

  const imageRef = useRef(null);

  const compressImage = async (file) => {
    const options = {
      maxWidthOrHeight: 64,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (err) {
      // console.log(err);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const fileSelectedHandler = async (e) => {
    try {
      const compressedImage = await compressImage(e.target.files[0]);
      const imageString = await toBase64(compressedImage);
      imageRef.current.src = imageString;
      setUserPhoto(imageString);
      setDisabled(false);
    } catch (err) {
      imageRef.current.src = "";
      setUserPhoto("");
      setDisabled(true);
      // console.log('err');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setDisabled(true);
    setErrMessage("");

    axios
      .post("https://rslang-server-2021.herokuapp.com/users", {
        name: userName,
        email: userEmail,
        password: userPassword,
        photo: userPhoto,
      })
      .then((response) => {
        // console.log(response);
        setDisabled(false);
        setUserCreated(true);
      })
      .catch((err) => {
        // console.log(err);
        setErrMessage(
          "Пользователь с таким адресом электронной почтой уже существует!"
        );
        setDisabled(false);
      });
  };

  return userCreated ? (
    <>
      <h1>Пользователь создан!</h1>
      <div>
        <button type="button" onClick={() => history.push("/login")}>
          Войти
        </button>
      </div>
    </>
  ) : (
    <>
    <div className={styles.wrapper}>
      {/* <h1>Создать нового пользователя:</h1> */}
      

      <form onSubmit={handleSubmit}>

        <div className={styles.signInUp}>
          <button className={styles.signInBtn} type="button" onClick={() => history.push("/login")}>Вход</button>
          <h1 className={styles.signUpBtn}>Регистрация</h1>
        </div>

        <div className={styles.infoAndImg}>
          <div className={styles.backMain}>
            <img className={styles.signInImg} src={signUpImg} alt='sign_in' />
            <div>
              <button type="button" onClick={() => history.push("/")}>
                На главную страницу
              </button>
            </div>
          </div>
          <div className={styles.sidebar}>
        <div>
          <label htmlFor="userName">Имя:</label>
          <input
            type="text"
            id="userName"
            required
            value={userName}
            onChange={(e) => {
              if (!/\s/.test(e.target.value)) {
                setUserName(e.target.value);
              }
            }}
          />
        </div>

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
            minLength="8"
            required
            value={userPassword}
            onChange={(e) => {
              if (!/\s/.test(e.target.value)) {
                setUserPassword(e.target.value);
              }
            }}
          />
        </div>

        <div >
          <div>
            <label htmlFor="userPhoto">
              Фото:&nbsp;
              <span className={styles.fileImg}>Выберите файл</span>
            </label>
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            id="userPhoto"
            onChange={(e) => fileSelectedHandler(e)}
          />

          <img className={styles.photo} ref={imageRef} alt="" />
        </div>

        <div className={styles.attention}>
          <button type="submit" disabled={disabled}>
            Создать пользователя
          </button>
          {disabled && userPhoto === "" ? (
            <span>&nbsp;(Пожалуйста, выберите фото!)</span>
          ) : disabled ? (
            <span>&nbsp;(Выполняется запрос на сервер...)</span>
          ) : null}
        </div>

        <div style={{ color: "red" }}>{errMessage ? errMessage : null}</div>
        </div>
        </div>
      </form>
      </div>
    </>
  );
};

export default Signup;
