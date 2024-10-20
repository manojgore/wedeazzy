// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";

// const Select = dynamic(() => import("react-select"), { ssr: false });

// import { FiDollarSign, FiHome, FiSearch } from "react-icons/fi";
// import { FaRupeeSign } from "react-icons/fa";

// export default function SelectThree() {
//   const router = useRouter();
//   let [activeIndex, setActiveIndex] = useState(0);

//   let venueCategory = [
//     { value: "delhi", label: "Delhi" },
//     { value: "mumbai", label: "Mumbai" },
//     { value: "pune", label: "Pune" },
//     { value: "chennai", label: "Chennai" },
//     { value: "amritsar", label: "Amritsar" },
//     { value: "jaipur", label: "Jaipur" },
//     { value: "bangalore", label: "Bangalore" },
//     { value: "ahmedabad", label: "Ahmedabad" },
//     { value: "visakhapatnam", label: "Visakhapatnam" },
//     { value: "kolkata", label: "Kolkata" },
//   ];
//   let vendorCategory = [
//     { value: "decorators", label: "Decorators" },
//     { value: "caterers", label: "Caterers" },
//     { value: "transports", label: "Transports" },
//     { value: "wedding planners", label: "Wedding Planners" },
//     { value: "rentals", label: "Rentals" },
//     { value: "tailoring", label: "Tailoring" },
//     { value: "gifting", label: "Gifting" },
//   ];
//   let servicesCategory = [
//     { value: "photographers", label: "Photographers" },
//     { value: "makeup artists", label: "Makeup Artists" },
//     { value: "mehendi artists", label: "Mehendi Artists" },
//     { value: "djs", label: "Djs" },
//     { value: "choreographers", label: "Choreographers" },
//   ];
//   let price = [
//     { value: "500", label: "500" },
//     { value: "1000", label: "1000" },
//     { value: "2000", label: "2000" },
//     { value: "3000", label: "3000" },
//     { value: "4000", label: "4000" },
//     { value: "5000", label: "5000" },
//     { value: "6000", label: "6000" },
//     { value: "7000", label: "7000" },
//   ];

//   const [venueSearchData, setVenueSearchData] = useState({
//     city: "",
//     keywords: "",
//     minprice: "",
//     maxprice: "",
//   });

//   const [vendorSearchData, setVendorSearchData] = useState({
//     category: "",
//     keywords: "",
//     minprice: "",
//     maxprice: "",
//   });

//   const [serviceSearchData, setServiceSearchData] = useState({
//     category: "",
//     keywords: "",
//     minprice: "",
//     maxprice: "",
//   });

//   return (
//     <div className="row justify-content-center">
//       <div className="col-12 mt-sm-0 pt-sm-0">
//         <div className="features-absolute">
//           <ul
//             className="nav nav-pills bg-white shadow border-bottom p-3 flex-row d-md-inline-flex nav-justified mb-0 rounded-top-3  position-relative overflow-hidden"
//             id="pills-tab"
//             role="tablist"
//           >
//             <li className="nav-item m-1">
//               <Link
//                 className={`${
//                   activeIndex === 0 ? "active" : ""
//                 } nav-link py-2 px-4  rounded-3 fw-medium`}
//                 href="#"
//                 scroll={false}
//                 onClick={() => setActiveIndex(0)}
//               >
//                 Venues
//               </Link>
//             </li>

//             <li className="nav-item m-1">
//               <Link
//                 className={`${
//                   activeIndex === 1 ? "active" : ""
//                 } nav-link py-2 px-4  rounded-3 fw-medium`}
//                 href="#"
//                 scroll={false}
//                 onClick={() => setActiveIndex(1)}
//               >
//                 Vendors
//               </Link>
//             </li>

//             <li className="nav-item m-1">
//               <Link
//                 className={`${
//                   activeIndex === 2 ? "active" : ""
//                 } nav-link py-2 px-4  rounded-3 fw-medium`}
//                 href="#"
//                 scroll={false}
//                 onClick={() => setActiveIndex(2)}
//               >
//                 Services
//               </Link>
//             </li>
//           </ul>

