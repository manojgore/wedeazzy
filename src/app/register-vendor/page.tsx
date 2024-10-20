"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import * as Icon from "phosphor-react";
import HeaderOne from "@/components/Header/HeaderOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { businessSignup } from "../../actions/business";
import { sendEmailVerificationOtp } from "../../actions/mail";
import { sendMobileVerificationOtp } from "../../actions/sms";

const VendorRegister = () => {
  const [type, setType] = useState("venues");

  // Setting up state for form fields
  const [formData, setFormData] = useState({
    businessName: "",
    city: "mumbai",
    businessType: "venues",
    name: "",
    email: "",
    emailotp: "",
    mobile: "",
    mobileotp: "",
    password: "",
    confirmPassword: "",
    registrationType: "getMoreBusiness",
    agree: false,
  });

  const handleTypeChange = (newType) => {
    setType(newType);

    // Update formData.name based on the selected type
    setFormData((prevFormData) => ({
      ...prevFormData,
      businessType: newType === "venues" ? "venues" : "Decorators",
    }));
  };

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

      const response = await sendMobileVerificationOtp(
        formData.mobile,
        formData.businessName
      );

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
      !formData.businessName ||
      !formData.city ||
      !formData.businessType ||
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.registrationType
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

    const response = await businessSignup(formData);

    if (response.success === false) {
      toast.error("Incorrect Password!");
    } else {
      toast.success("SignedIn successfully!");
    }

    setIsSubmitting(false);

    // Reset form (optional)
    setFormData({
      businessName: "",
      city: "mumbai",
      businessType: "venues",
      name: "",
      email: "",
      emailotp: "",
      mobile: "",
      mobileotp: "",
      password: "",
      confirmPassword: "",
      registrationType: "getMoreBusiness",
      agree: false,
    });

    return;
  };

  return (
    <>
      <ToastContainer />
      <HeaderOne />
      {/* <Breadcrumb
        img="/images/breadcrumb/1920x320.png"
        heading="Business Register"
        subHeading="Access Your Account. GlampHub's Secure Register Experience."
      /> */}
      <div className="login-us lg:py-10 md:py-8 py-8">
        <div className="container">
          <div className="content flex items-center justify-center">
            <div
              id="form-login"
              className="xl:basis-1/3 lg:basis-1/2 sm:basis-2/3 max-sm:w-full"
            >
              <div className="heading3 text-center">Business Register</div>
              <div className="content flex items-center justify-evenly mt-4">
                <button
                  className={`py-2 px-3 rounded-lg ${
                    type === "venues"
                      ? "text-white bg-primary"
                      : "text-gray-500 bg-gray-200"
                  }`}
                  onClick={() => handleTypeChange("venues")}
                >
                  Venue Registration
                </button>

                <button
                  className={`py-2 px-3 rounded-lg ${
                    type === "vendors"
                      ? "text-white bg-primary"
                      : "text-gray-500 bg-gray-200"
                  }`}
                  onClick={() => handleTypeChange("vendors")}
                >
                  Vendor Registration
                </button>
              </div>
              {type === "venues" && (
                <form className="md:mt-10 mt-6" onSubmit={handleSubmit}>
                  <div className="firstName mt-5">
                    <label htmlFor="businessName" className="text-variant1">
                      Business Name<span className="text-primary">*</span>
                    </label>
                    <input
                      className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                      id="businessName"
                      name="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="firstName mt-5">
                    <label htmlFor="city" className="text-variant1">
                      City :<span className="text-primary">*</span>
                    </label>
                    <select
                      className="border-line w-full py-1 px-3 border rounded-lg"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">New Delhi</option>
                      <option value="jaipur">Jaipur</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="pune">Pune</option>
                      <option value="chennai">Chennai</option>
                      <option value="goa">Goa</option>
                    </select>
                  </div>

                  <div className="lastName mt-5">
                    <label htmlFor="name" className="text-variant1">
                      Your Name<span className="text-primary">*</span>
                    </label>
                    <input
                      className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
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
                  <div className="radio-group flex justify-between mt-5">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="registrationType"
                        value="getMoreBusiness"
                        checked={
                          formData.registrationType === "getMoreBusiness"
                        }
                        onChange={handleChange}
                        className="mr-2 text-variant1"
                      />
                      Get More Business
                    </label>

                    <label className="flex items-center cursor-pointer ml-4">
                      <input
                        type="radio"
                        name="registrationType"
                        value="getMoreVisibility"
                        checked={
                          formData.registrationType === "getMoreVisibility"
                        }
                        onChange={handleChange}
                        className="mr-2 text-variant1"
                      />
                      Get More Visibility
                    </label>

                    <label className="flex items-center cursor-pointer ml-4">
                      <input
                        type="radio"
                        name="registrationType"
                        value="both"
                        checked={formData.registrationType === "both"}
                        onChange={handleChange}
                        className="mr-2 text-variant1"
                      />
                      Both
                    </label>
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
              )}
              {type === "vendors" && (
                <form className="md:mt-10 mt-6" onSubmit={handleSubmit}>
                  <div className="firstName mt-5">
                    <label htmlFor="businessName" className="text-variant1">
                      Business Name<span className="text-primary">*</span>
                    </label>
                    <input
                      className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                      id="businessName"
                      name="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="firstName mt-5">
                    <label htmlFor="city" className="text-variant1">
                      City :<span className="text-primary">*</span>
                    </label>
                    <select
                      className="border-line w-full py-1 px-3 border rounded-lg"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    >
                      <option value="mumbai">Mumbai</option>
                      <option value="delhi">New Delhi</option>
                      <option value="jaipur">Jaipur</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="pune">Pune</option>
                      <option value="chennai">Chennai</option>
                      <option value="goa">Goa</option>
                    </select>
                  </div>

                  <div className="firstName mt-5">
                    <label htmlFor="businessType" className="text-variant1">
                      Type of Business :<span className="text-primary">*</span>
                    </label>
                    <select
                      className="border-line w-full py-1 px-3 border rounded-lg"
                      name="businessType"
                      id="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Decorators">Decorators</option>
                      <option value="Caterers">Caterers</option>
                      <option value="Transports">Transports</option>
                      <option value="Wedding Planners">Wedding Planners</option>
                      <option value="Rentals">Rentals</option>
                      <option value="Tailoring">Tailoring</option>
                      <option value="Gifting">Gifting</option>
                      <option value="Photographers">Photographers</option>
                      <option value="Makeup Artists">Makeup Artists</option>
                      <option value="Mehndi Artists">Mehndi Artists</option>
                      <option value="DJs">DJs</option>
                      <option value="Choreographers">Choreographers</option>
                    </select>
                  </div>
                  <div className="lastName mt-5">
                    <label htmlFor="name" className="text-variant1">
                      Your Name<span className="text-primary">*</span>
                    </label>
                    <input
                      className="border-line px-4 pt-1 pb-1 w-full rounded-lg mt-1"
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
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
                  <div className="radio-group flex justify-between mt-5">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="registrationType"
                        value="getMoreBusiness"
                        checked={
                          formData.registrationType === "getMoreBusiness"
                        }
                        onChange={handleChange}
                        className="mr-2 text-variant1"
                      />
                      Get More Business
                    </label>

                    <label className="flex items-center cursor-pointer ml-4">
                      <input
                        type="radio"
                        name="registrationType"
                        value="getMoreVisibility"
                        checked={
                          formData.registrationType === "getMoreVisibility"
                        }
                        onChange={handleChange}
                        className="mr-2 text-variant1"
                      />
                      Get More Visibility
                    </label>

                    <label className="flex items-center cursor-pointer ml-4">
                      <input
                        type="radio"
                        name="registrationType"
                        value="both"
                        checked={formData.registrationType === "both"}
                        onChange={handleChange}
                        className="mr-2 text-variant1"
                      />
                      Both
                    </label>
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
              )}
              <div className="flex items-center justify-center gap-2 mt-5">
                <div className="caption1 text-variant1">
                  Already have a business account?
                </div>
                <Link
                  href={"/login-vendor"}
                  className="text-button-sm text-primary has-line"
                >
                  Business Login
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

export default VendorRegister;
