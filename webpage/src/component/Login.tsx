//logic
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
// ui
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import loginLef from "../assets/loginLeft.svg";
import iconFacebook from "../assets/iconFacebook.svg";
import iconGit from "../assets/iconGit.svg";
import iconMail from "../assets/iconMail.svg";
import iconTwitter from "../assets/iconTwitter.svg";

import axios from "axios";

interface InputForm {
  email: String,
  password: String,
}

function Login() {
  const objUseform = useForm();
  const register = objUseform.register;
  const handleSubmit = objUseform.handleSubmit;


  const [dataUser, setData] = useState({ email: "", password: "" });
  const [responseUser, setResponseUser] = useState({});
  const [isCreate, setIsCreate] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertPassword, setAlertPassword] = useState("");

  // post  Api
  const createData = async () => {
     await axios
      .post("http://streaming.nexlesoft.com:4000/api/auth/signin", dataUser , {
        headers: {
          "Content-Type": "multipart/form-dat",
        },
      })
      .then((response) => {
        console.log(response);
        setResponseUser(response);
        
        return response;
      });
  };
  const queryCreate = useQuery(["postUser"], createData, { enabled: isCreate });
  if (queryCreate.isSuccess) {
    console.log("post Aip", queryCreate.isSuccess);
  }
  //validate email,password 
  const patternEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternPassword= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/
    const validateAlert = (input: string, pattern: RegExp, name: string) => {
    if (input === "" || input === undefined) {
      if (name === "Email"){setAlertEmail(`${name} is required`);}
      if (name === "Password"){setAlertPassword(`${name} is required`);}
      return false;
    } else if (pattern.test(input)) {
      if (name === "Email"){setAlertEmail("");}
      if (name === "Password"){setAlertPassword("");}
      return true;
    } else {
      if (name === "Email"){setAlertEmail(`${name} is not valid`);}
      if (name === "Password"){setAlertPassword(`${name} is not valid`);}
      return false;
    }
  };

  const onSubmit = function (data: any) {
    setData(data);
    setIsCreate(true);
    console.log("data", data);
    // location.href="http://localhost:5173/";
  };

  return (
    <div className=" flex w-full h-screen font-[Montserrat] text-sm ">
      <div className="container_left w-[66%] h-full">
        <img src={loginLef} alt="" className="" />
      </div>
      <div className="container_right w-[34%] h-full text-[#6E6B7B]">
        <div className="mt-[27%] ml-[15%] mr-[15%]">
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
                <p>Email</p>
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
                {<span className="text-red-600 block absolute bottom-3  ">{alertEmail}</span>}
              </div>
            </label>
            <label htmlFor="loginPassword">
              <div className="relative">
                <div className="flex justify-between">
                  <span>Password</span>
                  <a href="#" className="text-[#7367F0]">
                    <span>Forgot Password?</span>
                  </a>
                </div>
                <input
                   {...register("password", {
                    onChange: (e) => {
                      validateAlert(e.target.value, patternPassword, "Password");
                    },
                  })}
                  type="password"
                  name="password"
                  id="loginPassword"
                  className="h-10 w-full mb-8 rounded-[5px] border-gray-400 border"
                />
                 {<span className="text-red-600 block absolute bottom-3">{alertPassword}</span>}
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
          <div className="mb-[25px]">
            <a href="http://">New on our platform?</a>
            <a href="http://" className="text-[#7367F0] ">
              Create an account
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
