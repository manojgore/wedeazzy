"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function TextAnimation() {
  return (
    <h4 className="heading fw-bold text-white title-dark mb-3">
      We Will Help You Plan
      <br />
      your
      <TypeAnimation
        sequence={["SCENIC", 1000, "DREAM", 1000]}
        wrapper="span"
        speed={2}
        repeat={Infinity}
        className="heading2 typewrite text-primary ms-2"
        cursor={false}
      />{" "}
      Wedding
    </h4>
  );
}
