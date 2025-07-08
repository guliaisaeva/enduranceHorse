import { useEffect, useRef, useState } from "react";
import { TbClockHour4Filled } from "react-icons/tb";
import { FaBriefcaseMedical } from "react-icons/fa";
import { FaBell } from "react-icons/fa6"
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import Modal from "../components/Modal";
import TimingTable from "../components/TimingTable"
import VetTable from "../components/VetTable";

const mockRiders = [
    { id: 1, name: "Ahmet Yılmaz", horse: "Carolla", parkur: 1 },
    { id: 2, name: "Zeynep Kara", horse: "Black", parkur: 2 },
    { id: 3, name: "Mert Demir", horse: "Roza", parkur: 3 },
    { id: 4, name: "Josef", horse: "Black", parkur: 4 },
    { id: 5, name: "Josef", horse: "Snow", parkur: 5 },
    { id: 6, name: "Tom Klein", horse: "Roza", parkur: 1 }
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
        default:
            return "bg-gray-100";
    }
};
const parkurColors: Record<number, { bg: string; text: string; stroke: string }> = {
    1: { bg: "#FEF3C7", text: "#92400E", stroke: "#FBBF24" }, // sarı tonlar
    2: { bg: "#DBEAFE", text: "#1E40AF", stroke: "#3B82F6" }, // mavi tonlar
    3: { bg: "#FEE2E2", text: "#991B1B", stroke: "#EF4444" }, // kırmızı tonlar
    4: { bg: "#E9D5FF", text: "#6B21A8", stroke: "#A78BFA" }, // mor tonlar
    5: { bg: "#D1FAE5", text: "#065F46", stroke: "#10B981" }, // yeşil tonlar
};
//google map 
const containerStyle = {
    width: '100%',
    height: '500px',
};

const center = {
    lat: 39.925533,
    lng: 32.866287,
};

const parkurPaths: Record<number, { lat: number; lng: number }[]> = {
    1: [
        { lat: 39.9255, lng: 32.8662 },
        { lat: 39.9258, lng: 32.8666 },
        { lat: 39.9261, lng: 32.8670 },
        { lat: 39.9264, lng: 32.8674 },
        { lat: 39.9267, lng: 32.8678 },
        { lat: 39.9270, lng: 32.8680 },
        { lat: 39.9273, lng: 32.8683 },
        { lat: 39.9275, lng: 32.8686 },
        { lat: 39.9273, lng: 32.8689 },
        { lat: 39.9270, lng: 32.8690 },
        { lat: 39.9267, lng: 32.8688 },
        { lat: 39.9264, lng: 32.8685 },
        { lat: 39.9260, lng: 32.8680 },
        { lat: 39.9257, lng: 32.8676 },
        { lat: 39.9255, lng: 32.8672 },
        { lat: 39.9255, lng: 32.8662 },
    ],
    2: [
        { lat: 39.9260, lng: 32.8660 },
        { lat: 39.9263, lng: 32.8663 },
        { lat: 39.9266, lng: 32.8667 },
        { lat: 39.9270, lng: 32.8671 },
        { lat: 39.9273, lng: 32.8675 },
        { lat: 39.9275, lng: 32.8679 },
        { lat: 39.9277, lng: 32.8682 },
        { lat: 39.9279, lng: 32.8686 },
        { lat: 39.9277, lng: 32.8690 },
        { lat: 39.9274, lng: 32.8693 },
        { lat: 39.9271, lng: 32.8690 },
        { lat: 39.9267, lng: 32.8687 },
        { lat: 39.9263, lng: 32.8683 },
        { lat: 39.9260, lng: 32.8678 },
        { lat: 39.9258, lng: 32.8673 },
        { lat: 39.9260, lng: 32.8660 },
    ],
    3: [
        { lat: 39.9252, lng: 32.8665 },
        { lat: 39.9255, lng: 32.8668 },
        { lat: 39.9258, lng: 32.8672 },
        { lat: 39.9262, lng: 32.8676 },
        { lat: 39.9265, lng: 32.8680 },
        { lat: 39.9268, lng: 32.8684 },
        { lat: 39.9270, lng: 32.8687 },
        { lat: 39.9273, lng: 32.8690 },
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
        position: { lat: 39.9260, lng: 32.8670 },
        title: "Yardım ve veteriner Noktası",
        icon: '/public/flag.png',
        parkur: 1,

    },
    {
        position: { lat: 39.9270, lng: 32.8675 },
        title: "Su Noktası",
        icon: '/public/blueFlag.png',
        parkur: 1,

    },
    {
        position: { lat: 39.9267, lng: 32.8690 },
        title: "Duru Naz(Roza)",
        icon: '/public/mavi.png',
        parkur: 2,

    },
    {
        position: { lat: 39.9255, lng: 32.8662 },
        title: "Binici Ahmet(ati Carollla)",
        icon: '/public/mor.png',
        parkur: 1,

    },
    {
        position: { lat: 39.9270, lng: 32.8680 },
        title: "Binici Ahmet(ati Carollla)",
        icon: '/public/sari.png',
        parkur: 1,

    },
    {
        position: { lat: 39.9255, lng: 32.8678 },
        title: "Binici Ahmet(ati Carollla)",
        icon: '/public/blueFlag.png',
        parkur: 3,

    },

];



