import { useEffect, useState } from "react";
import { TbClockHour4Filled } from "react-icons/tb";
import { FaBriefcaseMedical, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import Modal from "../../components/Modal";
import TimingTable from "../../components/TimingTable";
import VetTable from "../../components/VetTable";
import flagIcon from "@/assets/images/flag.png";
import blueFlagIcon from "@/assets/images/blueFlag.png";
import maviIcon from "@/assets/images/mavi.png";
import morIcon from "@/assets/images/mor.png";
import sariIcon from "@/assets/images/sari.png";
import startIcon from "@/assets/images/start.svg";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const mockRiders = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    horse: "Carolla",
    parkur: 1,
    category: "CEA0* 80",
    club: "Kayseri Riders",
    position: { lat: 39.927, lng: 32.868 },
    icon: maviIcon,
    status: "qualified",
    km: 80,
    athletImgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 11,
    name: "Cem Nur",
    horse: "Gulsarı",
    parkur: 1,
    category: "CEA0* 80",
    club: "Ankara Riders",
    position: { lat: 39.927, lng: 32.868 + 0.0008 },
    icon: morIcon,
    status: "qualified",
    km: 80,
  },
  {
    id: 2,
    name: "Zeynep Kara",
    horse: "Black",
    parkur: 2,
    category: "CEA-P 60",
    club: "Ankara Endurance",
    position: { lat: 39.9267, lng: 32.869 },
    icon: sariIcon,
    status: "qualified",
    km: 60,
    athletImgUrl:
      "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    name: "Mert Demir",
    horse: "Roza",
    parkur: 2,
    category: "CENYJ1* 80",
    club: "İstanbul Atlıspor",
    position: { lat: 39.927, lng: 32.8671 },
    icon: morIcon,
    status: "qualified",
    km: 80,
    athletImageUrl:
      "data:image/jpeg;base64,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",
  },
  {
    id: 4,
    name: "Murat Ay",
    horse: "Roza",
    parkur: 3,
    category: "CEA-P 40",
    club: "Bursa Binicilik",
    position: { lat: 39.927, lng: 32.868 },
    icon: sariIcon,
    status: "qualified",
    km: 40,
    athletImageUrl:
      "https://s3-eu-west-1.amazonaws.com/fei-bios/Images/10234903/Profile.jpg",
  },
  {
    id: 5,
    name: "Josef",
    horse: "Black",
    parkur: 4,
    category: "CEA-I 20",
    club: "Global Riders",
    position: { lat: 39.9255, lng: 32.8668 },
    icon: morIcon,
    status: "qualified",
    km: 20,
    athletImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQs2NZYapWbn9deUbf_MhUIY2Z8xQfeC_rTkyyUzT3WhNfJzCPR194Psc&s",
  },
  {
    id: 6,
    name: "Josef",
    horse: "Snow",
    parkur: 5,
    category: "CEN1* 80",
    club: "Global Riders",
    position: { lat: 39.9255, lng: 32.8668 },
    icon: morIcon,
    status: "qualified",
    km: 80,
    athletImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQs2NZYapWbn9deUbf_MhUIY2Z8xQfeC_rTkyyUzT3WhNfJzCPR194Psc&s",
  },
  {
    id: 7,
    name: "Tom Klein",
    horse: "Roza",
    parkur: 1,
    category: "CEAO* 80",
    club: "European Equestrian Club",
    position: { lat: 39.9255, lng: 32.8668 },
    icon: maviIcon,
    status: "qualified",
    km: 80,
    athletImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQs2NZYapWbn9deUbf_MhUIY2Z8xQfeC_rTkyyUzT3WhNfJzCPR194Psc&s",
  },
  {
    id: 8,
    name: "Tomas Good",
    horse: "Lion",
    parkur: 6,
    category: "CEA-P 60",
    club: "European Equestrian Club",
    position: { lat: 39.9255, lng: 32.8668 },
    icon: sariIcon,
    status: "qualified",
    km: 60,
  },
  {
    id: 9,
    name: "Senem",
    horse: "Florya",
    parkur: 3,
    category: "CEA-P 60",
    club: "European Equestrian Club",
    position: { lat: 39.9255, lng: 32.867 },
    icon: sariIcon,
    status: "qualified",
    km: 60,
  },
  {
    id: 10,
    name: "Senem",
    horse: "Florya",
    parkur: 2,
    category: "CEAO* 80",
    club: "European Equestrian Club",
    position: { lat: 39.9255, lng: 32.867 },
    icon: sariIcon,
    status: "eliminated",
    km: 80,
  },
].sort((a, b) => a.parkur - b.parkur);

