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
import Modal from "../components/Modal";
import TimingTable from "../components/TimingTable";
import VetTable from "../components/VetTable";
import flagIcon from "@/assets/images/flag.png";
import blueFlagIcon from "@/assets/images/blueFlag.png";
import maviIcon from "@/assets/images/mavi.png";
import morIcon from "@/assets/images/mor.png";
import sariIcon from "@/assets/images/sari.png";
import startIcon from "@/assets/images/start.svg";
import finishIcon from "@/assets/images/finish.svg";
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
    horse: "Lulibu",
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
    horse: "Lulibu",
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
    return <p className="text-center mt-10">Etkinlik bulunamadı.</p>;
  }
  return (
    <div className="text-white flex gap-3 justify-center flex-wrap p-3">
      <h2 className="text-center m-4 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        {t("watchLive")}
      </h2>
      <div className="md:hidden flex justify-center w-full gap-2 mb-4">
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
                        ? "Hepsini Kaldır"
                        : "Hepsini Seç"}
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
                            Parkur{rider.parkur}
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
                            title="Timing"
                          />
                        </button>
                        <button className="text-red-500  hover:text-red-700">
                          <FaBriefcaseMedical
                            onClick={() => {
                              setActiveRider(rider);
                              setVetOpen(true);
                            }}
                            size={18}
                            title="Vet Kartı"
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
                      <span className="font-bold">Veteriner Raporu </span>
                      <span className="text-xs md:text-sm">
                        {" "}
                        🐎{activeRider?.horse} 🆔 At No:{activeRider?.id}{" "}
                        <span className="hidden md:block">
                          🏇 Binici: {activeRider?.name} 🏷️ Takım:{" "}
                          {activeRider?.club} ⭕Phase:{activeRider?.parkur}
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
                          🏇 Binici: {activeRider?.name} 🏷️ Takım:{" "}
                          {activeRider?.club} ⭕Phase{activeRider?.parkur}
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
                  <FaBell /> ANLIK UYARILAR PANELİ
                </p>
                <p>
                  Rota Dışı Bildirimi:{" "}
                  <span className="text-red-600 font-extrabold">Yok</span>{" "}
                </p>
                <p>
                  {" "}
                  Anlık Uyarı:{" "}
                  <span className="text-red-600 font-extrabold">Yok</span>
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
                      Parkur {parkur}
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
                        const finish = path[path.length - 1];
                        const isSameLocation =
                          start.lat === finish.lat && start.lng === finish.lng;

                        return (
                          <>
                            <Marker
                              position={start}
                              title="Start"
                              icon={{
                                url: startIcon,
                                scaledSize: new window.google.maps.Size(40, 40),
                              }}
                            />

                            {!isSameLocation && (
                              <Marker
                                position={finish}
                                title="Finish"
                                icon={{
                                  url: finishIcon,
                                  scaledSize: new window.google.maps.Size(
                                    40,
                                    40
                                  ),
                                }}
                              />
                            )}

                            {isSameLocation && (
                              <Marker
                                position={{
                                  lat: finish.lat + 0.00005,
                                  lng: finish.lng + 0.00005,
                                }}
                                title="Finish (offset)"
                                icon={{
                                  url: finishIcon,
                                  scaledSize: new window.google.maps.Size(
                                    40,
                                    40
                                  ),
                                }}
                              />
                            )}
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
                    ? "Hepsini Kaldır"
                    : "Hepsini Seç"}
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
                        Parkur{rider.parkur}
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
                        title="Timing"
                      />
                    </button>
                    <button className="text-red-500  hover:text-red-700">
                      <FaBriefcaseMedical
                        onClick={() => {
                          setActiveRider(rider);
                          setVetOpen(true);
                        }}
                        size={18}
                        title="Vet Kartı"
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
                  <span>Veteriner Raporu </span>
                  <span className="text-sm">
                    {" "}
                    🐎At: {activeRider?.horse} 🆔 At No: {activeRider?.id} 🏇
                    Binici: {activeRider?.name} 🏷️ Takım: {activeRider?.club}{" "}
                    ⭕Phase{activeRider?.parkur}
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
                  <span>Timing</span>
                  <span className="text-sm">
                    {" "}
                    🐎At: {activeRider?.horse} 🆔 At No: {activeRider?.id} 🏇
                    Binici: {activeRider?.name} 🏷️ Takım: {activeRider?.club}{" "}
                    ⭕Phase{activeRider?.parkur}
                  </span>
                </div>
              }
            >
              <TimingTable />
            </Modal>
          </div>

          <div className="bg-[#FEA91D] p-4 rounded-md space-y-4 hidden sm:block">
            <p className="flex justify- start items-center gap-2">
              <FaBell /> ANLIK UYARILAR PANELİ
            </p>
            <p>
              Rota Dışı Bildirimi:{" "}
              <span className="text-red-600 font-extrabold">Yok</span>{" "}
            </p>
            <p>
              {" "}
              Anlık Uyarı:{" "}
              <span className="text-red-600 font-extrabold">Yok</span>
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
                  Parkur {parkur}
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
                    const finish = path[path.length - 1];
                    const isSameLocation =
                      start.lat === finish.lat && start.lng === finish.lng;

                    return (
                      <>
                        <Marker
                          position={start}
                          title="Start"
                          icon={{
                            url: startIcon,
                            scaledSize: new window.google.maps.Size(40, 40),
                          }}
                        />

                        {!isSameLocation && (
                          <Marker
                            position={finish}
                            title="Finish"
                            icon={{
                              url: finishIcon,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}
                          />
                        )}

                        {isSameLocation && (
                          <Marker
                            position={{
                              lat: finish.lat + 0.00005,
                              lng: finish.lng + 0.00005,
                            }}
                            title="Finish (offset)"
                            icon={{
                              url: finishIcon,
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}
                          />
                        )}
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