//           <div className="tab-content bg-white rounded-bottom-3 rounded-end-3 sm-rounded-0 shadow">
//             {activeIndex === 0 ? (
//               <div className="card border-0 active">
//                 <form className="card-body text-start">
//                   <div className="registration-form text-dark text-start">
//                     <div className="row g-lg-0">
//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Search :</label>
//                           <div className="filter-search-form position-relative filter-border">
//                             <FiSearch className="fea icon-ex-md icons mr-2" />
//                             <input
//                               name="keywords"
//                               type="text"
//                               id="job-keyword"
//                               className="form-control filter-input-box bg-light border-0 "
//                               placeholder="Search your keywords"
//                               value={venueSearchData.keywords}
//                               onChange={(e) =>
//                                 setVenueSearchData({
//                                   ...venueSearchData,
//                                   keywords: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">
//                             Select Place :
//                           </label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FiHome className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               name="city"
//                               options={venueCategory}
//                               onChange={(e) => {
//                                 setVenueSearchData({
//                                   ...venueSearchData,
//                                   city: e.value,
//                                 });
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Min Price :</label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FaRupeeSign className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               name="minprice"
//                               options={price}
//                               onChange={(e) =>
//                                 setVenueSearchData({
//                                   ...venueSearchData,
//                                   minprice: e.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Max Price :</label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FaRupeeSign className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               name="maxprice"
//                               options={price}
//                               onChange={(e) =>
//                                 setVenueSearchData({
//                                   ...venueSearchData,
//                                   maxprice: e.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <Link
//                           type="submit"
//                           id="search"
//                           //   name="search"
//                           style={{
//                             height: "48px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                           className="btn btn-primary searchbtn w-100"
//                           href={`/venues/${venueSearchData.city}?keywords=${venueSearchData.keywords}&minprice=${venueSearchData.minprice}&maxprice=${venueSearchData.maxprice}`}
//                         >
//                           Search
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             ) : (
//               ""
//             )}
//             {activeIndex === 1 ? (
//               <div className="card border-0 active">
//                 <form className="card-body text-start">
//                   <div className="registration-form text-dark text-start">
//                     <div className="row g-lg-0">
//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Search :</label>
//                           <div className="filter-search-form position-relative filter-border">
//                             <FiSearch className="fea icon-ex-md icons" />
//                             <input
//                               name="name"
//                               type="text"
//                               id="job-keyword"
//                               className="form-control filter-input-box bg-light border-0"
//                               placeholder="Search your keywords"
//                               value={vendorSearchData.keywords}
//                               onChange={(e) =>
//                                 setVendorSearchData({
//                                   ...vendorSearchData,
//                                   keywords: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">
//                             Select Categories :
//                           </label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FiHome className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               options={vendorCategory}
//                               onChange={(e) => {
//                                 console.log(e.value);
//                                 setVendorSearchData({
//                                   ...vendorSearchData,
//                                   category: e.value,
//                                 });
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Min Price :</label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FaRupeeSign className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               options={price}
//                               onChange={(e) => {
//                                 console.log(e.value);
//                                 setVendorSearchData({
//                                   ...vendorSearchData,
//                                   minprice: e.value,
//                                 });
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Max Price :</label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FaRupeeSign className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               options={price}
//                               onChange={(e) => {
//                                 console.log(e.value);
//                                 setVendorSearchData({
//                                   ...vendorSearchData,
//                                   maxprice: e.value,
//                                 });
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <Link
//                           type="submit"
//                           id="search"
//                           //   name="search"
//                           style={{
//                             height: "48px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                           className="btn btn-primary searchbtn w-100"
//                           href={`/vendors/${vendorSearchData.category}?keywords=${vendorSearchData.keywords}&minprice=${vendorSearchData.minprice}&maxprice=${vendorSearchData.maxprice}`}
//                         >
//                           Search
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             ) : (
//               ""
//             )}
//             {activeIndex === 2 ? (
//               <div className="card border-0 active">
//                 <form className="card-body text-start">
//                   <div className="registration-form text-dark text-start">
//                     <div className="row g-lg-0">
//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Search :</label>
//                           <div className="filter-search-form position-relative filter-border">
//                             <FiSearch className="fea icon-ex-md icons" />
//                             <input
//                               name="name"
//                               type="text"
//                               id="job-keyword"
//                               className="form-control filter-input-box bg-light border-0"
//                               placeholder="Search your keywords"
//                               value={serviceSearchData.keywords}
//                               onChange={(e) =>
//                                 setServiceSearchData({
//                                   ...serviceSearchData,
//                                   keywords: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">
//                             Select Categories:
//                           </label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FiHome className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               options={servicesCategory}
//                               onChange={(e) =>
//                                 setServiceSearchData({
//                                   ...serviceSearchData,
//                                   category: e.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Min Price :</label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FaRupeeSign className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               options={price}
//                               onChange={(e) =>
//                                 setServiceSearchData({
//                                   ...serviceSearchData,
//                                   minprice: e.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <div className="mb-3">
//                           <label className="form-label fs-6">Max Price :</label>
//                           <div className="filter-search-form position-relative filter-border bg-light">
//                             <FaRupeeSign className="fea icon-ex-md icons" />
//                             <Select
//                               className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
//                               options={price}
//                               onChange={(e) =>
//                                 setServiceSearchData({
//                                   ...serviceSearchData,
//                                   maxprice: e.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col-lg-3 col-md-6 col-12">
//                         <Link
//                           type="submit"
//                           id="search"
//                           name="search"
//                           style={{
//                             height: "48px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                           className="btn btn-primary searchbtn w-100"
//                           href={`/services/${serviceSearchData.category}?keywords=${serviceSearchData.keywords}&minprice=${serviceSearchData.minprice}&maxprice=${serviceSearchData.maxprice}`}
//                         >
//                           Search
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
