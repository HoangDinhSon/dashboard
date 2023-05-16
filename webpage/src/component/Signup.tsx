import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import signUpLeft from "../assets/signUpLeft.svg";
import iconFacebook from "../assets/iconFacebook.svg";
import iconGit from "../assets/iconGit.svg";
import iconMail from "../assets/iconMail.svg";
import iconTwitter from "../assets/iconTwitter.svg";
import { useMutation } from "react-query";

function Signup() {
  const objUseform = useForm();
  const register = objUseform.register;
  const handleSubmit = objUseform.handleSubmit;
  const errors = objUseform.formState.errors;

  const [alertEmail, setAlertEmail] = useState("");
  const [alertPassword, setAlertPassword] = useState("");

  const spanAlert = useRef<HTMLInputElement>(null);

  //api
  const mutation = useMutation({
    mutationFn: (dataUser) => {
      return axios
        .post("http://streaming.nexlesoft.com:4000/api/auth/signup", dataUser)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.token));
          tranformPage();
        })
        .catch((error) => error);
    },
  });

  const tranformPage = () => {
    location.href = "http://localhost:4000/";
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      tranformPage();
    }
  }, []);

  // validate email password Alert

  const validateAlert = (input: string, name: string) => {
    const patternEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const patternPasswordWeak =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,18}$/;
    const patternPasswordMedium =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{8,18}$/;
    const patternPasswordStrong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{10,18}$/;

    if (input === "" || input === undefined) {
      if (name === "Email") {
        setAlertEmail(`${name} is required`);
      }
      if (name === "Password") {
        setAlertPassword(`${name} is required`);
      }
      return false;
    } else {
      if (name === "Email") {
        if (patternEmail.test(input)) {
          setAlertEmail("");
        } else {
          setAlertEmail(`${name} is not valid`);
        }
      }
      if (name === "Password") {
        if (patternPasswordStrong.test(input)) {
          setAlertPassword("Password is good");

          if (spanAlert.current) {
            spanAlert.current.style.color = "#647FFF";
          }
        } else if (patternPasswordMedium.test(input)) {
          setAlertPassword("Password is fair");
          if (spanAlert.current) {
            spanAlert.current.style.color = "#E3A063";
          }
        } else if (patternPasswordWeak.test(input)) {
          setAlertPassword("Password is weak");
          if (spanAlert.current) {
            spanAlert.current.style.color = "#EA5455";
          }
        } else {
          setAlertPassword(`${name} is not valid`);
          if (spanAlert.current) {
            spanAlert.current.style.color = "#EA5455";
          }
        }
      }
    }
  };

  const onHandle = function (data: any) {
    mutation.mutate(data);
  };

  return (
    <div className=" flex w-screen h-screen font-[Montserrat] text-sm ">
      <div className="container_left w-[66%] h-full overflow-hidden bg-[#F8F8F8] flex justify-center">
        <div className=" h-full flex flex-col justify-center ">
          <img src={signUpLeft} alt="" className="h-[500px] " />
        </div>
      </div>
      <div className="container_right w-[34%] h-full text-[#6E6B7B] flex flex-col justify-center">
        <div className="ml-[15%] mr-[15%]">
          <h1 className="text-lg text-[#5E5873] font-medium mb-[10px]">
            Adventure starts here
          </h1>
          <p className="mb-[23px]">Make your app management easy and fun!</p>
          <form onSubmit={handleSubmit(onHandle)} className="text-xs mb-4">
            <label htmlFor="inputFirstName">
              <div className="relative">
                <p>
                  Firstname<span className="text-[red]">*</span>
                </p>
                <input
                  {...register("firstName", {
                    required: true,
                  })}
                  type="text"
                  name="firstName"
                  id="inputFirstName"
                  placeholder="   johndoe"
                  className="h-10 w-full mb-8 rounded-[5px] border-gray-400 border"
                />
                {errors.firstName && (
                  <span className="text-red-600 block absolute bottom-3 ">
                    Firstname is required
                  </span>
                )}
              </div>
            </label>

            <label htmlFor="inputLastName">
              <div className="relative">
                <p>
                  LastName<span className="text-[red]">*</span>
                </p>
                <input
                  {...register("lastName", {
                    required: true,
                    minLength: 3,
                    maxLength: 10,
                  })}
                  type="text"
                  name="lastName"
                  id="inputLastName"
                  placeholder="   johndoe"
                  className="h-10 w-full mb-8 rounded-[5px] border-gray-400 border"
                />
                {errors.lastName && (
                  <span className="text-red-600 block absolute bottom-3 ">
                    Lastname is required
                  </span>
                )}
              </div>
            </label>

            <label htmlFor="inputLogin">
              <div className="relative">
                <p>
                  Email <span className="text-[red]">*</span>
                </p>
                <input
                  {...register("email", {
                    onChange: (e) => {
                      validateAlert(e.target.value, "Email");
                    },
                    required: true,
                  })}
                  type="email"
                  name="email"
                  id="inputLogin"
                  placeholder="   johndoe@gmail.com"
                  className="h-10 w-full mb-8 rounded-[5px] border-gray-400 border"
                />
                {errors.email ? (
                  <span className="text-red-600 block absolute bottom-3  ">
                    Email is required
                  </span>
                ) : (
                  <span className="text-red-600 block absolute bottom-3  ">
                    {alertEmail}
                  </span>
                )}
              </div>
            </label>

            <label htmlFor="passwordInput">
              <div className="relative">
                <div className="flex justify-between">
                  <span>
                    Password <span className="text-[red]">*</span>
                  </span>
                  <a href="#" className="text-[#7367F0]">
                    {" "}
                    <span>Forgot Password?</span>
                  </a>
                </div>
                <input
                  {...register("password", {
                    onChange: (e) => {
                      validateAlert(e.target.value, "Password");
                    },
                    required: true,
                  })}
                  type="password"
                  name="password"
                  id="passwordInput"
                  className="h-10 w-full mb-7 rounded-[5px] border-gray-400 border"
                />
                {errors.password ? (
                  <span className="text-red-600 block absolute bottom-3  ">
                    Password is required
                  </span>
                ) : (
                  <span
                    className="text-red-600 block absolute bottom-3   "
                    ref={spanAlert}
                  >
                    {alertPassword}
                  </span>
                )}
              </div>
            </label>
            <label htmlFor="checkBox">
              <div className=" h-[21px] mb-4 flex justify-center">
                <Checkbox
                  id="checkBox"
                  defaultChecked
                  sx={{
                    height: 18,
                    width: 18,
                    color: "#D8D6DE",
                  }}
                />
                <div className="text-[14px] ml-2 leading-[18px] w-full">
                  <p>
                    i agree to{" "}
                    <a href="#" className="text-[#7367F0]">
                      privacy policy & terms
                    </a>
                  </p>
                </div>
              </div>
            </label>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                color: "Primary.main ",
                fontWeight: 200,
                backgroundColor: "#7367F0",
                textTransform: "none",
                fontFamily: "Montserrat",
              }}
            >
              Signup
            </Button>
          </form>
          <div className="mb-[25px] w-[98%] mx-[auto]">
            <a href="http://localhost:4000/login">
              Already have an account ?{" "}
              <span className="text-[#7367F0]">Sign in instead</span>
            </a>
          </div>
          <div className="relative mb-6 ">
            <hr className="text-[#E9EAEC]" />
            <span className="w-[34px] h-[21px] text-center absolute inset-x-1/2  -top-2.5 -translate-x-2/4 bg-white block ">
              or
            </span>
          </div>
          <div className="flex justify-center">
            <div className="flex w-[153px] justify-between ">
              <img src={iconFacebook} alt="iconFacebook" />
              <img src={iconTwitter} alt="iconTwitter" />
              <img src={iconMail} alt="iconMail" />
              <img src={iconGit} alt="iconGit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Signup;
