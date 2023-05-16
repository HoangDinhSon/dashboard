import axios from "axios";
import { useForm } from "react-hook-form";
import dasboardAvatar from "../assets/dasboardAvatar.svg";
import dashboardAvatarStatus from "../assets/dashboardAvatarStatus.svg";
import dasboardPower from "../assets/dasboardPower.svg";
import dashboardCenter from "../assets/dashboardCenter.svg";
import { useState } from "react";
import { useMutation } from "react-query";

function Dashboard() {
  const objUseForm = useForm();
  const register = objUseForm.register;
  const handleSubmit = objUseForm.handleSubmit;
  const [toggle, setToggle] = useState(false);

  // kiểm tra xem locosorage có key user hay không
  let token: any = "";
  token = localStorage.getItem("user");
  if (!token) {
    window.location.href = "http://localhost:4000/login"
  }
  

  // call api có chức năng Logout
  const logoutUser = () => {
    // lấy token
    let token: any = "";
    const getTokenFromLocalStorage = () => {
      const tokenJson = localStorage.getItem("user");
      if (tokenJson) {
        token = JSON.parse(tokenJson);
      }
    };
    getTokenFromLocalStorage();
    token ? mutationLogin.mutate(token) : {};
  };
  const mutationLogin = useMutation({
    mutationFn: (token) => {
      return axios
        .post("http://streaming.nexlesoft.com:4000/api/auth/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .catch((error) => {
          error;
        });
    },
  });
  if (mutationLogin.isSuccess) {
    console.log("vào day để xoa localstorage");
    localStorage.removeItem("user");
    window.location.href = "http://localhost:4000/login";
  }

  const handleLogout = () => {
    logoutUser();
  };
  const onSubmit = (dataSubmit: any) => {
    dataSubmit === "true" ? (dataSubmit = true) : false;
    setToggle(!toggle);
  };

  const menuUser = () => {
    return (
      toggle && (
        <section>
          <div onClick={handleLogout}  className="w-[150px] h-[38px] absolute  top-62  right-8  bg-[white] rounded border-solid border-[#E9EAEB] border pt-2 pr-2 cursor-pointer">
            <div className="flex justify-end ">
              <button
                type="submit"
                
                className="text-[#6E6B7B]"
              >
                Logout
              </button>
              <img src={dasboardPower} alt="" className="ml-2" />
            </div>
          </div>
        </section>
      )
    );
  };

  return (
    <div className="wrap w-screen h-screen relative  bg-[#F8F8F8]">
      <div className="">
        <header className="w-full h-[62px] bg-[#FFFFFF]  flex justify-end items-center">
          <div className="text-[#6E6B7B]  font-medium text-right">
            <h3>John Doe</h3>
            <p className="text-[#B9B9C3] text-[12px]">Available</p>
          </div>
          <label htmlFor="riseTagLogout">
            <div className="relative ml-3 mr-7">
              <div className="rounded-[50%] bg-slate-500 overflow-hidden ">
                <img
                  src={dasboardAvatar}
                  alt="avatar"
                  className="object-cover"
                />
              </div>
              <img
                src={dashboardAvatarStatus}
                alt="status"
                className="absolute bottom-0 right-0 border border-solid border-white rounded-[50%]"
              />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("riseTagLogout", {})}
                type="submit"
                name="riseTagLogout"
                id="riseTagLogout"
                value="false"
                className="sr-only "
              />
            </form>
          </label>
        </header>
        {menuUser()}
        <section>
          <h1 className="text-center mt-[5%] text-[24px] font-medium text-[#5E5873] ">
            Welcome to Demo App
          </h1>
          <figure className=" h-[300px] w-[360px] absolute top-[60%] right-[50%] -translate-y-2/4 translate-x-2/4 mx-[auto] overflow-hidden">
            <img src={dashboardCenter} alt="image " className="" />
          </figure>
        </section>
        <footer className="absolute bottom-0  h-[52px] w-[100%]">
          <p className="leading-[52px] text-sm uppercase font-normal ml-7">
            COPYRIGHT © 2020
          </p>
        </footer>
      </div>
    </div>
  );
}
export default Dashboard;
