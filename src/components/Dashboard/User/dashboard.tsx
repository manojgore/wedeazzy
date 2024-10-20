"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "phosphor-react";

const UserDashboardComponent = () => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    function helper() {
      setToken(JSON.parse(sessionStorage.getItem("token")));
      setUserType(sessionStorage.getItem("userType"));
    }
    helper();
  }, []);

  return (
    <>
      <div className="d-flex flex-column p-6 bg-light border-light rounded-lg shadow w-100">
        <div className="heading4">{userType} Dashboard</div>
        <br />
        <hr />
        <div className="body2 text-variant1 mt-3">
          Connect with Us to Embark on a Journey to Create Your Dream Glamping
          Experience
        </div>
      </div>
    </>
  );
};

export default UserDashboardComponent;
