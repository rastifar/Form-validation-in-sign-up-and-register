import React, { useEffect, useState } from "react";
import validation from "./validation";
import styles from "./Signup.module.css";
import Modal from "./Modal";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    education: "",
    institute: "",
    province: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [provinces, setProvinces] = useState({});
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    fetch("/iranstates.json")
      .then((response) => response.json())
      .then((item) => setProvinces(item));
  }, []);

  useEffect(() => {
    setErrors(validation(data,'signup'));
  }, [data, touched]);

  const inuptChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (event.target.name === "province") {   
      Object.entries(provinces).forEach(([key, val]) => {
        if (key === event.target.value) {
          setCities(val);
        }
      });
    }
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
      setMessage(true);
    } else {
     
      setMessage(false);
    }
  };

  return (
    <div className={styles.container}>
      <p>رایگان ثبت نام کنید</p>

      <form className={styles.form} onSubmit={submitHandler} id="my-form">
        <div className={styles.dflex}>
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="نام"
              onChange={inuptChangeHandler}
              onFocus={focusHandler}
            />
            {errors.firstName && touched.firstName && (
              <span>{errors.firstName}</span>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="نام خانوادگی"
              onChange={inuptChangeHandler}
              onFocus={focusHandler}
            />
            {errors.lastName && touched.lastName && (
              <span>{errors.lastName}</span>
            )}
          </div>
        </div>
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
        <div className={styles.formField}>
          <input
            type="text"
            name="education"
            placeholder="آخرین مدرک تحصیلی"
            onChange={inuptChangeHandler}
            onFocus={focusHandler}
            className={styles.inputField}
          />
          {errors.education && touched.education && (
            <span>{errors.education}</span>
          )}
        </div>
        {data.education && (
          <div className={styles.formField}>
            <input
              type="text"
              name="institute"
              placeholder="محل تحصیل"
              onChange={inuptChangeHandler}
              onFocus={focusHandler}
              className={styles.inputField}
            />
            {errors.institute && touched.institute && (
              <span>{errors.institute}</span>
            )}
          </div>
        )}
        <div className={styles.formField}>
          <select
            defaultValue='استان'
            type="text"
            name="province"
            onChange={inuptChangeHandler}
            onFocus={focusHandler}
            className={styles.formSelectField}
          >
            <option defaultValue="DEFAULT" >
              استان
            </option>
            {Object.keys(provinces).map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          {errors.province && touched.province && (
            <span>{errors.province}</span>
          )}
        </div>
        <div className={styles.formField}>
          <select
            defaultValue='شهر'
            type="text"
            name="city"
            onChange={inuptChangeHandler}
            onFocus={focusHandler}
            className={styles.formSelectField}
          >
            <option defaultValue="DEFAULT" >
              شهر
            </option>
            {cities.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
          {errors.city && touched.city && <span>{errors.city}</span>}
        </div>
      </form>
      <div className={styles.formField}>
        <button
          type="submit"
          className={styles.btnField}
          onClick={() => setIsOpen(true)}
          form="my-form"
        >
          ثبت نام
        </button>
          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            message={message}
          />
      </div>
    </div>
  );
};

export default Signup;