const getParkurColor = (parkur: number): string => {
  switch (parkur) {
    case 1:
      return "bg-yellow-100";
    case 2:
      return "bg-blue-100";
    case 3:
      return "bg-red-100";
    case 4:
      return "bg-purple-100";
    case 5:
      return "bg-green-100";
    case 6:
      return "bg-orange-100";
    default:
      return "bg-gray-100";
  }
};
const parkurColors: Record<
  number,
  { bg: string; text: string; stroke: string }
> = {
  1: { bg: "#FEF3C7", text: "#92400E", stroke: "#FBBF24" },
  2: { bg: "#DBEAFE", text: "#1E40AF", stroke: "#3B82F6" },
  3: { bg: "#FEE2E2", text: "#991B1B", stroke: "#EF4444" },
  4: { bg: "#E9D5FF", text: "#6B21A8", stroke: "#A78BFA" },
  5: { bg: "#D1FAE5", text: "#065F46", stroke: "#10B981" },
  6: { bg: "#FFEDD5", text: "#9A3412", stroke: "#FB923C" },
};
const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 39.9265,
  lng: 32.867287,
};

const getPathCenter = (path: { lat: number; lng: number }[]) => {
  const latSum = path.reduce((sum, point) => sum + point.lat, 0);
  const lngSum = path.reduce((sum, point) => sum + point.lng, 0);
  return {
    lat: latSum / path.length,
    lng: lngSum / path.length,
  };
};

const parkurPaths: Record<number, { lat: number; lng: number }[]> = {
  1: [
    { lat: 39.9255, lng: 32.8662 },
    { lat: 39.9258, lng: 32.8666 },
    { lat: 39.9261, lng: 32.867 },
    { lat: 39.9264, lng: 32.8674 },
    { lat: 39.9267, lng: 32.8678 },
    { lat: 39.927, lng: 32.868 },
    { lat: 39.9273, lng: 32.8683 },
    { lat: 39.9275, lng: 32.8686 },
    { lat: 39.9273, lng: 32.8689 },
    { lat: 39.927, lng: 32.869 },
    { lat: 39.9267, lng: 32.8688 },
    { lat: 39.9264, lng: 32.8685 },
    { lat: 39.926, lng: 32.868 },
    { lat: 39.9257, lng: 32.8676 },
    { lat: 39.9255, lng: 32.8672 },
    { lat: 39.9255, lng: 32.8662 },
  ],
  2: [
    { lat: 39.926, lng: 32.866 },
    { lat: 39.9263, lng: 32.8663 },
    { lat: 39.9266, lng: 32.8667 },
    { lat: 39.927, lng: 32.8671 },
    { lat: 39.9273, lng: 32.8675 },
    { lat: 39.9275, lng: 32.8679 },
    { lat: 39.9277, lng: 32.8682 },
    { lat: 39.9279, lng: 32.8686 },
    { lat: 39.9277, lng: 32.869 },
    { lat: 39.9274, lng: 32.8693 },
    { lat: 39.9271, lng: 32.869 },
    { lat: 39.9267, lng: 32.8687 },
    { lat: 39.9263, lng: 32.8683 },
    { lat: 39.926, lng: 32.8678 },
    { lat: 39.9258, lng: 32.8673 },
    { lat: 39.926, lng: 32.866 },
  ],
  3: [
    { lat: 39.9252, lng: 32.8665 },
    { lat: 39.9255, lng: 32.8668 },
    { lat: 39.9258, lng: 32.8672 },
    { lat: 39.9262, lng: 32.8676 },
    { lat: 39.9265, lng: 32.868 },
    { lat: 39.9268, lng: 32.8684 },
    { lat: 39.927, lng: 32.8687 },
    { lat: 39.9273, lng: 32.869 },
    { lat: 39.9271, lng: 32.8693 },
    { lat: 39.9268, lng: 32.8695 },
    { lat: 39.9265, lng: 32.8692 },
    { lat: 39.9262, lng: 32.8688 },
    { lat: 39.9258, lng: 32.8683 },
    { lat: 39.9255, lng: 32.8678 },
    { lat: 39.9252, lng: 32.8673 },
    { lat: 39.9252, lng: 32.8665 },
  ],
};

