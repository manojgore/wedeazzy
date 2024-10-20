"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icon from "phosphor-react";
import { venuesData } from "../../data/dashboard";

const HeaderOne = () => {
  const pathname = usePathname();
  const [fixedHeader, setFixedHeader] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);
  const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null);
  const [city, setCity] = useState("mumbai"); // Default to 'mumbai'

  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    function helper() {
      setToken(JSON.parse(sessionStorage.getItem("token")));
      setUserType(sessionStorage.getItem("userType"));
    }
    helper();
  }, []);

  const handleOpenSubNavMobile = (index: number) => {
    setOpenSubNavMobile(openSubNavMobile === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFixedHeader(scrollPosition > 10);
      setLastScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const splitVenues = (venues: string[]) => {
    const chunkSize = 7;
    let chunks = [];
    for (let i = 0; i < venues.length; i += chunkSize) {
      chunks.push(venues.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const venueChunks = splitVenues(venuesData[city] || []);

  function handleLogout(e) {
    e.preventDefault();
    sessionStorage.clear();
    setToken(null);
    setUserType(null);
  }

  return (
    <>
      <div id="header" className="header">
        <div
          className={`header-main h-20 w-full bg-white min-[1322px]:px-10 px-4 flex items-center justify-between ${
            fixedHeader ? "fixed box-shadow" : ""
          }`}
        >
          <Link href={"/"} className="logo">
            <Image
              src={"/images/wedeazzy-logo.png"}
              width={2000}
              height={1000}
              alt="logo"
              priority={true}
              className="sm:w-[220px] w-[160px]"
            />
          </Link>

          <div className="menu-main h-full max-lg:hidden">
            <ul className="flex items-center xl:gap-[25px] gap-5 h-full">
              <li className="relative flex">
                <div className="position-relative flex">
                  <select
                    className="text-button py-1 px-3 border rounded"
                    onChange={(e) => setCity(e.target.value)}
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
              </li>
              {/* Venues  */}
              {/* Venues dropdown */}
              <li className="h-full relative group">
                <Link
                  href="#!"
                  className={`text-button  duration-300 h-full flex items-center justify-center gap-1 ${
                    pathname.includes("/camp/") ? "active" : ""
                  }`}
                >
                  Venues
                </Link>

                <div className="sub-menu absolute bg-white hidden group-hover:block shadow-lg">
                  <ul className="flex gap-2 p-4 bg-white">
                    {venueChunks.map((chunk, chunkIndex) => (
                      <div key={chunkIndex} className="d-flex flex-column">
                        {chunk.map((venue, index) => (
                          <li key={index} className="bg-white">
                            <Link
                              href={`/camp/${venue}`}
                              className={`link text-button text-variant1 p-2 duration-300 ${
                                pathname === `/camp/${venue}` ? "active" : ""
                              }`}
                            >
                              {venue}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </ul>
                </div>
              </li>
              {/* Vendors */}
              <li className="h-full relative group">
                <Link
                  href="#!"
                  className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${
                    pathname.includes("/camp/") ? "active" : ""
                  }`}
                >
                  Vendors
                </Link>
                <div className="sub-menu absolute bg-white hidden group-hover:block shadow-lg">
                  <ul className="flex gap-2 p-4 bg-white">
                    <div className="d-flex flex-column">
                      <li className="bg-white">
                        <Link
                          href="/camp/topmap-grid"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/topmap-grid" ? "active" : ""
                          }`}
                        >
                          Decorators
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/topmap-list"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/topmap-list" ? "active" : ""
                          }`}
                        >
                          Caterers
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/filter-scroll"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/filter-scroll" ? "active" : ""
                          }`}
                        >
                          Transports
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/filter-dropdown"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/filter-dropdown" ? "active" : ""
                          }`}
                        >
                          Wedding Planners
                        </Link>
                      </li>
                    </div>
                    <div className="d-flex flex-column">
                      <li className="bg-white">
                        <Link
                          href="/camp/topmap-grid"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/topmap-grid" ? "active" : ""
                          }`}
                        >
                          Rentals
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/topmap-list"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/topmap-list" ? "active" : ""
                          }`}
                        >
                          Tailoring
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/filter-scroll"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/filter-scroll" ? "active" : ""
                          }`}
                        >
                          Gifting
                        </Link>
                      </li>
                    </div>
                  </ul>
                </div>
              </li>
              {/* Services */}
              <li className="h-full relative group">
                <Link
                  href="#!"
                  className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${
                    pathname.includes("/camp/") ? "active" : ""
                  }`}
                >
                  Services
                </Link>
                <div className="sub-menu absolute bg-white hidden group-hover:block shadow-lg">
                  <ul className="flex gap-2 p-4 bg-white">
                    <div className="d-flex flex-column">
                      <li className="bg-white">
                        <Link
                          href="/camp/topmap-grid"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/topmap-grid" ? "active" : ""
                          }`}
                        >
                          Photographers
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/topmap-list"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/topmap-list" ? "active" : ""
                          }`}
                        >
                          Makeup Artists
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/filter-scroll"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/filter-scroll" ? "active" : ""
                          }`}
                        >
                          Mehndi Artists
                        </Link>
                      </li>
                      <li className="bg-white">
                        <Link
                          href="/camp/filter-dropdown"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/filter-dropdown" ? "active" : ""
                          }`}
                        >
                          DJs
                        </Link>
                      </li>
                    </div>
                    <div className="d-flex flex-column">
                      <li className="bg-white">
                        <Link
                          href="/camp/topmap-grid"
                          className={`link text-button text-variant1 p-2 duration-300 ${
                            pathname === "/camp/topmap-grid" ? "active" : ""
                          }`}
                        >
                          Choreographers
                        </Link>
                      </li>
                    </div>
                  </ul>
                </div>
              </li>
              {token && userType === "user" && (
                <li className="h-full relative">
                  <Link
                    href="/dashboard/user"
                    className={`text-button duration-300 h-full flex items-center justify-center gap-1  ${
                      pathname === "/pages/contact" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {!token && (
                <li className="h-full relative">
                  <Link
                    href="/pages/contact"
                    className={`text-button duration-300 h-full flex items-center justify-center gap-1  ${
                      pathname === "/pages/contact" ? "active" : ""
                    }`}
                  >
                    Contact Us
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="right flex items-center gap-3">
            {/* <div className="bg-outline w-px h-4 max-sm:hidden"></div> */}
            {token ? (
              <>
                <div className="bg-outline w-px h-4 max-sm:hidden"></div>
                <button
                  onClick={handleLogout}
                  className="text-button max-sm:hidden"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link href={"/login"} className="text-button max-sm:hidden">
                Sign In
              </Link>
            )}

            <div
              className="menu-mobile-icon lg:hidden flex items-center ml-4"
              onClick={() => setOpenMenuMobile(true)}
            >
              <Icon.List
                className="sm:text-xl text-2xl text-black"
                weight="bold"
              />
            </div>
          </div>
        </div>
      </div>

      <div id="menu-mobile" className={`${openMenuMobile ? "open" : ""}`}>
        <div className="menu-container bg-white h-full">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <div
                  className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={() => setOpenMenuMobile(false)}
                >
                  <Icon.X size={14} />
                </div>
                <Link href={"/"} className="logo text-center">
                  <Image
                    src={"/images/wedeazzy-logo.png"}
                    width={3000}
                    height={2000}
                    alt="logo"
                    priority={true}
                    className="md:w-[220px] w-[180px]"
                  />
                </Link>
              </div>
              <div className="list-nav mt-6">
                <ul>
                  <li
                    className={`${openSubNavMobile === 1 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(1)}
                  >
                    <a
                      href={"#!"}
                      className={`text-title uppercase flex items-center justify-between`}
                    >
                      Home
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(1)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-2 pb-6">
                        <ul>
                          <li>
                            <Link
                              href="/"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/" ? "active" : ""
                              }`}
                            >
                              Homepage 1
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/homepages/home2"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/homepages/home2" ? "active" : ""
                              }`}
                            >
                              Homepage 2
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/homepages/home3"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/homepages/home3" ? "active" : ""
                              }`}
                            >
                              Homepage 3
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 2 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(2)}
                  >
                    <a
                      href={"#!"}
                      className="text-title uppercase flex items-center justify-between mt-5"
                    >
                      Camps
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(2)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-2 pb-6">
                        <ul>
                          <li>
                            <Link
                              href="/camp/topmap-grid"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/topmap-grid" ? "active" : ""
                              }`}
                            >
                              Find Topmap Grid
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/camp/topmap-list"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/topmap-list" ? "active" : ""
                              }`}
                            >
                              Find Topmap List
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/camp/filter-scroll"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/filter-scroll"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Filters Scrolls
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/camp/filter-dropdown"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/filter-dropdown"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Filters Dropdown
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/camp/topmap-sidebar"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/topmap-sidebar"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Find Topmap Sidebar
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/camp/halfmap-grid"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/halfmap-grid"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Find Halfmap Grid
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/camp/halfmap-list"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/halfmap-list"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Find Halfmap List
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/camp/tent-detail"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${
                                pathname === "/camp/tent-detail" ? "active" : ""
                              }`}
                            >
                              Tent Details
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href={"/about"}
                      className="text-title uppercase flex items-center justify-between mt-5"
                    >
                      About Us
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </Link>
                  </li>
                  <li
                    className={`${openSubNavMobile === 4 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(4)}
                  >
                    <a
                      href={"#!"}
                      className="text-title uppercase flex items-center justify-between mt-5"
                    >
                      Blog
                      <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span>
                    </a>
                    <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(4)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-2 pb-6">
                        <ul className="w-full">
                          <li>
                            <Link
                              href="/blog/default"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${
                                pathname === "/blog/default" ? "active" : ""
                              }`}
                            >
                              Blog Default
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog/grid"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${
                                pathname === "/blog/grid" ? "active" : ""
                              }`}
                            >
                              Blog Grid
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/blog/detail"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${
                                pathname === "/blog/detail" ? "active" : ""
                              }`}
                            >
                              Blog Detail
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li
                    className={`${openSubNavMobile === 5 ? "open" : ""}`}
                    onClick={() => handleOpenSubNavMobile(5)}
                  >
                    <a
                      href="/pages/contact"
                      className="text-title uppercase flex items-center justify-between mt-5"
                    >
                      Contact Us
                      {/* <span className="text-right">
                        <Icon.CaretRight size={20} />
                      </span> */}
                    </a>
                    {/* <div className="sub-nav-mobile">
                      <div
                        className="back-btn flex items-center gap-3"
                        onClick={() => handleOpenSubNavMobile(5)}
                      >
                        <Icon.CaretLeft />
                        Back
                      </div>
                      <div className="list-nav-item w-full pt-2 pb-6">
                        <ul className="w-full">
                          <li>
                            <Link
                              href="/pages/contact"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${
                                pathname === "/pages/contact" ? "active" : ""
                              }`}
                            >
                              Contact Us
                            </Link>
                          </li>
                           <li>
                            <Link
                              href="/pages/faqs"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${
                                pathname === "/pages/faqs" ? "active" : ""
                              }`}
                            >
                              FAQs
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/pages/review"
                              className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${
                                pathname === "/pages/review" ? "active" : ""
                              }`}
                            >
                              Review
                            </Link>
                          </li> 
                        </ul>
                      </div>
                    </div> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderOne;
