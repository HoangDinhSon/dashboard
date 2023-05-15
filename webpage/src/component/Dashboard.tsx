import { set, useForm } from "react-hook-form";
import dasboardAvatar from "../assets/dasboardAvatar.svg";
import dashboardAvatarStatus from "../assets/dashboardAvatarStatus.svg";
import dashboardCenter from "../assets/dashboardCenter.svg";
import { useState } from "react";

function Dashboard() {
  const objUseForm = useForm();
  const register = objUseForm.register;
  const handleSubmit = objUseForm.handleSubmit;
  const [toggle, setToggle] = useState(false);

  const onSubmit = (dataSubmit: any) => {
    dataSubmit === "true" ? (dataSubmit = true) : false;
    setToggle(!toggle);
  };
  const menuUser = () => {
   return ( toggle && (
      <section>
        <div className="w-52 h-11 bg-red-400 absolute  top-62  right-0">
          <div>
            <button type="submit">Logout</button>
          </div>
        </div>
      </section>
    ))
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
