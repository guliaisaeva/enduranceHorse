import { useLocation } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

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
  const rider = location.state;

  if (!rider) return <div>Atlet bulunamadı.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold text-[#118e6f] uppercase mb-8">
        Atlet Bilgileri
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
            <p className="text-gray-600 text-justify text-sm md:text-base">
              FEI ID: {rider.id}
            </p>
            <p className="text-gray-600 text-justify  text-sm md:text-base">
              Kulüp: {rider.club}
            </p>
            <p className="text-gray-600 text-justify  text-sm md:text-base">
              Branş: Endurance
            </p>
            <p className="text-gray-600 text-justify  text-sm md:text-base">
              At: {rider.horse}
            </p>
            <p className="text-gray-600 text-justify  text-sm md:text-base">
              Kategori: {rider.category}
            </p>
            <p className="text-gray-600 text-justify  text-sm md:text-base">
              Status: {rider.km}km
            </p>
          </div>
        </div>

        <div className="w-full text-center md:text-left md:w-1/3 mt-6 md:mt-0">
          <h3 className="text-lg font-semibold text-[#118e6f] uppercase mb-2">
            Sıralama
          </h3>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>🌍 Dünya: 12. (1345 puan)</li>
            <li className="flex justify-center md:justify-start items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 60 60"
                className="w-4 h-4 rounded-full"
              >
                <circle cx="30" cy="30" r="30" fill="#003399" />
                <g fill="#ffcc00" transform="translate(30 30)">
                  {[...Array(12)].map((_, i) => (
                    <polygon
                      key={i}
                      transform={`rotate(${i * 30}) translate(0 -26)`}
                      points="0,-2 0.6,0.6 2.2,0.6 0.9,1.6 1.4,3.2 0,2.2 -1.4,3.2 -0.9,1.6 -2.2,0.6 -0.6,0.6"
                    />
                  ))}
                </g>
              </svg>
              Avrupa: 5. (1120 puan)
            </li>
            <li className="flex justify-left items-center justify-center md:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 480"
                className="w-4 h-4 rounded-full"
              >
                <g fillRule="evenodd">
                  <path fill="#e30a17" d="M0 0h640v480H0z" />
                  <path
                    fill="#fff"
                    d="M268 240c0 66.3-53.7 120-120 120S28 306.3 28 240 81.7 120 148 120s120 53.7 120 120z"
                  />
                  <path
                    fill="#e30a17"
                    d="M284 240c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96z"
                  />
                  <path
                    fill="#fff"
                    d="m333.6 240 52.4 17-32.4-45.3v56.5l32.4-45.2z"
                  />
                </g>
              </svg>
              Türkiye: 1. (400 puan)
            </li>
            <li>🤝 Kombinasyon: 7. (800 puan)</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-center text-lg font-semibold text-[#118e6f] uppercase mb-4">
          Son Yarış Geçmişi
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs md:text-sm text-left text-gray-700">
            <thead className="bg-gray-200 text-gray-700 text-xs md:text-sm">
              <tr>
                <th className="px-2 md:px-4 py-2 border">Tarih</th>
                <th className="px-2 md:px-4 py-2 border">Yarış İsmi</th>
                <th className="px-2 md:px-4 py-2 border">At ismi</th>
                <th className="px-2 md:px-4 py-2 border">Km</th>
                <th className="px-2 md:px-4 py-2 border">Durum / Timing</th>
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
                }
              `}
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
