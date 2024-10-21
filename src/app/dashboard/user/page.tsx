"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "phosphor-react";
import HeaderOne from "@/components/Header/HeaderOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { sendContactusEmail } from "../../../actions/mail";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UserDashboardComponent from "../../../components/Dashboard/User/dashboard";

const UserDashboard = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Dashboard");

  function handleLogout() {
    toast.success("Logout Success!");
    sessionStorage.clear();
    router.push("/");
  }

  const handleItemClick = (item) => {
    setActiveItem(item);
    // You can handle navigation here based on the clicked item
    if (item === "Logout") {
      handleLogout();
      console.log("Logging out...");
    } else {
      console.log(`Navigating to ${item}...`);
    }
  };

  return (
    <>
      <HeaderOne />
      
      <div className="contact-us lg:pt-20 md:pt-14 pt-10">
        <div className="container">
          <div className="flex justify-evenly max-lg:flex-col">
            <div className="left lg:w-100 mb-4">
              <div className="d-flex flex-column p-3 bg-light border-light rounded-lg shadow">
                {/* <h4 className="mb-4">User Panel</h4> */}
                <ul className="nav flex-column">
                  {[
                    "Dashboard",
                    "My Wishlist",
                    "My Orders",
                    "Change Password",
                    "Edit Profile",
                    "Logout",
                  ].map((item) => (
                    <li key={item} className="nav-item py-3">
                      <button
                        className={`nav-link btn btn-link text-start ${
                          activeItem === item ? "active text-primary" : ""
                        }`}
                        onClick={() => handleItemClick(item)}
                        style={{ textDecoration: "none" }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right w-100">
              {activeItem === "Dashboard" && <UserDashboardComponent />}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="map-block lg:my-20 md:my-14 my-10">
        <div className="container">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
              loading="lazy"
              className="w-full lg:h-[600px] md:h-[500px] sm:h-[400px] h-[360px] rounded-[20px]"
            ></iframe>
          </div>
        </div>
      </div> */}
      <Footer />
    </>
  );
};

export default UserDashboard;
