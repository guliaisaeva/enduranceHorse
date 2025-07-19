import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { events } from "./AllEvents";
import { useState } from "react";

function AllEventTable() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  //   const filteredEvents = events.filter((event) => {
  //     const eventYear = new Date(event.date).getFullYear();
  //     return eventYear === selectedYear;
  //   });

  const handlePrevYear = () => setSelectedYear((prev) => prev - 1);
  const handleNextYear = () => setSelectedYear((prev) => prev + 1);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        {t("allRaces")}
      </h2>

      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={handlePrevYear}
          className="text-xl font-bold  text-[#118e6f]  hover:text-[#0da27e]"
        >
          &lt;
        </button>
        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded">
          {selectedYear}
        </span>
        <button
          onClick={handleNextYear}
          className="text-xl font-bold  text-[#118e6f] hover:text-[#0da27e]"
        >
          &gt;
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">{t("title")}</th>
              <th className="px-4 py-2 border">{t("date")}</th>
              <th className="px-4 py-2 border">{t("location")}</th>
              <th className="px-4 py-2 border">{t("status")}</th>
              <th className="px-4 py-2 border">{t("action")}</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{event.title}</td>
                <td className="px-4 py-2 border">{event.date}</td>
                <td className="px-4 py-2 border">{event.location}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      event.status === "LIVE"
                        ? "bg-green-100 text-green-800"
                        : event.status === "UPCOMING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => navigate("/event-detail", { state: event })}
                    className="bg-[#0da27e] hover:bg-[#0b8a68] text-white text-xs px-3 py-1 rounded"
                  >
                    {t("view")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllEventTable;