const stations = [
  {
    position: { lat: 39.926, lng: 32.867 },
    title: "Yardım ve veteriner Noktası",
    icon: flagIcon,
    parkur: 1,
  },
  {
    position: { lat: 39.926, lng: 32.867 },
    title: "Yardım ve veteriner Noktası",
    icon: flagIcon,
    parkur: 2,
  },
  {
    position: { lat: 39.926, lng: 32.867 },
    title: "Yardım ve veteriner Noktası",
    icon: flagIcon,
    parkur: 3,
  },
  {
    position: { lat: 39.927, lng: 32.8675 },
    title: "Su Noktası",
    icon: blueFlagIcon,
    parkur: 1,
  },

  {
    position: { lat: 39.9259, lng: 32.8678 },
    title: "Su istasyonu",
    icon: blueFlagIcon,
    parkur: 3,
  },
  {
    position: { lat: 39.927, lng: 32.8675 },
    title: "Su Noktası",
    icon: blueFlagIcon,
    parkur: 2,
  },

  {
    position: { lat: 39.926, lng: 32.867 },
    title: "Yardım ve veteriner Noktası",
    icon: flagIcon,
    parkur: 2,
  },
];

export default function LiveMapPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const event = location.state;
  const [selectedRiders, setSelectedRiders] = useState<number[]>([]);
  const [isVetOpen, setVetOpen] = useState(false);
  const [isTimingOpen, setTimingOpen] = useState(false);

  const [visibleParkur, setVisibleParkur] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"riders" | "map">("riders");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const selectedCategory = event?.category[categoryIndex];
  const [activeRider, setActiveRider] = useState<{
    id: number;
    name: string;
    horse: string;
    parkur: number;
    category: string;
    club: string;
    position: { lat: number; lng: number };
    icon: string;
  } | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDEe_sjdPYPJ46ad_Dfhmg3p6Ux8YMj5eM",
  });
  const selectedParkurs = Array.from(
    new Set(
      mockRiders
        .filter((r) => selectedRiders.includes(r.id))
        .map((r) => r.parkur)
    )
  );

  const filteredRiders = mockRiders.filter(
    (rider) => rider.category === selectedCategory
  );
  const handlePrev = () => {
    setCategoryIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCategoryIndex((prev) =>
      prev < event.category.length - 1 ? prev + 1 : prev
    );
  };

  const toggleRider = (id: number) => {
    setSelectedRiders((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const onParkurClick = (parkur: number) => {
    setVisibleParkur(parkur);
  };
  useEffect(() => {
    const selectedParkurs = mockRiders
      .filter((r) => selectedRiders.includes(r.id))
      .map((r) => r.parkur);

    if (visibleParkur !== null && !selectedParkurs.includes(visibleParkur)) {
      if (selectedParkurs.length > 0) {
        setVisibleParkur(selectedParkurs[0]);
      } else {
        setVisibleParkur(null);
      }
    }
  }, [selectedRiders]);
  useEffect(() => {
    setSelectedRiders([]);
  }, [categoryIndex]);

  if (!event) {
    return <p className="text-center mt-10">{t("noEventData")}</p>;
  }
  return (
    <div className="text-white flex gap-3 justify-center flex-wrap p-3">
      <h2 className="text-center m-1 md:m-4 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        {t("watchLive")}
      </h2>
      <div className="md:hidden flex justify-center w-full gap-2 ">
        <div className="inline-flex bg-gray-200 rounded-full p-1 transition-colors duration-300 shadow">
          <button
            onClick={() => setActiveTab("riders")}
            className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
              activeTab === "riders"
                ? "bg-[#0EA07C] text-white shadow"
                : "text-gray-700"
            }`}
          >
            {t("riders")}
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
              activeTab === "map"
                ? "bg-[#0EA07C] text-white shadow"
                : "text-gray-700"
            }`}
          >
            {t("map")}
          </button>
        </div>
      </div>
      <div className="w-full md:hidden">
        {activeTab === "riders" && (
          <div className="w-full">
            <div className="w-full md:w-1/3  flex flex-col gap-6  overflow-y-auto">
              <div className="bg-[#D9EDDF] p-4 rounded-md">
                <div className="space-y-2">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 p-2 text-center">
                      {event.title}
                    </h3>
                    <div className="text-xs text-gray-500 mb-2 flex gap-2 justify-center items-center">
                      <span>{event.date}</span> {event.location}{" "}
                      <img
                        className="border rounded-full h-8 w-8"
                        src={event.flagImageUrL}
                        alt="spain flag"
                      />{" "}
                    </div>
                    <p className="text-xs text-gray-400 m-1 "></p>
                  </div>

                  <div className="text-black flex justify-center items-center gap-2 pb-2">
                    <button onClick={handlePrev} disabled={categoryIndex === 0}>
                      <FaCaretLeft
                        className={`text-xl ${
                          categoryIndex === 0
                            ? "opacity-30 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      />
                    </button>

                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium min-w-[80px] text-center">
                      {event.category[categoryIndex]}
                    </span>

                    <button
                      onClick={handleNext}
                      disabled={categoryIndex === event.category.length - 1}
                    >
                      <FaCaretRight
                        className={`text-xl ${
                          categoryIndex === event.category.length - 1
                            ? "opacity-30 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3 pl-1">
                    <input
                      type="checkbox"
                      className="accent-green-600 w-4 h-4"
                      checked={
                        selectedRiders.length === filteredRiders.length &&
                        filteredRiders.length > 0
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRiders(filteredRiders.map((r) => r.id));
                        } else {
                          setSelectedRiders([]);
                        }
                      }}
                      id="selectAll"
                    />
                    <label
                      htmlFor="selectAll"
                      className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-all duration-200
                                               ${
                                                 selectedRiders.length ===
                                                   filteredRiders.length &&
                                                 filteredRiders.length > 0
                                                   ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                                   : "bg-white text-gray-700 hover:bg-gray-100"
                                               }`}
                    >
                      {selectedRiders.length === filteredRiders.length &&
                      filteredRiders.length > 0
                        ? t("selectAll")
                        : t("deselectAll")}
                    </label>
                  </div>
                  {filteredRiders.map((rider) => (
                    <div
                      key={rider.id}
                      // className="flex items-center justify-between p-1 bg-white/90 rounded shadow-sm text-black hover:bg-white transition"
                      style={{ backgroundColor: getParkurColor(rider.parkur) }}
                      className={`flex items-center justify-between p-1 ${getParkurColor(
                        rider.parkur
                      )} rounded shadow-sm text-black hover:bg-white transition`}
                      onDoubleClick={() => {
                        setActiveRider(rider);
                        setTimingOpen(true);
                      }}
                    >
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRiders.includes(rider.id)}
                          onChange={() => toggleRider(rider.id)}
                          className="accent-green-600 w-4 h-4"
                        />
                        <span className="text-sm md:text-xs">
                          {rider.name} ({rider.horse}){" "}
                          <span className="text-amber-700 pl-2">
                            {t("track")}
                            {rider.parkur}
                          </span>{" "}
                        </span>
                      </label>
                      <div className="flex gap-1 justify-center items-center">
                        <button className="text-[#0da27e]  hover:text-[#376b60]">
                          <TbClockHour4Filled
                            onClick={() => {
                              setActiveRider(rider);
                              setTimingOpen(true);
                            }}
                            size={19}
                            title={t("timingTitle")}
                          />
                        </button>
                        <button className="text-red-500  hover:text-red-700">
                          <FaBriefcaseMedical
                            onClick={() => {
                              setActiveRider(rider);
                              setVetOpen(true);
                            }}
                            size={18}
                            title={t("vetCard")}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Modal
                  isOpen={isVetOpen}
                  onClose={() => setVetOpen(false)}
                  title={
                    <div className="flex justify-between items-center gap-4 text-sm md:text-base">
                      <span className="font-bold">{t("vetReport")}</span>
                      <span className="text-xs md:text-sm">
                        {" "}
                        🐎{activeRider?.horse} 🆔 {t("horseNumber")}:
                        {activeRider?.id}{" "}
                        <span className="hidden md:block">
                          🏇 {t("rider")}: {activeRider?.name} 🏷️ {t("club")}:{" "}
                          {activeRider?.club} ⭕{t("phase")}:
                          {activeRider?.parkur}
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
                      <span className="font-bold">{t("timingTitle")}</span>
                      <span className="text-xs md:text-sm">
                        {" "}
                        🐎{activeRider?.horse} 🆔 {t("horseNumber")}:
                        {activeRider?.id}{" "}
                        <span className="hidden md:block">
                          🏇 {t("rider")}: {activeRider?.name} 🏷️ {t("club")}:{" "}
                          {activeRider?.club} ⭕{t("phase")}:
                          {activeRider?.parkur}
                        </span>{" "}
                      </span>
                    </div>
                  }
                >
                  <TimingTable />
                </Modal>
              </div>

              <div className="bg-[#FEA91D] p-4 rounded-md space-y-4 hidden sm:block">
                <p className="flex justify- start items-center gap-2">
                  <FaBell /> {t("alertsPanel")}
                </p>
                <p>
                  {t("offTrackAlert")}:{" "}
                  <span className="text-red-600 font-extrabold">
                    {t("none")}
                  </span>{" "}
                </p>
                <p>
                  {" "}
                  {t("instantAlert")}:{" "}
                  <span className="text-red-600 font-extrabold">
                    {t("none")}
                  </span>
                </p>
              </div>
            </div>{" "}
          </div>
        )}
        {activeTab === "map" && (
          <div className="w-full">
            <div className="relative flex-1 flex  justify-center border-4 border-[#0da27e]  ">
              <div className="absolute z-10 left-0 top-0 p-2 flex gap-1 flex-wrap  sm:text-xs sm:p-0.5">
                {selectedParkurs.map((parkur) => {
                  const bgColor = parkurColors[parkur]?.bg || "#f0f0f0";
                  const textColor =
                    visibleParkur === parkur
                      ? parkurColors[parkur]?.text
                      : "#333";
                  const borderColor =
                    visibleParkur === parkur
                      ? parkurColors[parkur]?.stroke
                      : "transparent";
                  const fontWeight =
                    visibleParkur === parkur ? "bold" : "normal";
                  const ridersInParkur = mockRiders
                    .filter((r) => r.parkur === parkur)
                    .map((r) => `${r.name} (${r.horse})`)
                    .join(", ");
                  return (
                    <div
                      key={parkur}
                      onClick={() => onParkurClick(parkur)}
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                        border: `2px solid ${borderColor}`,
                        fontWeight,
                        cursor: "pointer",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        userSelect: "none",
                        transition: "all 0.3s ease",
                      }}
                      className="cursor-pointer select-none transition-all ease-in-out duration-300 rounded-md
                                px-3 py-1.5 text-sm sm:px-6 sm:py-3 sm:text-base"
                      title={ridersInParkur || `Parkur ${parkur}`}
                    >
                      {t("track")} {parkur}
                    </div>
                  );
                })}
              </div>

              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={
                    visibleParkur && parkurPaths[visibleParkur]
                      ? getPathCenter(parkurPaths[visibleParkur])
                      : center
                  }
                  zoom={16}
                >
                  {visibleParkur !== null && parkurPaths[visibleParkur] && (
                    <>
                      <Polyline
                        path={parkurPaths[visibleParkur]}
                        options={{
                          strokeColor: parkurColors[visibleParkur].stroke,
                          strokeWeight: 4,
                        }}
                      />

                      {(() => {
                        const path = parkurPaths[visibleParkur];
                        const start = path[0];

                        return (
                          <>
                            <Marker
                              position={start}
                              title="Start/Finish"
                              icon={{
                                url: startIcon,
                                scaledSize: new window.google.maps.Size(40, 40),
                              }}
                            />
                          </>
                        );
                      })()}

                      {mockRiders
                        .filter(
                          (r) =>
                            selectedRiders.includes(r.id) &&
                            r.parkur === visibleParkur
                        )
                        .map((rider) => (
                          <Marker
                            key={`rider-${rider.id}`}
                            position={rider.position}
                            title={`${rider.name} (${rider.horse})`}
                            icon={{
                              url: rider.icon,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}
                          />
                        ))}

                      {stations
                        .filter((station) => station.parkur === visibleParkur)
                        .map((station, index) => (
                          <Marker
                            key={`station-${index}`}
                            position={station.position}
                            title={station.title}
                            icon={{
                              url: station.icon,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}
                          />
                        ))}
                    </>
                  )}
                </GoogleMap>
              )}
            </div>{" "}
          </div>
        )}
      </div>

      {/* web  görünüm */}
      <div className="hidden md:flex w-full gap-3">
        <div className="w-full md:w-1/3  flex flex-col gap-6  overflow-y-auto">
          <div className="bg-[#D9EDDF] p-4 rounded-md">
            <div className="space-y-2">
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 p-2 text-center">
                  {event.title}
                </h3>
                <div className="text-xs text-gray-500 mb-2 flex gap-2 justify-center items-center">
                  <span>{event.date}</span> {event.location}{" "}
                  <img
                    className="border rounded-full h-8 w-8"
                    src={event.flagImageUrL}
                    alt="spain flag"
                  />{" "}
                </div>
                <p className="text-xs text-gray-400 m-1 "></p>
              </div>

              <div className="text-black flex justify-center items-center gap-2 pb-2">
                <button onClick={handlePrev} disabled={categoryIndex === 0}>
                  <FaCaretLeft
                    className={`text-xl ${
                      categoryIndex === 0
                        ? "opacity-30 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  />
                </button>

                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold min-w-[80px] text-center">
                  {event.category[categoryIndex]}
                </span>

                <button
                  onClick={handleNext}
                  disabled={categoryIndex === event.category.length - 1}
                >
                  <FaCaretRight
                    className={`text-xl ${
                      categoryIndex === event.category.length - 1
                        ? "opacity-30 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-3 pl-1">
                <input
                  type="checkbox"
                  className="accent-green-600 w-4 h-4"
                  checked={
                    selectedRiders.length === filteredRiders.length &&
                    filteredRiders.length > 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRiders(filteredRiders.map((r) => r.id));
                    } else {
                      setSelectedRiders([]);
                    }
                  }}
                  id="selectAll"
                />
                <label
                  htmlFor="selectAll"
                  className={`px-3 py-1 rounded-md text-sm font-semibold cursor-pointer transition-all duration-200
      ${
        selectedRiders.length === filteredRiders.length &&
        filteredRiders.length > 0
          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
                >
                  {selectedRiders.length === filteredRiders.length &&
                  filteredRiders.length > 0
                    ? t("deselectAll")
                    : t("selectAll")}
                </label>
              </div>
              {filteredRiders.map((rider) => (
                <div
                  key={rider.id}
                  // className="flex items-center justify-between p-1 bg-white/90 rounded shadow-sm text-black hover:bg-white transition"
                  style={{ backgroundColor: getParkurColor(rider.parkur) }}
                  className={`flex items-center justify-between p-1 ${getParkurColor(
                    rider.parkur
                  )} rounded shadow-sm text-black hover:bg-white transition`}
                  onDoubleClick={() => {
                    setActiveRider(rider);
                    setTimingOpen(true);
                  }}
                >
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedRiders.includes(rider.id)}
                      onChange={() => toggleRider(rider.id)}
                      className="accent-green-600 w-4 h-4"
                    />
                    <span className="font-medium">
                      {rider.name} ({rider.horse}){" "}
                      <span className="text-amber-700 pl-2">
                        {t("phase")}
                        {rider.parkur}
                      </span>{" "}
                    </span>
                  </label>
                  <div className="flex gap-1 justify-center items-center">
                    <button className="text-[#0da27e]  hover:text-[#376b60]">
                      <TbClockHour4Filled
                        onClick={() => {
                          setActiveRider(rider);
                          setTimingOpen(true);
                        }}
                        size={19}
                        title={t("timingTitle")}
                      />
                    </button>
                    <button className="text-red-500  hover:text-red-700">
                      <FaBriefcaseMedical
                        onClick={() => {
                          setActiveRider(rider);
                          setVetOpen(true);
                        }}
                        size={18}
                        title={t("vetCard")}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Modal
              isOpen={isVetOpen}
              onClose={() => setVetOpen(false)}
              title={
                <div className="flex justify-between items-center gap-4">
                  <span>{t("vetReport")}</span>
                  <span className="text-sm">
                    {" "}
                    🐎{t("horse")}: {activeRider?.horse} 🆔 {t("horseNumber")}:{" "}
                    {activeRider?.id} 🏇
                    {t("rider")}: {activeRider?.name} 🏷️ {t("club")}:{" "}
                    {activeRider?.club} ⭕{t("phase")}
                    {activeRider?.parkur}
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
                  <span>{t("timing")}</span>
                  <span className="text-sm">
                    {" "}
                    🐎{t("horse")}: {activeRider?.horse} 🆔 {t("horseNumber")}:{" "}
                    {activeRider?.id} 🏇
                    {t("rider")}: {activeRider?.name} 🏷️ {t("club")}:{" "}
                    {activeRider?.club} ⭕{t("phase")}
                    {activeRider?.parkur}
                  </span>
                </div>
              }
            >
              <TimingTable />
            </Modal>
          </div>

          <div className="bg-[#FEA91D] p-4 rounded-md space-y-4 hidden sm:block">
            <p className="flex justify- start items-center gap-2">
              <FaBell /> {t("alertsPanel")}
            </p>
            <p>
              {t("offTrackAlert")}:{" "}
              <span className="text-red-600 font-extrabold">{t("none")}</span>{" "}
            </p>
            <p>
              {" "}
              {t("instantAlert")}:{" "}
              <span className="text-red-600 font-extrabold">{t("none")}</span>
            </p>
          </div>
        </div>

        <div className="relative flex-1 flex  justify-center border-4 border-[#0da27e] ">
          <div className="absolute z-10 left-0 top-0 p-2 flex gap-1 flex-wrap  sm:text-xs sm:p-0.5">
            {selectedParkurs.map((parkur) => {
              const bgColor = parkurColors[parkur]?.bg || "#f0f0f0";
              const textColor =
                visibleParkur === parkur ? parkurColors[parkur]?.text : "#333";
              const borderColor =
                visibleParkur === parkur
                  ? parkurColors[parkur]?.stroke
                  : "transparent";
              const fontWeight = visibleParkur === parkur ? "bold" : "normal";
              const ridersInParkur = mockRiders
                .filter((r) => r.parkur === parkur)
                .map((r) => `${r.name} (${r.horse})`)
                .join(", ");
              return (
                <div
                  key={parkur}
                  onClick={() => onParkurClick(parkur)}
                  style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    border: `2px solid ${borderColor}`,
                    fontWeight,
                    cursor: "pointer",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    userSelect: "none",
                    transition: "all 0.3s ease",
                  }}
                  className="cursor-pointer select-none transition-all ease-in-out duration-300 rounded-md
                                px-3 py-1.5 text-sm sm:px-6 sm:py-3 sm:text-base"
                  title={ridersInParkur || `Parkur ${parkur}`}
                >
                  {t("track")} {parkur}
                </div>
              );
            })}
          </div>

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={
                visibleParkur && parkurPaths[visibleParkur]
                  ? getPathCenter(parkurPaths[visibleParkur])
                  : center
              }
              zoom={17}
            >
              {visibleParkur !== null && parkurPaths[visibleParkur] && (
                <>
                  <Polyline
                    path={parkurPaths[visibleParkur]}
                    options={{
                      strokeColor: parkurColors[visibleParkur].stroke,
                      strokeWeight: 4,
                    }}
                  />

                  {(() => {
                    const path = parkurPaths[visibleParkur];
                    if (!path || path.length === 0) return null;
                    const start = path[0];

                    return (
                      <>
                        <Marker
                          position={start}
                          title="Start/Finish"
                          icon={{
                            url: startIcon,
                            scaledSize: new window.google.maps.Size(40, 40),
                          }}
                        />
                      </>
                    );
                  })()}

                  {/* {stations
                                        .filter(station => station.parkur === visibleParkur)
                                        .map((station, index) => {
                                            const iconSize = new window.google.maps.Size(40, 40);
                                            return (
                                                <Marker
                                                    key={index}
                                                    position={station.position}
                                                    title={station.title}
                                                    icon={{
                                                        url: station.icon,
                                                        scaledSize: iconSize,
                                                    }}
                                                />
                                            );
                                        })} */}

                  {mockRiders
                    .filter(
                      (r) =>
                        selectedRiders.includes(r.id) &&
                        r.parkur === visibleParkur
                    )
                    .map((rider) => (
                      <Marker
                        key={`rider-${rider.id}`}
                        position={rider.position}
                        title={`${rider.name} (${rider.horse})`}
                        icon={{
                          url: rider.icon,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                      />
                    ))}

                  {stations
                    .filter((station) => station.parkur === visibleParkur)
                    .map((station, index) => (
                      <Marker
                        key={`station-${index}`}
                        position={station.position}
                        title={station.title}
                        icon={{
                          url: station.icon,
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                      />
                    ))}
                </>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}
