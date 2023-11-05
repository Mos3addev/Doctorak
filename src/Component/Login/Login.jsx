/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Login({ saveUserData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    emailAddress: "",
    password: "",
  });

  async function sendUserDataToApi() {
    await axios
      .post(`${process.env.REACT_APP_URL_SITE}api/Users/Login`, user)
      .then(async (response) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        localStorage.setItem("userToken", response.data);

        saveUserData();
        navigate("/");
      })
      .catch((error) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setError(error.response.data.message || error.response.data);
      });
  }

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function submitRegisterForm(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    let validation = validateLoginForm();
    if (validation.error) {
      setErrorList(validation.error.details);
    } else {
      sendUserDataToApi();
      setLoading(false);
    }
  }
  function validateLoginForm() {
    let scheme = Joi.object({
      emailAddress: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,20}$/
      ), //
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="mt-60px">
        <div className="w-75 mx-auto py-3">
          <h3 className="my-4 main-color">Login</h3>
          {error ? <p className="text-danger">{error}</p> : ""}

          <form onSubmit={submitRegisterForm}>
            <label htmlFor="emailAddress" className="main-color g-2">
              Email :
            </label>
            <input
              onChange={getUserData}
              className="form-control my-input my-2"
              type="email"
              name="emailAddress"
              id="emailAddress"
            />
            <p className="text-danger">
              {
                errorList.filter(
                  (error) => error.context.label === "emailAddress"
                )[0]?.message
              }
            </p>

            <label htmlFor="password" className="main-color">
              Password :
            </label>
            <input
              onChange={getUserData}
              className="form-control my-input my-2"
              type="Password"
              name="password"
              id="password"
            />
            {errorList.map((error, index) => {
              if (error.context.label === "password") {
                return (
                  <p key={index} className="text-danger">
                    Password not matches between 6 and 20 and must content at
                    least uppercase letter, lowercase letter, and digit number.
                  </p>
                );
              }
            })}
            <button type="submit" className="btn my-2 btn-outline-success">
              {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
