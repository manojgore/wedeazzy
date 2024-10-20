import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as Icon from "phosphor-react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import TextAnimation from "../TextHeading/TextAnimation";
// import SelectThree from "../TextHeading/SelectThree";

interface GuestType {
  adult: number;
  children: number;
  infant: number;
  pet: number;
}

const SliderOne = () => {
  const router = useRouter();
  const [openDate, setOpenDate] = useState(false);
  const [openGuest, setOpenGuest] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [guest, setGuest] = useState<GuestType>({
    adult: 0,
    children: 0,
    infant: 0,
    pet: 0,
  });

  const handleOpenDate = () => {
    setOpenDate(!openDate);
    setOpenGuest(false);
  };

  const handleOpenGuest = () => {
    setOpenGuest(!openGuest);
    setOpenDate(false);
  };

  // Check if the click event occurs outside the popup.
  const handleClickOutsideDatePopup: EventListener = useCallback(
    (event) => {
      // Cast event.target to Element to use the closest method.
      const targetElement = event.target as Element;

      if (openDate && !targetElement.closest(".form-date-picker")) {
        setOpenDate(false);
      }
    },
    [openDate]
  );

  // Check if the click event occurs outside the popup.
  const handleClickOutsideGuestPopup: EventListener = useCallback(
    (event) => {
      // Cast event.target to Element to use the closest method.
      const targetElement = event.target as Element;

      if (openGuest && !targetElement.closest(".sub-menu-guest")) {
        setOpenGuest(false);
      }
    },
    [openGuest]
  );

  useEffect(() => {
    // Add a global click event to track clicks outside the popup.
    document.addEventListener("click", handleClickOutsideDatePopup);
    document.addEventListener("click", handleClickOutsideGuestPopup);

    // Cleanup to avoid memory leaks.
    return () => {
      document.removeEventListener("click", handleClickOutsideDatePopup);
      document.removeEventListener("click", handleClickOutsideGuestPopup);
    };
  }, [handleClickOutsideDatePopup, handleClickOutsideGuestPopup]);

  // Increase number
  const increaseGuest = (type: keyof GuestType) => {
    setGuest((prevGuest) => ({
      ...prevGuest,
      [type]: prevGuest[type] + 1,
    }));
  };

  // Decrease number
  const decreaseGuest = (type: keyof GuestType) => {
    if (guest[type] > 0) {
      setGuest((prevGuest) => ({
        ...prevGuest,
        [type]: prevGuest[type] - 1,
      }));
    }
  };

  const handleSearch = () => {
    router.push(
      `/camp/topmap-grid?location=${location}&startDate=${state[0].startDate.toLocaleDateString()}&endDate=${state[0].endDate.toLocaleDateString()}&adult=${
        guest.adult
      }&children=${guest.children}&infant=${guest.infant}&pet=${guest.pet}`
    );
  };

  const [id, setId] = useState(0);

  return (
    <>
      <div className="slider-block style-one relative h-[620px]">
        <div className="bg-img absolute top-0 left-0 w-full h-full">
          <Image
            src="/images/hero.jpg"
            width={4000}
            height={3000}
            alt="slider"
            priority={true}
            // className="w-100 h-100"
            className="w-full h-full object-cover "
            style={{
              objectFit: "cover",
              filter: "brightness(80%)",
              animation: "zoomInLeftOut 10s ease-in-out infinite",
            }}
          />
        </div>
        <div className="container py-[176px] ">
          <div className="content w-full relative">
            <div className="heading flex-col items-center justify-center">
              <div className="heading2 text-white text-center">
                <TextAnimation />
              </div>
              <div className="heading6 text-white text-center mt-3">
                A great platform to plan you wedding, with varities of
                <br className="max-sm:hidden" />
                <span> </span>
                venues, vendors and servies.
              </div>
            </div>

            <div className="form-search mt-5 mb-3 w-full">
              <div className="form-search w-full">
                <button
                  className={`px-3 py-2 mr-1 rounded-lg ${
                    id === 0 ? "bg-primary text-white" : "bg-white"
                  }`}
                  onClick={() => setId(0)}
                >
                  Venues
                </button>

                <button
                  className={`px-3 py-2 m-1 rounded-lg ${
                    id === 1 ? "bg-primary text-white" : "bg-white"
                  }`}
                  onClick={() => setId(1)}
                >
                  Vendors
                </button>

                <button
                  className={`px-3 py-2 m-1 rounded-lg ${
                    id === 2 ? "bg-primary text-white" : "bg-white"
                  }`}
                  onClick={() => setId(2)}
                >
                  Services
                </button>
              </div>
              <form className="bg-white rounded-lg  p-3 flex max-lg:flex-wrap items-center justify-between gap-2 relative">
                <div className="select-block lg:w-full md:w-[48%] w-full">
                  <Icon.MagnifyingGlass className="icon text-xl left-5" />
                  <input
                    type="text"
                    className="body3 w-full pl-12 pr-5 py-2 border border-outline rounded-lg"
                    value={keywords}
                    placeholder="Search... "
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
                <div className="select-block lg:w-full md:w-[48%] w-full">
                  {id === 0 && (
                    <>
                      <Icon.MapPin className="icon text-xl left-5" />
                      <select
                        className="body3 w-full pl-12 pr-5 py-2 border border-outline rounded-lg"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">New Delhi</option>
                        <option value="jaipur">Jaipur</option>
                        <option value="gujarat">Gujarat</option>
                        <option value="pune">Pune</option>
                        <option value="chennai">Chennai</option>
                        <option value="goa">Goa</option>
                      </select>
                    </>
                  )}
                  {id === 1 && (
                    <>
                      <Icon.List className="icon text-xl left-5" />
                      <select
                        className="body3 w-full pl-12 pr-5 py-2 border border-outline rounded-lg"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="decorators">Decorators</option>
                        <option value="caterors">Caterors</option>
                        <option value="Transports">Transports</option>
                        <option value="Wedding Planners">
                          Wedding Planners
                        </option>
                        <option value="Rental">Rental</option>
                        <option value="Tailoring">Tailoring</option>
                        <option value="Gifting">Gifting</option>
                      </select>
                    </>
                  )}
                  {id === 2 && (
                    <>
                      <Icon.List className="icon text-xl left-5" />
                      <select
                        className="body3 w-full pl-12 pr-5 py-2 border border-outline rounded-lg"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="Photographers">Photographers</option>
                        <option value="Makeup Artists">Makeup Artists</option>
                        <option value="Mehndi Artists">Mehndi Artists</option>
                        <option value="DJs">DJs</option>
                        <option value="Choreographers">Choreographers</option>
                      </select>
                    </>
                  )}
                </div>
                <div className="relative lg:w-full md:w-[48%] w-full">
                  <div className="select-block w-full" onClick={handleOpenDate}>
                    <Icon.CurrencyInr className="icon text-xl left-5" />
                    <select
                      className="body3 w-full pl-12 pr-5 py-2 border border-outline rounded-lg"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    >
                      <option value="">Min Price...</option>
                      <option value="50000">50000</option>
                      <option value="100000">100000</option>
                      <option value="150000">150000</option>
                      <option value="200000">200000</option>
                      <option value="500000">500000</option>
                      <option value="1000000">1000000</option>
                      <option value="2000000">2000000</option>
                    </select>
                  </div>
                </div>
                <div className="relative lg:w-full md:w-[48%] w-full">
                  <div className="select-block w-full" onClick={handleOpenDate}>
                    <Icon.CurrencyInr className="icon text-xl left-5" />
                    <select
                      className="body3 w-full pl-12 pr-5 py-2 border border-outline rounded-lg"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    >
                      <option value="">Max Price...</option>
                      <option value="50000">50000</option>
                      <option value="100000">100000</option>
                      <option value="150000">150000</option>
                      <option value="200000">200000</option>
                      <option value="500000">500000</option>
                      <option value="1000000">1000000</option>
                      <option value="2000000">2000000</option>
                    </select>
                  </div>
                </div>
                <div className="button-block flex-shrink-0 max-lg:w-[48%] max-md:w-full">
                  <button
                    className=" max-lg:w-full bg-primary text-white px-6 py-2 rounded-lg"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                  {/* <div
                    className=" max-lg:w-full bg-primary text-white px-4 py-2 rounded-lg"
                    onClick={handleSearch}
                  >
                    Search
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
      @keyframes zoomInLeftOut {
        0%, 100% {
          transform: scale(1) translateX(0);
        }
        50% {
          transform: scale(1.1) translateX(-5%);
        }
      }
    `}
      </style>
    </>
  );
};

export default SliderOne;