export default function LiveMapPage() {
    const [selectedRiders, setSelectedRiders] = useState<number[]>([]);
    const [isVetOpen, setVetOpen] = useState(false);
    const [isTimingOpen, setTimingOpen] = useState(false);
    const [googleMapInstance, setGoogleMapInstance] = useState<any>(null);

    const [visibleParkur, setVisibleParkur] = useState<number | null>(null);
    const polylineRef = useRef<google.maps.Polyline | null>(null);
    useEffect(() => {
        // Eğer eski polyline varsa temizle
        if (polylineRef.current) {
            polylineRef.current.setMap(null);
            polylineRef.current = null;
        }

        if (visibleParkur !== null && parkurPaths[visibleParkur] && googleMapInstance) {
            const polyline = new googleMapInstance.maps.Polyline({
                path: parkurPaths[visibleParkur],
                strokeColor: parkurColors[visibleParkur].stroke,
                strokeWeight: 4,
            });
            polyline.setMap(googleMapInstance.map); // haritaya ekle
            polylineRef.current = polyline;
        }

        // Temizlik için return (isteğe bağlı)
        return () => {
            if (polylineRef.current) {
                polylineRef.current.setMap(null);
                polylineRef.current = null;
            }
        };
    }, [visibleParkur, googleMapInstance]);


    const selectedParkurs = Array.from(new Set(
        mockRiders
            .filter(r => selectedRiders.includes(r.id))
            .map(r => r.parkur)
    ));


    const toggleRider = (id: number) => {
        setSelectedRiders((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        );
    };

    const onParkurClick = (parkur: number) => {
        setVisibleParkur(null); // önce kaldır
        setTimeout(() => {
            setVisibleParkur(parkur); // sonra yeni parkur seç
        }, 10); // 10ms delay yeterli
    };

    return (
        <div className="text-white flex gap-3  flex-wrap p-3">
            <div className="w-full md:w-1/3  flex flex-col gap-6  overflow-y-auto">

                <div className="bg-[#D9EDDF] p-4 rounded-md">
                    <div className="space-y-2">
                        {mockRiders.map((rider) => (
                            <div
                                key={rider.id}
                                // className="flex items-center justify-between p-1 bg-white/90 rounded shadow-sm text-black hover:bg-white transition"
                                style={{ backgroundColor: getParkurColor(rider.parkur) }}

                                className={`flex items-center justify-between p-1 ${getParkurColor(rider.parkur)} rounded shadow-sm text-black hover:bg-white transition`}
                                onDoubleClick={() => setTimingOpen(true)}   >
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedRiders.includes(rider.id)}
                                        onChange={() => toggleRider(rider.id)}
                                        className="accent-green-600 w-4 h-4"
                                    />
                                    <span className="font-medium">{rider.name} ({rider.horse})   <span className="text-amber-700 pl-2">Parkur{rider.parkur}</span> </span>
                                </label>
                                <div className="flex gap-1 justify-center items-center">

                                    <button className="text-[#0da27e]  hover:text-[#376b60]">
                                        <TbClockHour4Filled onClick={() => setTimingOpen(true)} size={19} title="Timing" />
                                    </button>
                                    <button className="text-red-500  hover:text-red-700">
                                        <FaBriefcaseMedical onClick={() => setVetOpen(true)} size={18} title="Vet Kartı" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Modal
                        isOpen={isVetOpen}
                        onClose={() => setVetOpen(false)}
                        title={<div className="flex justify-between items-center gap-4">
                            <span>Veteriner Raporu </span>
                            <span className="text-sm"> 🐎At: Carolla 🆔 At No: 1245 🏇 Binici: Ahmet Yılmaz  🏷️ Takım: Kayseri Riders 🏆 2</span>
                        </div>}
                    >
                        <VetTable />
                    </Modal>
                    <Modal
                        isOpen={isTimingOpen}
                        onClose={() => setTimingOpen(false)}
                        title={<div className="flex justify-between items-center gap-4">
                            <span>Timing</span>
                            <span className="text-sm">🐎 At: Carolla 🆔 At No: 1245 🏇 Binici: Ahmet Yılmaz  🏷️ Takım: Kayseri Riders 🏆 2</span>
                        </div>}
                    >
                        <TimingTable />
                    </Modal>

                </div>

                <div className="bg-[#FEA91D] p-4 rounded-md space-y-4 hidden sm:block">
                    <p className="flex justify- start items-center gap-2"><FaBell /> ANLIK UYARILAR PANELİ</p>
                    <p >Rota Dışı Bildirimi: <span className="text-red-600 font-extrabold">Yok</span> </p>
                    <p> Anlık Uyarı: <span className="text-red-600 font-extrabold">Yok</span></p>

                </div>

            </div>

            <div className="relative flex-1 flex items-center justify-center border-4 border-[#0da27e]  ">
                <div className="absolute z-10 left-0 top-0 p-2 flex gap-1">
                    {selectedParkurs.map((parkur) => {
                        const bgColor = parkurColors[parkur]?.bg || '#f0f0f0';
                        const textColor = visibleParkur === parkur ? parkurColors[parkur]?.text : '#333';
                        const borderColor = visibleParkur === parkur ? parkurColors[parkur]?.stroke : 'transparent';
                        const fontWeight = visibleParkur === parkur ? 'bold' : 'normal';
                        const ridersInParkur = mockRiders
                            .filter(r => r.parkur === parkur)
                            .map(r => `${r.name} (${r.horse})`)
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
                                    cursor: 'pointer',
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    userSelect: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                                title={ridersInParkur || `Parkur ${parkur}`}

                            >
                                Parkur {parkur}
                            </div>
                        );
                    })}</div>
                <LoadScript googleMapsApiKey="AIzaSyDEe_sjdPYPJ46ad_Dfhmg3p6Ux8YMj5eM" >

                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} onLoad={() => {
                        if (typeof window !== 'undefined' && window.google) {
                            setGoogleMapInstance(window.google);
                        }
                    }}>
                        {visibleParkur !== null && parkurPaths[visibleParkur] && (
                            <Polyline
                                key={`polyline-${visibleParkur}`}
                                path={parkurPaths[visibleParkur]}
                                options={{
                                    strokeColor: parkurColors[visibleParkur].stroke,
                                    strokeWeight: 4,
                                }}

                            />
                        )}


                        {visibleParkur !== null && googleMapInstance &&
                            stations.filter(station => station.parkur === visibleParkur).map((station, index) => (
                                <Marker
                                    key={index}
                                    position={station.position}
                                    title={station.title}
                                    icon={{
                                        url: station.icon,
                                        scaledSize: new googleMapInstance.maps.Size(40, 40),
                                    }}
                                />
                            ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}
