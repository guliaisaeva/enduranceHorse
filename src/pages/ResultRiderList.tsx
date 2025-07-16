import { useEffect, useState } from "react";
import { FaBriefcaseMedical, FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { mockRiders } from "./LiveMapPage"; // Assuming mockRiders includes .category field
import { TbClockHour4Filled } from "react-icons/tb";
import Modal from "../components/Modal";
import VetTable from "../components/VetTable";
import TimingTable from "../components/TimingTable";

function ResultRiderList() {
  const location = useLocation();
  const event = location.state;

  if (!event) return <div className="p-4 text-red-500">No event data</div>;

  const categoryList: string[] = event.category || [];

  // 👇 Initial category index based on selectedCategory passed from EventDetail
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
  } | null>(null);
  return (
    <div className="p-6">
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
        <p className="text-xs text-gray-400 m-1 "> 09:00:00 </p>
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

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
          {event.category[categoryIndex]}
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

      <ul className="space-y-2">
        {filteredRiders.length === 0 ? (
          <li className="text-gray-500">No riders in this category</li>
        ) : (
          filteredRiders.map((rider) => (
            <li key={rider.id} className="p-2 border rounded">
              <strong>{rider.name}</strong> - Horse: {rider.horse}

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
            </li>
          ))
        )}
      </ul>

      
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
  );
}

export default ResultRiderList;
