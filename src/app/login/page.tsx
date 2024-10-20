"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import * as Icon from "phosphor-react";
import HeaderOne from "@/components/Header/HeaderOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { userLogin } from "../../actions/user";

const Login = () => {
  // Define states for form inputs and submission feedback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const response = await userLogin({ email: email, password: password });

    if (response.success === false) {
      toast.error("Incorrect Password!");
    } else {
      toast.success("SignedIn successfully!");
      sessionStorage.setItem("token", JSON.stringify({ user: response.user }));
      sessionStorage.setItem("userType", "user");
      router.push("/");
    }
    setIsSubmitting(false);
    return;
  };

  return (
    <>
      <ToastContainer />
      <HeaderOne />
      {/* <Breadcrumb
        img="/images/breadcrumb/1920x320.png"
        heading="login"
        subHeading="Access Your Account. GlampHub's Secure Login Experience."
      /> */}
      <div className="login-us lg:py-10 md:py-8 py-8">
        <div className="container">
          <div className="content flex items-center justify-center">
            <div
              id="form-login"
              className="xl:basis-1/3 lg:basis-1/2 sm:basis-2/3 max-sm:w-full"
            >
              <div className="heading3 text-center">Login</div>
              <form className="md:mt-10 mt-6" onSubmit={handleSubmit}>
                <div className="email">
                  <label htmlFor="username" className="text-variant1">
                    Email address
                    <span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="username"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="pass mt-5">
                  <label htmlFor="password" className="text-variant1">
                    Password<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between flex-wrap mt-5">
                  <div className="flex items-center">
                    <div className="checkbox-input">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <Icon.CheckSquare
                        size={20}
                        weight="fill"
                        className="icon-checkbox"
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="pl-2 cursor-pointer caption1 text-variant1"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    href={"#!"}
                    className="caption1 text-primary has-line line-primary"
                  >
                    Forget Your Password?
                  </Link>
                </div>
                <div className="block-button mt-6">
                  <button
                    className="button-main w-full text-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="caption1 text-variant1">Business owner?</div>
                <Link
                  href={"/login-vendor"}
                  className="text-button-sm text-primary has-line"
                >
                  Business Login
                </Link>
              </div>
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="caption1 text-variant1">
                  Not registered yet?
                </div>
                <Link
                  href={"/register"}
                  className="text-button-sm text-black has-line"
                >
                  User Register
                </Link>
                <span> or </span>
                <Link
                  href={"/register-vendor"}
                  className="text-button-sm text-black has-line"
                >
                  Business Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
