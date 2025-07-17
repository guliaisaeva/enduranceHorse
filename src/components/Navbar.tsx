import { Link } from "react-router-dom";
import logo from "../assets/lastLogo.png";
import { FaUser } from "react-icons/fa";
import "../index.css";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: "en" | "tr") => {
    i18n.changeLanguage(lng);
  };
  const currentLang = i18n.language;

  return (
    <nav
      className="text-white flex flex-wrap justify-between items-center h-[75px]  shadow"
      style={{
        background: "linear-gradient(90deg, #19624F 0%, #0da27e 100%)",
        padding: "0 1rem",
      }}
    >
      {/* Logo */}
      <div className="w-24 sm:w-20 md:w-24 cursor-pointer">
        <Link to="/">
          <img src={logo} alt="logo" className="w-full h-auto object-contain" />
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
          to="/atlar"
          className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
        >
          {t("horses")}
        </Link>
        <Link
          to="/katilimcilar"
          className="pb-1 border-b-2 border-transparent hover:border-orange-500 transition duration-200"
        >
          {t("clubs")}
        </Link>
      </div>

      <div className="flex items-center gap-6 ounded-full">
        <div className="flex  gap-2 bg-[#FEA91D] p-2  font-semibold rounded  md:text-[16px] text-[13px]">
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
        <FaUser size={28} className="text-white cursor-pointer" />
      </div>
    </nav>
  );
}

export default Navbar;
