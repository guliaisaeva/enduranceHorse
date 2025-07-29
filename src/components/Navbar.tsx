// import { Link } from "react-router-dom";
// import logo from "../assets/lastLogo.png";
// import { FaCalendarAlt, FaUser } from "react-icons/fa";
// import "../index.css";
// import { useTranslation } from "react-i18next";

// function Navbar() {
//   const { t, i18n } = useTranslation();
//   const changeLanguage = (lng: "en" | "tr") => {
//     i18n.changeLanguage(lng);
//   };
//   const currentLang = i18n.language;

//   return (
//     <nav
//       className="text-white flex flex-wrap justify-between items-center h-[75px]  shadow"
//       style={{
//         background: "linear-gradient(90deg, #19624F 0%, #0da27e 100%)",
//         padding: "0 1rem",
//       }}
//     >
//       {/* Logo */}
//       <div className="w-24 sm:w-20 md:w-24 cursor-pointer">
//         <Link to="/">
//           <img src={logo} alt="logo" className="w-full h-auto object-contain" />
//         </Link>
//       </div>

//       <div className="hidden md:flex gap-6 text-sm sm:text-base lg:text-lg font-medium">
//         <Link
//           to="/"
//           className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
//         >
//           {t("homepage")}
//         </Link>
//         <Link
//           to="/all-events"
//           className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
//         >
//           {t("races")}
//         </Link>
//         <Link
//           to="/all-athlets"
//           className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
//         >
//           {t("athletes")}
//         </Link>
//         <Link
//           to="/athlets"
//           className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
//         >
//           {t("horses")}
//         </Link>
//         <Link
//           to="/clubs"
//           className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
//         >
//           {t("clubs")}
//         </Link>
//         <Link
//           to="/all-events-table"
//           className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
//         >
//           <FaCalendarAlt className="mt-1 transition-colors duration-300" />
//         </Link>
//       </div>

//       <div className="flex items-center gap-6 ounded-full">
//         <div className="flex  gap-2 bg-[#FEA91D] p-2  font-semibold rounded  md:text-[16px] text-[13px]">
//           <span
//             onClick={() => changeLanguage("en")}
//             className={`cursor-pointer text-black px-1 ${
//               currentLang === "en" ? "underline font-bold" : ""
//             }`}
//           >
//             EN
//           </span>
//           <span
//             onClick={() => changeLanguage("tr")}
//             className={`cursor-pointer text-white px-1 ${
//               currentLang === "tr" ? "underline font-bold" : ""
//             }`}
//           >
//             TR
//           </span>
//         </div>
//         <FaUser size={28} className="text-white cursor-pointer" />
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/lastLogo.png";
import { FaBars, FaTimes, FaCalendarAlt, FaUser } from "react-icons/fa";
import "../index.css";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: "en" | "tr") => i18n.changeLanguage(lng);
  const currentLang = i18n.language;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="text-white relative shadow"
      style={{
        background: "linear-gradient(90deg, #19624F 0%, #0da27e 100%)",
        padding: "0 1rem",
      }}
    >
      <div className="flex justify-between items-center h-[75px]">
        <div className="w-24 sm:w-20 md:w-24 cursor-pointer">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-full h-auto object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex gap-6 text-sm sm:text-base lg:text-lg font-medium">
          <Link
            to="/"
            className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
          >
            {t("homepage")}
          </Link>
          <Link
            to="/all-events"
            className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
          >
            {t("races")}
          </Link>
          <Link
            to="/all-athlets"
            className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
          >
            {t("athletes")}
          </Link>
          <Link
            to="/all-horses"
            className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
          >
            {t("horses")}
          </Link>
          <Link
            to="/clubs"
            className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
          >
            {t("clubs")}
          </Link>
          <Link
            to="/all-events-table"
            className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
          >
            <FaCalendarAlt className="mt-1" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-[#FEA91D] p-2 font-semibold rounded md:text-[16px] text-[13px]">
            <span
              onClick={() => changeLanguage("en")}
              className={`cursor-pointer text-black px-1 ${
                currentLang === "en" ? "underline font-bold" : ""
              }`}
            >
              EN
            </span>
            <span
              onClick={() => changeLanguage("tr")}
              className={`cursor-pointer text-white px-1 ${
                currentLang === "tr" ? "underline font-bold" : ""
              }`}
            >
              TR
            </span>
          </div>
          <FaUser
            size={24}
            className="text-white cursor-pointer hidden sm:block"
          />

          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed top-19 right-0 z-50 transition-transform duration-300 ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#0da27e]/70 p-4  rounded-lg shadow-lg w-30 h-fit flex flex-col gap-2 text-white font-medium">
          <Link to="/" onClick={toggleMenu} className="hover:text-orange-400">
            {t("homepage")}
          </Link>
          <Link
            to="/all-events"
            onClick={toggleMenu}
            className="hover:text-orange-400"
          >
            {t("races")}
          </Link>
          <Link
            to="/all-athlets"
            onClick={toggleMenu}
            className="hover:text-orange-400"
          >
            {t("athletes")}
          </Link>
          <Link
            to="/athlets"
            onClick={toggleMenu}
            className="hover:text-orange-400"
          >
            {t("horses")}
          </Link>
          <Link
            to="/clubs"
            onClick={toggleMenu}
            className="hover:text-orange-400"
          >
            {t("clubs")}
          </Link>
          <Link
            to="/all-events-table"
            onClick={toggleMenu}
            className="flex items-center gap-2 hover:text-orange-400"
          >
            <FaCalendarAlt />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
