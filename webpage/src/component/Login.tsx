//logic
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useState } from "react";
// ui
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import loginLef from "../assets/loginLeft.svg";
import iconFacebook from "../assets/iconFacebook.svg";
import iconGit from "../assets/iconGit.svg";
import iconMail from "../assets/iconMail.svg";
import iconTwitter from "../assets/iconTwitter.svg";

import axios from "axios";

function Login() {
  const objUseform = useForm();
  const register = objUseform.register;
  const handleSubmit = objUseform.handleSubmit;

  const [alertEmail, setAlertEmail] = useState("");
  const [alertPassword, setAlertPassword] = useState("");

  //  Api there is Not accour
  const mutation = useMutation({
    mutationFn: (dataUser) => {
      return axios
        .post("http://streaming.nexlesoft.com:4000/api/auth/signin", dataUser)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.token));
          location.href = "http://localhost:4000/";
        });
    },
  });
  // Api there is accout

  if (localStorage.getItem("user")) {
    console.log("có user trong local mới gọi");
    location.href = "http://localhost:4000/";
  }

  const patternEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,18}$/;
  const validateAlert = (input: string, pattern: RegExp, name: string) => {
    if (input === "" || input === undefined) {
      if (name === "Email") {
        setAlertEmail(`${name} is required`);
      }
      if (name === "Password") {
        setAlertPassword(`${name} is required`);
      }
      return false;
    } else if (pattern.test(input)) {
      if (name === "Email") {
        setAlertEmail("");
      }
      if (name === "Password") {
        setAlertPassword("");
      }
      return true;
    } else {
      if (name === "Email") {
        setAlertEmail(`${name} is not valid`);
      }
      if (name === "Password") {
        setAlertPassword(`${name} is not valid`);
      }
      return false;
    }
  };

  const onSubmit = function (data: any) {
    mutation.mutate(data);
  };

  return (
    <div className=" flex w-full h-screen font-[Montserrat] text-sm  bg-[#F8F8F8]">
      <div className="container_left w-[66%] h-full flex justify-center items-center">
        <img src={loginLef} alt="" className="" />
      </div>
      <div className="container_right w-[34%]   h-full text-[#6E6B7B] bg-white flex flex-col justify-center">
        <div className=" ml-[15%] mr-[15%]">
          <h1 className="text-lg text-[#5E5873] font-medium mb-[10px]">
            Welcome to Entrance Test Interview!
          </h1>
          <p className="mb-[23px]">
            Please sign-in to your account and start the adventure
          </p>
          <form
            action="submit"
            className="text-xs mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="loginEmail">
              <div className="relative">
                <p>Email <span className="text-[red]">*</span></p>
                <input
                  {...register("email", {
                    onChange: (e) => {
                      validateAlert(e.target.value, patternEmail, "Email");
                    },
                  })}
                  type="text"
                  name="email"
                  id="loginEmail"
                  placeholder="   johndoe@gmail.com"
                  className="h-10 w-full mb-8 rounded-[5px] border-gray-400 border"
                />
                {
                  <span className="text-red-600 block absolute bottom-3  ">
                    {alertEmail}
                  </span>
                }
              </div>
            </label>
            <label htmlFor="loginPassword">
              <div className="relative">
                <div className="flex justify-between">
                  <span>Password <span className="text-[red]">*</span></span>
                  <a href="#" className="text-[#7367F0]">
                    <span>Forgot Password?</span>
                  </a>
                </div>
                <input
                  {...register("password", {
                    onChange: (e) => {
                      validateAlert(
                        e.target.value,
                        patternPassword,
                        "Password"
                      );
                    },
                  })}
                  type="password"
                  name="password"
                  id="loginPassword"
                  className="h-10 w-full mb-8 rounded-[5px] border-gray-400 border"
                />
                {
                  <span className="text-red-600 block absolute bottom-3">
                    {alertPassword}
                  </span>
                }
              </div>
            </label>
            <label htmlFor="checkBox">
              <div className="w-[134px] h-[21px] mb-4 flex justify-center">
                <Checkbox
                  id="checkBox"
                  defaultChecked
                  sx={{
                    height: 18,
                    width: 18,
                    color: "#D8D6DE",
                  }}
                />
                <span className="text-[14px] ml-2 leading-[18px]">
                  Remember me
                </span>
              </div>
            </label>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "100%",
                color: "Primary.main ",
                fontWeight: 200,
                backgroundColor: "#7367F0",
                textTransform: "none",
                fontFamily: "Montserrat",
              }}
            >
              Login
            </Button>
          </form>
          <div className="mb-[25px] " >
            <a href="http://localhost:4000/signup" className="block w-[98%] mx-auto  text-center">
              New on our platform?{" "}
              <span className="text-[#7367F0] ">Create an account</span>
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
export default Login;
