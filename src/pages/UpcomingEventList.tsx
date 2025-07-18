import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { events } from "./AllEvents";

export default function UpcomingEventList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const tabs = [t("athletes"), t("horses"), t("clubs")];
  const currentEvents = events.filter((event) => event.status === "UPCOMING");
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
          {t("upcomingRaces")}
        </h2>
        {/* <div className="flex justify-center space-x-8 mt-4 text-sm md:text-base text-[#118e6f] font-semibold uppercase cursor-pointer">
          {tabs.map((item, index) => (
            <span key={index} className="relative group">
              <span className="group-hover:border-b-2 border-[#FEA91D] transition-all duration-300">
                {item}
              </span>
            </span>
          ))}
          <span className="relative group">
            <FaCalendarAlt className="group-hover:text-[#FEA91D] transition-colors duration-300" />
            <span className="sr-only">{t("calendar")}</span>
          </span>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {currentEvents.map((event, idx) => (
          <EventCard
            key={idx}
            event={{ ...event }}
            type="upcoming"
            onClick={() => navigate("/event-detail", { state: event })}
          />
        ))}
      </div>
    </div>
  );
}
