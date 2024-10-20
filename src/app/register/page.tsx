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
import { userSignup } from "../../actions/user";
import { sendEmailVerificationOtp } from "../../actions/mail";
import { sendMobileVerificationOtp } from "../../actions/sms";

const Register = () => {
  // Setting up state for form fields
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emailotp: "",
    mobile: "",
    mobileotp: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [recOtp, setRecOtp] = useState("");

  const sendOTP = async () => {
    if (!formData.email) {
      toast.error("Please enter a valid email!");
      return;
    }

    try {
      setOtpLoading(true);

      const response = await sendEmailVerificationOtp(formData.email);

      if (!response.success) {
        toast.error("Failed to send Email OTP!");
        return;
      }

      if (response.success) {
        setRecOtp(response.otp);
      }

      setOtpSent(true);

      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP!");
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!formData.emailotp) {
      toast.error("Please enter the OTP!");
      return;
    }

    try {
      setVerifyLoading(true);

      if (recOtp != formData.emailotp) {
        toast.error("Wrong OTP, please try again!");
        return;
      } else if (recOtp == formData.emailotp) {
        setOtpVerified(true);
        toast.success("Email verified successfully!");
        return;
      }
    } catch (error) {
      toast.error("Invalid OTP, please try again!");
    } finally {
      setVerifyLoading(false);
    }
  };

  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [mobileVerifyLoading, setMobileVerifyLoading] = useState(false);

  const [recMobileOtp, setRecMobileOtp] = useState("");

  const sendMobileOTP = async () => {
    if (!formData.mobile) {
      toast.error("Please enter your mobile number!");
      return;
    }

    try {
      setMobileOtpLoading(true);

      const name = formData.firstName + " " + formData.lastName;
      const response = await sendMobileVerificationOtp(formData.mobile, name);

      if (!response.success) {
        toast.error("Failed to send Mobile OTP!");
        return;
      }

      if (response.success) {
        setRecMobileOtp(response.otp);
      }

      setMobileOtpSent(true);
      toast.success("Mobile OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send Mobile OTP!");
    } finally {
      setMobileOtpLoading(false);
    }
  };

  const verifyMobileOTP = async () => {
    if (!formData.mobileotp) {
      toast.error("Please enter the OTP sent to your mobile!");
      return;
    }

    try {
      setMobileVerifyLoading(true);

      if (recMobileOtp != formData.mobileotp) {
        toast.error("Wrong OTP, please try again!");
        return;
      } else if (recOtp == formData.mobileotp) {
        setMobileOtpVerified(true);
        toast.success("Mobile number verified successfully!");
        return;
      }
    } catch (error) {
      toast.error("Invalid Mobile OTP, please try again!");
    } finally {
      setMobileVerifyLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation before submission
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.agree) {
      toast.error("You must agree to the Terms of Use.");
      setIsSubmitting(false);
      return;
    }

    const response = await userSignup(formData);

    if (response === false) {
      toast.error("Signup Failed!");
      // console.log(response.error);
    } else {
      toast.success("Signup Successfull");
      router.push("/");
    }

    // Reset form (optional)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      emailotp: "",
      mobile: "",
      mobileotp: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });

    setIsSubmitting(false);

    router.push("/");
    return false;
  };

  return (
    <>
      <ToastContainer />
      <HeaderOne />
      {/* <Breadcrumb
        img="/images/breadcrumb/1920x320.png"
        heading="Register"
        subHeading="Access Your Account. GlampHub's Secure Register Experience."
      /> */}
      <div className="login-us lg:py-10 md:py-8 py-8">
        <div className="container">
          <div className="content flex items-center justify-center">
            <div
              id="form-login"
              className="xl:basis-1/3 lg:basis-1/2 sm:basis-2/3 max-sm:w-full"
            >
              <div className="heading3 text-center">Register</div>
              <form className="md:mt-10 mt-6" onSubmit={handleSubmit}>
                <div className="firstName mt-5">
                  <label htmlFor="firstName" className="text-variant1">
                    First Name<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="lastName mt-5">
                  <label htmlFor="lastName" className="text-variant1">
                    Last Name<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* <div className="email mt-5">
                  <label htmlFor="email" className="text-variant1">
                    Email<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <button className="border-line bg-primary text-white px-4 pt-1 pb-1 rounded-lg mt-1">
                    Send OTP
                  </button>
                </div>
                <div className="email mt-5">
                  <label htmlFor="email" className="text-variant1">
                    Enter Email OTP<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="emailotp"
                    name="emailotp"
                    type="text"
                    value={formData.emailotp}
                    onChange={handleChange}
                    required
                  />
                  <button className="border-line bg-primary text-white px-4 pt-1 pb-1 rounded-lg mt-1">
                    Verify Email
                  </button>
                </div> */}

                <div className="email mt-5">
                  <label htmlFor="email" className="text-variant1">
                    Email<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="border-line bg-primary text-white px-4 pt-1 pb-1 rounded-lg mt-1"
                    onClick={sendOTP}
                    disabled={otpLoading || otpSent}
                  >
                    {otpLoading ? "Sending..." : "Send OTP"}
                  </button>
                </div>

                {otpSent && (
                  <div className="email mt-5">
                    <label htmlFor="emailotp" className="text-variant1">
                      Enter Email OTP<span className="text-primary">*</span>
                    </label>
                    <input
                      className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                      id="emailotp"
                      name="emailotp"
                      type="text"
                      value={formData.emailotp}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="border-line bg-primary text-white px-4 pt-1 pb-1 rounded-lg mt-1"
                      onClick={verifyOTP}
                      disabled={verifyLoading || otpVerified}
                    >
                      {verifyLoading
                        ? "Verifying..."
                        : otpVerified
                        ? "Verified"
                        : "Verify Email"}
                    </button>
                  </div>
                )}

                {/* <div className="mobile mt-5">
                  <label htmlFor="mobile" className="text-variant1">
                    Mobile<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="mobile"
                    name="mobile"
                    type="text"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div> */}
                <div className="mobile mt-5">
                  <label htmlFor="mobile" className="text-variant1">
                    Mobile<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="mobile"
                    name="mobile"
                    type="text"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="border-line bg-primary text-white px-4 pt-1 pb-1 rounded-lg mt-1"
                    onClick={sendMobileOTP}
                    disabled={mobileOtpLoading || mobileOtpSent}
                  >
                    {mobileOtpLoading ? "Sending..." : "Send OTP"}
                  </button>
                </div>

                {mobileOtpSent && (
                  <div className="mobile mt-5">
                    <label htmlFor="mobileotp" className="text-variant1">
                      Enter Mobile OTP<span className="text-primary">*</span>
                    </label>
                    <input
                      className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                      id="mobileotp"
                      name="mobileotp"
                      type="text"
                      value={formData.mobileotp}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="border-line bg-primary text-white px-4 pt-1 pb-1 rounded-lg mt-1"
                      onClick={verifyMobileOTP}
                      disabled={mobileVerifyLoading || mobileOtpVerified}
                    >
                      {mobileVerifyLoading
                        ? "Verifying..."
                        : mobileOtpVerified
                        ? "Verified"
                        : "Verify Mobile"}
                    </button>
                  </div>
                )}

                <div className="password mt-5">
                  <label htmlFor="password" className="text-variant1">
                    Password<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="confirmPassword mt-5">
                  <label htmlFor="confirmPassword" className="text-variant1">
                    Confirm Password<span className="text-primary">*</span>
                  </label>
                  <input
                    className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex items-center mt-5">
                  <div className="checkbox-input">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      required
                    />
                    <Icon.CheckSquare
                      size={20}
                      weight="fill"
                      className="icon-checkbox"
                    />
                  </div>
                  <label
                    htmlFor="agree"
                    className="pl-2 cursor-pointer caption1 text-variant1"
                  >
                    I agree to the
                    <Link
                      href={"/term-of-use"}
                      className="text-button-sm text-black has-line ml-1"
                    >
                      Terms of Use<span className="text-primary">*</span>
                    </Link>
                  </label>
                </div>
                <div className="block-button mt-6">
                  <button
                    className="button-main w-full text-center"
                    // type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="caption1 text-variant1">
                  Already have an account?
                </div>
                <Link
                  href={"/login"}
                  className="text-button-sm text-black has-line"
                >
                  Login
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

export default Register;
