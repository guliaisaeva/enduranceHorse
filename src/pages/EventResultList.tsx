import { FaCalendarAlt } from "react-icons/fa";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { events } from "./AllEvents";

export default function EnduranceCardTable() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const resultEvents = events.filter((event) => event.status === "RESULT");

  const tabs = [t("athletes"), t("horses"), t("clubs")];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-8">
      <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        {t("pastRaces")}
      </h2>
        <div className="flex justify-center space-x-8 mt-4 text-sm md:text-base text-[#118e6f] font-semibold uppercase cursor-pointer">
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {resultEvents.map((event, idx) => (
          <EventCard
            key={idx}
            event={event}
            type="result"
            onClick={() => navigate("/event-detail", { state: event })}
          />
        ))}
      </div>
    </div>
  );
}
