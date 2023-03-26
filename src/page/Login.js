import React, { useContext } from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
  terms: yup.boolean().oneOf([true], "Checkbox is required"),
});

const Login = () => {
  const text = useRef();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitLogin = async () => {
    const email = getValues("email");

    const password = getValues("password");
    const config = {
      email: email,
      password: password,
    };
    const response = await loginAPI(config, dispatch);
    navigate("/", { replace: true });
    return response;
  };
  return (
    <div className="h-screen pt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto h-[100%]">
        <div className="flex flex-col w-11/12 lg:h-[75%] mx-auto bg-white shadow-lg lg:flex-row lg:w-8/12 rounded-xl ">
          <div
            className="flex flex-col items-center justify-center w-full p-12 bg-center bg-no-repeat bg-cover lg:w-1/2 rounded-l-xl"
            style={{
              backgroundImage: `url("https://assets.vogue.in/photos/640f0b07e90be009bbca4ca5/2:3/w_1920,c_limit/IMG-3055.jpg")`,
            }}
          >
            <h1 className="px-3 py-2 mb-3 text-2xl text-white border-2 rounded-lg cursor-pointer hover:border-pink-600 hover:text-pink-500">
              <a href="/register">Register</a>
            </h1>
            <div>
              <p className="text-white">
                Register to be a farmer or trader now.{" "}
              </p>
            </div>
          </div>
          <div className="w-full px-12 py-16 my-auto lg:w-1/2">
            <h2 className="mt-3 mb-5 text-4xl font-semibold text-center text-pink-500">
              Login
            </h2>

            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="mt-5">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md"
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
                  className="w-full px-3 py-2 border border-gray-400 rounded-md"
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

export default Login;
