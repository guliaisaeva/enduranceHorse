import { useState } from "react";
import { FaBriefcaseMedical, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { mockRiders } from "./LiveMapPage";
import { TbClockHour4Filled } from "react-icons/tb";
import Modal from "../../components/Modal";
import VetTable from "../../components/VetTable";
import TimingTable from "../../components/TimingTable";
import InfoSection from "../../components/InfoSection";
import { useTranslation } from "react-i18next";

function ResultRiderList() {
  const location = useLocation();
  const { t } = useTranslation();
  const event = location.state;

  if (!event) return <div className="p-4 text-red-500">{t("noEventData")}</div>;

  const categoryList: string[] = event.category || [];

  const selectedCategory = event?.selectedCategory ?? categoryList[0];
  const initialIndex = categoryList.findIndex((c) => c === selectedCategory);
  const [categoryIndex, setCategoryIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );

  const activeCategory = categoryList[categoryIndex];

  const filteredRiders = mockRiders.filter(
    (rider) => rider.category === activeCategory
  );

  const handlePrev = () => {
    if (categoryIndex > 0) setCategoryIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (categoryIndex < categoryList.length - 1)
      setCategoryIndex((prev) => prev + 1);
  };
  const [isVetOpen, setVetOpen] = useState(false);
  const [isTimingOpen, setTimingOpen] = useState(false);
  const [activeRider, setActiveRider] = useState<{
    id: number;
    name: string;
    horse: string;
    parkur: number;
    category: string;
    club: string;
    position: { lat: number; lng: number };
    icon: string;
    status?: string;
  } | null>(null);

  const total = filteredRiders.length;
  const eliminated = filteredRiders.filter(
    (r) => r.status === "eliminated"
  ).length;
  const qualified = total - eliminated;

  const qualifiedPercent = total ? Math.round((qualified / total) * 100) : 0;
  const eliminatedPercent = total ? Math.round((eliminated / total) * 100) : 0;
  const [showInfoTable, setShowInfoTable] = useState(false);
  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 p-2 text-center">
          {event.title}
        </h3>
        <div className="text-xs text-gray-500 mb-2 flex gap-2 justify-center items-center">
          <span>{event.date}</span> {event.location}{" "}
          <img
            className="border rounded-full h-5 w-5 md:h-8 md:w-8"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png"
            alt="spain flag"
          />{" "}
        </div>
        <p className="text-xs text-gray-400 m-1 "> 09:00:00 </p>
      </div>

      <div className="text-black flex justify-center items-center gap-2 p-3">
        <button onClick={handlePrev} disabled={categoryIndex === 0}>
          <FaCaretLeft
            className={`text-xl ${
              categoryIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          />
        </button>

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
          {categoryList[categoryIndex]}
        </span>

        <button
          onClick={handleNext}
          disabled={categoryIndex === categoryList.length - 1}
        >
          <FaCaretRight
            className={`text-xl ${
              categoryIndex === categoryList.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          />
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setShowInfoTable((prev) => !prev)}
          className="hidden md:block mb-2 px-3 py-1 bg-red-100 text-red-700 font-semibold  rounded hover:bg-red-200 transition"
        >
          {t("info")}
        </button>
      </div>
      {showInfoTable && <InfoSection />}

      <div className="flex justify-center md:justify-between text-sm text-gray-700 gap-2 flex-wrap m-0 md:m-8">
        <div>
          ✅ {t("qualifiedLabel")}:{" "}
          <span className="font-semibold text-green-600">
            {qualified} ({qualifiedPercent}%)
          </span>
        </div>
        <div>
          ❌ {t("eliminatedLabel")}:{" "}
          <span className="font-semibold text-red-600">
            {eliminated} ({eliminatedPercent}%)
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 mt-4 shadow rounded">
          <thead className="bg-gray-200 ">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"></th>
              <th className=" px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                {t("rider")}{" "}
              </th>

              <th className="hidden md:block px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                {t("club")}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                {t("status")}
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                {t("timingTitle")}/{t("vetCardTitle")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRiders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  {t("noRiders")}
                </td>
              </tr>
            ) : (
              filteredRiders.map((rider) => (
                <tr
                  key={rider.id}
                  className="hover:bg-gray-50 text-sm md:text-base"
                >
                  <td className="px-4 py-2 text-green-600">Q2</td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    <span>
                      {" "}
                      {rider.name}/{rider.id}
                    </span>{" "}
                    <span className="">({rider.horse})</span>
                  </td>
                  <td className="hidden md:block px-4 py-2 text-gray-600">
                    {rider.club}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {rider.status === "eliminated" ? (
                      <span className="text-red-600 font-semibold capitalize">
                        {t("eliminatedLabel")}
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold capitalize">
                        {t("qualifiedLabel")}{" "}
                      </span>
                    )}
                    {rider.status !== "eliminated" &&
                      typeof rider.km === "number" && (
                        <span className="ml-1 text-gray-500 text-sm">
                          {rider.km} km
                        </span>
                      )}
                  </td>{" "}
                  <td className="px-4 py-2 text-center">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                      <button
                        className="text-[#0da27e] hover:text-[#376b60] mt-0.5"
                        onClick={() => {
                          setActiveRider(rider);
                          setTimingOpen(true);
                        }}
                        title={t("timingTitle")}
                      >
                        <TbClockHour4Filled size={19} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          setActiveRider(rider);
                          setVetOpen(true);
                        }}
                        title={t("vetCardTitle")}
                      >
                        <FaBriefcaseMedical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isVetOpen}
        onClose={() => setVetOpen(false)}
        title={
          <div className="flex justify-between items-center gap-4 text-sm md:text-base">
            <span className="font-bold">Veteriner Raporu </span>
            <span className="text-xs md:text-sm">
              {" "}
              🐎{activeRider?.horse} 🆔 At No:{activeRider?.id}{" "}
              <span className="hidden md:block">
                🏇 Binici: {activeRider?.name} 🏷️ Takım: {activeRider?.club}{" "}
                ⭕Phase:{activeRider?.parkur}
              </span>{" "}
            </span>
          </div>
        }
      >
        <VetTable />
      </Modal>
      <Modal
        isOpen={isTimingOpen}
        onClose={() => setTimingOpen(false)}
        title={
          <div className="flex justify-between items-center gap-4">
            <span className="font-bold">Timing</span>
            <span className="text-xs md:text-sm">
              {" "}
              🐎{activeRider?.horse} 🆔 At No:{activeRider?.id}{" "}
              <span className="hidden md:block">
                🏇 Binici: {activeRider?.name} 🏷️ Takım: {activeRider?.club}{" "}
                ⭕Phase{activeRider?.parkur}
              </span>{" "}
            </span>
          </div>
        }
      >
        <TimingTable />
      </Modal>
    </div>
  );
}

export default ResultRiderList;
