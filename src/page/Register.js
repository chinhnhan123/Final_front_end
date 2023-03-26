import React from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

import farmer from "../assets/images/farmer.png";
import trader from "../assets/images/trader.png";
import { registerAPI } from "../api/auth";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
  fullName: yup.string().required().max(10, "MUST BE 10 CHARACTERS OR LESS"),
  terms: yup.boolean().oneOf([true], "Checkbox is required"),
});

const Register = () => {
  const [bg, setBg] = useState(farmer);
  const text = useRef();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
    watch,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.textContent === "farmer") {
      console.log("farmer");
      text.current.textContent = "farmer";
      e.target.textContent = "trader";
      setBg(farmer);
    } else {
      text.current.textContent = "trader";
      e.target.textContent = "farmer";
      setBg(trader);
    }
  };

  const onSubmitRegister = async () => {
    console.log("submit");
    const config = getValues(["email", "password", "fullName"]);
    registerAPI(config);
    navigate("/login", { replace: true });

    return config;
  };
  return (
    <div className="h-screen pt-20 min-h-max bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto ">
        <div className="flex flex-col w-11/12 mx-auto bg-white shadow-lg lg:flex-row lg:w-8/12 rounded-xl ">
          <div
            className="w-full lg:w-[56%] rounded-l-xl flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center transition duration-500 ease-in-out"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <h1 className="mb-3 text-3xl text-white">Register</h1>
            <div>
              <p className="text-white">
                Do you want to register as a{" "}
                <button
                  onClick={handleClick}
                  className="text-3xl font-semibold text-purple-500 cursor-pointer opacity-70 hover:opacity-100"
                >
                  trader
                </button>
                ?
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[44%] py-16 px-12">
            <h2 className="mb-4 text-3xl">Register</h2>
            <p className="mb-4 text-xl font-normal">
              You are applying to be a <span ref={text}>farmer</span>.
            </p>
            <form onSubmit={handleSubmit(onSubmitRegister)}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-2 py-1 border border-gray-400"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="text-sm text-red-500">
                    {errors.email?.message}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-2 py-1 border border-gray-400"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="text-sm text-red-500">
                    {errors.password?.message}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full px-2 py-1 border border-gray-400"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <div className="text-sm text-red-500">
                    {errors.fullName?.message}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-2 py-1 border border-gray-400"
                  {...register("address")}
                />
                {errors.address && (
                  <div className="text-sm text-red-500">
                    {errors.address?.message}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Phone number"
                  className="w-full px-2 py-1 border border-gray-400"
                  {...register("phone")}
                />
                {errors.phone && (
                  <div className="text-sm text-red-500">
                    {errors.phone?.message}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="checkbox"
                  className="border border-gray-400"
                  {...register("terms")}
                />
                <span>
                  {" "}
                  I accept the{" "}
                  <span className="font-semibold text-purple-500">
                    Terms of Use
                  </span>{" "}
                  &{" "}
                  <span className="font-semibold text-purple-500">
                    Privacy Policy
                  </span>
                </span>
                {errors.terms && (
                  <div className="text-sm text-red-500">
                    {errors.terms?.message}
                  </div>
                )}
              </div>
              <div className="mt-5">
                <input
                  type="submit"
                  value="Register Now"
                  className="w-full py-3 text-center text-white bg-purple-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;