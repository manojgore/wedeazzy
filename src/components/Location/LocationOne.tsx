import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TextHeading from "../TextHeading/TextHeading";
import { useRouter } from "next/navigation";
import { getEveryVenues } from "../../actions/venue";

const LocationOne = () => {
  const router = useRouter();

  const handleClickState = (state: string) => {
    router.push(`/camp/topmap-grid?state=${state}`);
  };

  useEffect(() => {
    async function helper() {
      const venues = await getEveryVenues();
      console.log("venues :", venues);
    }
    helper();
  }, []);

  return (
    <>
      <div className="location-block lg:pt-20 md:pt-14 pt-10">
        <div className="container">
          <TextHeading
            title="Browse Venues & Vendors"
            subTitle="Select according to your Preferred Locations"
          />
          <div className="list-location grid lg:grid-cols-3 min-[370px]:grid-cols-2 md:gap-[30px] gap-y-7 gap-4 md:mt-10 mt-6">
            <div
              className="item hover-scale"
              onClick={() => handleClickState("Maharashtra")}
            >
              <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                <Image
                  src={"/images/state/maharashtra.jpg"}
                  width={3000}
                  height={2000}
                  alt="1.png"
                  priority={true}
                  className="w-full"
                />
              </div>
              <div className="name heading5 sm:mt-5 mt-3">Mumbai</div>
              <div className="text-variant1 sm:mt-1">460 accommodations</div>
            </div>
            <div
              className="item hover-scale"
              onClick={() => handleClickState("Goa")}
            >
              <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                <Image
                  src={"/images/state/goa.jpeg"}
                  width={3000}
                  height={2000}
                  alt="3.png"
                  priority={true}
                  className="w-full"
                />
              </div>
              <div className="name heading5 sm:mt-5 mt-3">Goa</div>
              <div className="text-variant1 sm:mt-1">460 accommodations</div>
            </div>
            <div
              className="item hover-scale"
              onClick={() => handleClickState("Gujarat")}
            >
              <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                <Image
                  src={"/images/state/gujarat.jpeg"}
                  width={3000}
                  height={2000}
                  alt="2.png"
                  priority={true}
                  className="w-full"
                />
              </div>
              <div className="name heading5 sm:mt-5 mt-3">Gujarat</div>
              <div className="text-variant1 sm:mt-1">460 accommodations</div>
            </div>

            <div
              className="item hover-scale"
              onClick={() => handleClickState("delhi")}
            >
              <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                <Image
                  src={"/images/state/delhi.jpeg"}
                  width={3000}
                  height={2000}
                  alt="4.png"
                  priority={true}
                  className="w-full"
                />
              </div>
              <div className="name heading5 sm:mt-5 mt-3">Pune</div>
              <div className="text-variant1 sm:mt-1">460 accommodations</div>
            </div>
            <div
              className="item hover-scale"
              onClick={() => handleClickState("jaipur")}
            >
              <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                <Image
                  src={"/images/state/jaipur.jpeg"}
                  width={3000}
                  height={2000}
                  alt="5.png"
                  priority={true}
                  className="w-full"
                />
              </div>
              <div className="name heading5 sm:mt-5 mt-3">Jaipur</div>
              <div className="text-variant1 sm:mt-1">460 accommodations</div>
            </div>
            <div
              className="item hover-scale"
              onClick={() => handleClickState("chennai")}
            >
              <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                <Image
                  src={"/images/state/chennai.jpeg"}
                  width={3000}
                  height={2000}
                  alt="6.png"
                  priority={true}
                  className="w-full"
                />
              </div>
              <div className="name heading5 sm:mt-5 mt-3">Khandala</div>
              <div className="text-variant1 sm:mt-1">460 accommodations</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationOne;
