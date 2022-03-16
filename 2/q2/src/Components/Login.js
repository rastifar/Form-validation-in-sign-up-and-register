import React, { useEffect, useState } from "react";
import validation from "./validation";
import styles from "./Signup.module.css";
import Modal from "./Modal";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    setErrors(validation(data,'login'));
  }, [data, touched]);

  const inuptChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!Object.keys(errors).length) {
      setMessage("form submitted successfully");
    } else {
      setMessage("error happend");
    }
  };

  return (
    <div className={styles.container}>
      <p>خوش آمدید</p>

      <form className={styles.form} onSubmit={submitHandler} id="my-form">
        <div className={styles.formField}>
          <input
            type="text"
            name="email"
            placeholder="پست الکترونیکی"
            onChange={inuptChangeHandler}
            onFocus={focusHandler}
            className={styles.inputField}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.formField}>
          <div className={styles.password}>
            <input
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="کلمه عبور"
              onChange={inuptChangeHandler}
              onFocus={focusHandler}
              className={styles.inputField}
            />
            <button onClick={togglePassword}>
              {passwordShown ? (
                <FaRegEye className={styles.icon} />
              ) : (
                <FaRegEyeSlash className={styles.icon} />
              )}
            </button>
            {errors.password && touched.password && (
              <span>{errors.password}</span>
            )}
          </div>
        </div>
      </form>
      <div className={styles.formField}>
        <button
          type="submit"
          className={styles.btnField}
          onClick={() => setIsOpen(true)}
          form="my-form"
        >
          ورود
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            message={message}
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
