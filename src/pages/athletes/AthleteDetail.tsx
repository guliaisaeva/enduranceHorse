import { useLocation } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const raceHistory = [
  {
    date: "08/06/2025",
    race: "La Baule (FRA)",
    horse: "Güçlü Rüzgar",
    distance: "160km",
    status: "Tamamlandı (7:12:43)",
  },
  {
    date: "08/06/2024",
    race: "Konya (TUR)",
    horse: "Kırat",
    distance: "120km",
    status: "Diskalifiye (Kalp ritmi)",
  },
  {
    date: "08/06/2024",
    race: "Doha (QAT)",
    horse: "Bella",
    distance: "160km",
    status: "2. sıra (5:58:09)",
  },
];

export default function AthleteDetail() {
  const location = useLocation();
  const { t } = useTranslation();
  const rider = location.state;

  if (!rider) return <div>{t("athleteDetail.notFound")}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold text-[#118e6f] uppercase mb-8">
        {t("athleteDetail.title")}
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg p-6 gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full md:w-2/3 text-center md:text-left">
          {rider.athletImageUrl && (
            <img
              src={rider.athletImageUrl}
              alt={rider.name}
              className="w-40 h-40 object-cover rounded-lg shadow"
            />
          )}
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#fea91d]">
              {rider.name}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {t("athleteDetail.feiId")}: {rider.id}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              {t("athleteDetail.club")}: {rider.club}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              {t("athleteDetail.branch")}: Endurance
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              {t("athleteDetail.horse")}: {rider.horse}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              {t("athleteDetail.category")}: {rider.category}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              {t("athleteDetail.status")}: {rider.km}km
            </p>
          </div>
        </div>

        <div className="w-full text-center md:text-left md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-lg font-semibold text-[#118e6f] uppercase mb-2">
            {t("athleteDetail.ranking")}
          </h3>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>🌍 {t("athleteDetail.world")}: 12. (1345 puan)</li>
            <li className="flex justify-center md:justify-start items-center">
              🌍 {t("athleteDetail.europe")}: 5. (1120 puan)
            </li>
            <li className="flex justify-center md:justify-start items-center">
              🇹🇷 {t("athleteDetail.turkey")}: 1. (400 puan)
            </li>
            <li>🤝 {t("athleteDetail.combination")}: 7. (800 puan)</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-center text-lg font-semibold text-[#118e6f] uppercase mb-4">
          {t("athleteDetail.lastRaceHistory")}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs md:text-sm text-left text-gray-700">
            <thead className="bg-gray-200 text-gray-700 text-xs md:text-sm">
              <tr>
                <th className="px-2 md:px-4 py-2 border">
                  {t("athleteDetail.date")}
                </th>
                <th className="px-2 md:px-4 py-2 border">
                  {t("athleteDetail.raceName")}
                </th>
                <th className="px-2 md:px-4 py-2 border">
                  {t("athleteDetail.horseName")}
                </th>
                <th className="px-2 md:px-4 py-2 border">
                  {t("athleteDetail.km")}
                </th>
                <th className="px-2 md:px-4 py-2 border">
                  {t("athleteDetail.result")}
                </th>
              </tr>
            </thead>
            <tbody>
              {raceHistory.map((event, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-2 md:px-4 py-2 border">{event.date}</td>
                  <td className="px-2 md:px-4 py-2 border">{event.race}</td>
                  <td className="px-2 md:px-4 py-2 border flex justify-between items-center gap-1">
                    {event.horse} <FaInfoCircle color="#fea91d" />
                  </td>
                  <td className="px-2 md:px-4 py-2 border">{event.distance}</td>
                  <td className="px-2 md:px-4 py-2 border">
                    <span
                      className={`px-1 md:px-2 py-1 text-[10px] md:text-xs font-semibold rounded 
                        ${
                          event.status.includes("Tamamlandı")
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          event.status.includes("Diskalifiye")
                            ? "bg-red-100 text-red-800"
                            : ""
                        }
                        ${
                          event.status.includes("sıra")
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
