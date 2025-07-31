import { FaInfoCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { mockHorses } from "./AllHorses";
import { useTranslation } from "react-i18next";

export default function HorseDetail() {
  const { id } = useParams();
  const horseId = parseInt(id || "", 10);
  const horse = mockHorses.find((h) => h.id === horseId);
  const { t } = useTranslation();

  if (!horse) return <div>At bulunamadı.</div>;
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

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-center text-2xl font-bold text-[#118e6f] uppercase mb-8">
        {t("horseInfo")}{" "}
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg p-6 gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full md:w-2/3 text-center md:text-left">
          <img
            src={
              horse.imageUrl && horse.imageUrl.trim() !== ""
                ? horse.imageUrl
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg=="
            }
            alt={horse.name}
            className="w-40 h-40 object-cover rounded-lg shadow"
          />

          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#fea91d]">
              {horse.name}
            </h1>
            <p className="text-gray-600 text-justify text-sm md:text-base">
              {t("athleteDetail.feiId")}: {horse.id}
            </p>
            <p className="text-gray-600 text-justify text-sm md:text-base">
              {t("club")}: {horse.club}
            </p>
            <p className="text-gray-600 text-justify text-sm md:text-base">
              {t("athleteDetail.branch")}: Endurance
            </p>
            <p className="text-gray-600 text-justify text-sm md:text-base">
              {t("horse")}: {horse.name}
            </p>
            <p className="text-gray-600 text-justify text-sm md:text-base">
              {t("breed")}: {horse.breed}
            </p>
            <p className="text-gray-600 text-justify text-sm md:text-base">
              {t("age")}: {horse.age}
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
              {t("athleteDetail.europe")}: 5. (1120 puan)
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
              {t("athleteDetail.turkey")}: 1. (400 puan)
            </li>
            <li>🤝{t("athleteDetail.combination")}: 7. (800 puan)</li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-center text-lg font-semibold text-[#118e6f] uppercase mb-4">
          {t("athleteDetail.lastRaceHistory")}{" "}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs md:text-sm text-left text-gray-700">
            <thead className="bg-gray-200 text-gray-700 text-xs md:text-sm">
              <tr>
                <th className="px-4 py-2 border"> {t("athleteDetail.date")}</th>
                <th className="px-4 py-2 border">
                  {" "}
                  {t("athleteDetail.raceName")}
                </th>
                <th className="px-4 py-2 border">{t("riderName")}</th>
                <th className="px-4 py-2 border"> {t("athleteDetail.km")}</th>
                <th className="px-4 py-2 border">
                  {" "}
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
