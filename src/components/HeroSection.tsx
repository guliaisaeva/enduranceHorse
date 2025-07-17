import bgImage from "../assets/images/heroBg.png";
import horseImage from "../assets/images/horse.png";
import { CiStreamOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      className="md:flex md:items-center md:justify-around  bg-no-repeat  bg-cover  bg-center"
      style={{ backgroundImage: `url(${bgImage})`, height: "100vh" }}
    >
      <div className="container">
        <div className="flex flex-col space-y-4 justify-center  text-white w-full md:w-[40%] h-screen text-center">
          <h1 className="text-3xl md:text-4xl font-bold hidden md:block">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-white/80 hidden md:block">
            {t("heroSubtitle")}
          </p>
          <div className="flex flex-col justify-center items-center gap-3 w-full mt-4">
            <CustomButton
              onClick={() => navigate("/live-events")}
              className="bg-red-600 w-full md:w-40 hover:bg-red-700 text-white"
            >
              <CiStreamOn size={24} />
              {t("watchLive")}
            </CustomButton>
            <CustomButton
              onClick={() => navigate("/all-events")}
              className="bg-[#e69513] w-full md:w-40 hover:bg-[#d88a00] text-white"
            >
              {t("allRaces")}
            </CustomButton>
            <CustomButton
              onClick={() => navigate("/upcoming-event")}
              className="bg-[#0e9978] w-full md:w-40 hover:bg-teal-700 text-white"
            >
              {t("upcomingRaces")}
            </CustomButton>

            <CustomButton
              onClick={() => navigate("/events")}
              className="bg-gray-500 w-full md:w-40 hover:bg-gray-700 text-white"
            >
              {t("pastRaces")}
            </CustomButton>
          </div>
        </div>
        <div className="w-[60%] hidden md:block">
          <img
            src={horseImage}
            alt="Running Horse"
            className="absolute hidden md:block   bottom-0 right-16 w-[40%]"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
