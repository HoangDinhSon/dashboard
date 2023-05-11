import facebook from "../assets/facebook.svg";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import loginLef from "../assets/loginLeft.svg";
import iconFacebook from "../assets/iconFacebook.svg";
import iconGit from "../assets/iconGit.svg";
import iconMail from "../assets/iconMail.svg";
import iconTwitter from "../assets/iconTwitter.svg";

function Login() {
  return (
    <div className=" flex  bg-yellow-200 w-full h-screen font-[Montserrat] text-sm">
      <div className="container_left w-[66%] h-full bg-slate-500">
        <img src={loginLef} alt="" className="" />
      </div>
      <div className="container_right w-[34%] h-full bg-slate-800 text-[#6E6B7B]">
        <div className="mt-[27%] ml-[15%] mr-[15%] bg-green-400">
          <h1 className="text-lg text-[#5E5873] font-medium mb-[10px]">
            Welcome to Entrance Test Interview!
          </h1>
          <p className="mb-[23px]">
            Please sign-in to your account and start the adventure
          </p>
          <form action="" className="text-xs">
            <label htmlFor="inputLogin">
              <div>
                <p>Email</p>
                <input
                  type="email"
                  name=""
                  id="inputLogin"
                  placeholder="   johndoe@gmail.com"
                  className="h-10 w-full mb-4 rounded-[5px] border-gray-400 border"
                />
              </div>
            </label>
            <label htmlFor="">
              <div>
                <p>Password</p>
                <input
                  type="password"
                  name=""
                  id=""
                  className="h-10 w-full mb-[14px] rounded-[5px] border-gray-400 border"
                />
              </div>
            </label>
            <label htmlFor="">
              <div>
                <Checkbox
                  defaultChecked
                  sx={{
                    width: 30,
                    color: "#D8D6DE",
                  }}
                />
                <span className="text-[14px]">Remember me</span>
              </div>
            </label>
            <Button
            
              variant="contained"
              sx={{
                width: "100%",
                color: "Primary.main ",
                fontSize:12,
                fontWeight:200,
              }}
            >
              Login
            </Button>
          </form>
          <div>
            <a href="http://">New on our platform?</a>
            <a href="http://" className="text-[#7367F0] ">
              Create an account
            </a>
          </div>
          <div>
            <hr />
            <span>or</span>
            <hr />
          </div>
          <div className="flex">
            <img src={iconFacebook} alt="iconFacebook" />
            <img src={iconTwitter} alt="iconTwitter" />
            <img src={iconMail} alt="iconMail" />
            <img src={iconGit} alt="iconGit" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
