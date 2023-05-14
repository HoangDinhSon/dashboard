//logic
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
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

// interface InputForm {
//   email: String;
//   password: String;

// }

function Login() {
  const objUseform = useForm();
  const register = objUseform.register;
  const handleSubmit = objUseform.handleSubmit;
  const errors = objUseform.formState.errors;

  const [dataUser, setData] = useState({});
  const [responseUser, setResponseUser] = useState({});
  const [isCreate, setIsCreate] = useState(false);

  // post  Api
  const createData = () => {
    axios
      .post("http://streaming.nexlesoft.com:4000/api/auth/signin", dataUser, {
        headers: {
          "Content-Type": "multipart/form-dat",
        },
      })
      .then((response) => {
        setResponseUser(response);
        return response;
      });
  };
  const queryCreate = useQuery(["postUser"], createData, { enabled: isCreate });
  if (queryCreate.isSuccess) {
    console.log("post Aip", queryCreate.isSuccess);
  }

  //: SubmitHandler<InputForm>
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
              <div>
                <p>
                  Email{" "}
                  {errors.email && (
                    <span className="text-red-600">invalid</span>
                  )}
                </p>
                <input
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  type="email"
                  name="email"
                  id="loginEmail"
                  placeholder="   johndoe@gmail.com"
                  className="h-10 w-full mb-4 rounded-[5px] border-gray-400 border"
                />
              </div>
            </label>
            <label htmlFor="loginPassword">
              <div>
                <div className="flex justify-between">
                  <span>Password</span>
                  {errors.password && (
                    <span className="text-red-600">invalid</span>
                  )}
                  <a href="#" className="text-[#7367F0]">
                    {" "}
                    <span>Forgot Password?</span>
                  </a>
                </div>
                <input
                  {...register("password", {
                    required: true,
                    maxLength: 20,
                    minLength: 6,
                  })}
                  type="password"
                  name="password"
                  id="loginPassword"
                  className="h-10 w-full mb-[14px] rounded-[5px] border-gray-400 border"
                />
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
