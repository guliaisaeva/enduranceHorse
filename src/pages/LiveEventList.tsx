import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { useTranslation } from "react-i18next";
import { events } from "./AllEvents";

export default function LiveEventList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentEvents = events.filter((event) => event.status === "LIVE");
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        {t("liveEvents")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {currentEvents.map((event, idx) => (
          <EventCard
            key={idx}
            event={event}
            type="live"
            onClick={() => navigate("/live", { state: event })}
          />
        ))}
      </div>
    </div>
  );
}
