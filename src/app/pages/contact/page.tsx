"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "phosphor-react";
import HeaderOne from "@/components/Header/HeaderOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { sendContactusEmail } from "../../../actions/mail";

const Contact = () => {
  const [contactUsFormData, setContactUsFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setContactUsFormData({ ...contactUsFormData, [name]: value });
  };

  const handleContactUsOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendContactusEmail(contactUsFormData);

      if (response.success) {
        console.log("mail sent");
        setContactUsFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        console.log("mail not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderOne />
      {/* <Breadcrumb
        img="/images/breadcrumb/1920x320.png"
        heading="Contact Us"
        subHeading="Reach Out to GlampHub. Your Gateway to Outdoor Luxury."
      /> */}
      <div className="contact-us lg:pt-20 md:pt-14 pt-10">
        <div className="container">
          <div className="flex justify-between max-lg:flex-col gap-y-10">
            <div className="left lg:w-1/2 lg:pr-[30px]">
              <div className="infor">
                {/* <div className="heading">
                  <div className="heading4">We’d love to help</div>
                  <div className="body2 text-variant1 mt-4">
                    Your Glamping Dreams, Our Expertise: Crafting Unforgettable
                    Adventures Together
                  </div>
                </div> */}
                <div className="style-contact-us">
                  <div className="list-social flex items-center flex-wrap gap-5 mt-4">
                    <Link
                      className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-primary hover:bg-primary hover:text-white"
                      href="https://www.facebook.com/wedeazzy"
                      target="_blank"
                    >
                      <i className="icon-facebook md:text-xl text-lg"></i>
                    </Link>
                    <Link
                      className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-primary hover:bg-primary hover:text-white"
                      href="https://www.linkedin.com/wedeazzy"
                      target="_blank"
                    >
                      <i className="icon-linkedin md:text-xl text-lg"></i>
                    </Link>
                    <Link
                      className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-primary hover:bg-primary hover:text-white"
                      href="https://www.twitter.com/wedeazzy"
                      target="_blank"
                    >
                      <i className="icon-twitter md:text-xl text-lg"></i>
                    </Link>
                    <Link
                      className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-primary hover:bg-primary hover:text-white"
                      href="https://www.youtube.com/wedeazzy"
                      target="_blank"
                    >
                      <i className="icon-youtube md:text-xl text-lg"></i>
                    </Link>
                    <Link
                      className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-primary hover:bg-primary hover:text-white"
                      href="https://www.instagram.com/wedeazzy"
                      target="_blank"
                    >
                      <i className="icon-instagram md:text-lg text-base"></i>
                    </Link>
                  </div>
                </div>
                <div className="list-more-infor mt-10">
                  <div className="item flex items-center gap-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary flex-shrink-0 rounded-full">
                      <Icon.EnvelopeSimpleOpen className="text-white text-2xl" />
                    </div>
                    <div className="w-px h-12 bg-outline"></div>
                    <div className="body2">wedeazzy@gmail.com</div>
                  </div>
                  <div className="item flex items-center gap-6 mt-5">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary flex-shrink-0 rounded-full">
                      <Icon.Phone className="text-white text-2xl" />
                    </div>
                    <div className="w-px h-12 bg-outline"></div>
                    <div className="body2">+91-9930090487</div>
                  </div>
                  <div className="item flex items-center gap-6 mt-5">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary flex-shrink-0 rounded-full">
                      <Icon.MapPinLine className="text-white text-2xl" />
                    </div>
                    <div className="w-px h-12 bg-outline"></div>
                    <div className="body2">
                      Mumbai, India Workafella Goregaon, AK Estate, Besides
                      Radisson Blu Hotel, S.V. Rd, Goregaon West, Mumbai,
                      Maharashtra 400062
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right lg:w-1/2 lg:pl-[30px]">
              <div className="heading4">Contact US</div>
              <div className="body2 text-variant1 mt-3">
                Connect with Us to Embark on a Journey to Create Your Dream
                Glamping Experience
              </div>
              <form className="md:mt-7 mt-4" onSubmit={handleContactUsOnSubmit}>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                  <div className="name">
                    <label htmlFor="username" className="text-variant1">
                      Name
                    </label>
                    <input
                      className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Your Name *"
                      required
                      value={contactUsFormData.name}
                      onChange={onchange}
                    />
                  </div>
                  <div className="email">
                    <label htmlFor="email" className="text-variant1">
                      Email
                    </label>
                    <input
                      className="border-line mt-2 px-4 pt-3 pb-3 w-full rounded-lg"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="Your Email *"
                      required
                      value={contactUsFormData.email}
                      onChange={onchange}
                    />
                  </div>
                  <div className="message sm:col-span-2">
                    <label htmlFor="message" className="text-variant1">
                      Message
                    </label>
                    <textarea
                      className="border-line mt-2 px-4 pt-3 pb-3 w-full rounded-lg"
                      name="message"
                      id="comments"
                      rows={3}
                      placeholder="Your Message *"
                      required
                      value={contactUsFormData.message}
                      onChange={onchange}
                    />
                  </div>
                </div>
                <div className="block-button md:mt-6 mt-4">
                  <button
                    className="button-main"
                    // type="submit"
                    id="submit"
                    name="send"
                  >
                    Send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="map-block lg:my-20 md:my-14 my-10">
        <div className="container">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4957789009245!2d72.84391787520784!3d19.17353638205126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b73af6b128cb%3A0x1d24311954e4e8e8!2sWorkafella%20Goregaon%20-%20Coworking%20Space%20in%20Mumbai!5e0!3m2!1sen!2sin!4v1729323802158!5m2!1sen!2sin"
              loading="lazy"
              className="w-full lg:h-[600px] md:h-[500px] sm:h-[400px] h-[360px] rounded-[20px]"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
