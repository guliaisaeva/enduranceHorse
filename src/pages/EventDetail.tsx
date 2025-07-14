// import { useLocation } from "react-router-dom";

// export default function EventDetail() {
//   const location = useLocation();
//   const event = location.state;

//   if (!event) return <div className="p-6 text-red-500">No event data provided.</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <img src={event.imageUrl} alt={event.title} className="w-full h-60 object-cover rounded-lg mb-6" />
//       <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
//       <p className="text-gray-600 mb-2">{event.date}</p>
//       <p className="text-gray-700 mb-4">{event.description}</p>
//       <p className="text-gray-500 text-sm">{event.location}</p>
//       <span className="inline-block mt-4 px-4 py-1 bg-green-600 text-white rounded-full text-xs">
//         {event.status}
//       </span>
//     </div>
//   );
// }


import { useLocation } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// Mock categories per event
const categories = [
    {
        name: "CEN1* 80",
        count: 8,
        finished: 7,
        eliminated: 2,
        statusColor: "bg-red-500",
        hoverColor: "hover:bg-red-600",

    },
    {
        name: "CEAO* 80",
        count: 5,
        finished: 5,
        eliminated: 0,

        statusColor: "bg-yellow-400",
        hoverColor: "hover:bg-yellow-500",

    },
    {
        name: "CEA-P 60",
        count: 4,
        finished: 4,
        eliminated: 1,

        statusColor: "bg-green-400",
        hoverColor: "hover:bg-green-500",

    },
    {
        name: "CEA-P 40",
        count: 6,
        finished: 6,
        eliminated: 0,
        statusColor: "bg-blue-300",
        hoverColor: "hover:bg-blue-400",

    },
];

export default function EventDetail() {
    const location = useLocation();
    const event = location.state;

    if (!event) return <div className="p-6 text-red-500">No event data provided.</div>;
    const rawDate = event.date.split(" - ")[0];
    const [day, month, year] = rawDate.split("/");
    const isoDateStr = `${year}-${month}-${day}`;
    const dateObj = new Date(isoDateStr);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const dayNum = dateObj.getDate();
    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="text-center mb-6">

                <h1 className="text-center text-base md:text-lg text-[#118e6f] font-semibold uppercase">{event.title}</h1>
                <p className="text-sm text-gray-500">{event.date}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <button className="mt-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded text-xs">
                    {event.status}                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2  justify-center hidden md:flex">
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="rounded-lg shadow-md max-w-xs w-full"
                    />
                </div>

                <div className="md:w-1/2">
                    <div className="flex items-center gap-2 mb-3 justify-end text-xl text-[#0e9978] font-medium">
                        <FaCalendarAlt color="#0e9978" />  {dayName} {dayNum} <span className="text-[#0e9978] text-sm">({categories.reduce((sum, c) => sum + c.count, 0)})</span>
                    </div>

                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between p-3 mb-3 rounded text-white ${cat.statusColor} ${cat.hoverColor} hover:text-white `}
                        >
                            <span className="font-medium">
                                {cat.name} ({cat.count})
                            </span>

                            <div className="flex items-center gap-2">
                                <button className="bg-white text-xs text-gray-700 px-2 py-1 rounded">RESULTS</button>
                                <span className="bg-[#0e9978] text-xs px-2 py-1 rounded-full">{cat.finished}</span>

                                {cat.eliminated !== 0 ? (
                                    <span className="bg-red-600 text-xs px-2 py-1 rounded-full">{cat.eliminated}</span>
                                ) : (
                                    <span className="text-xs px-2 py-1 rounded-full opacity-0 pointer-events-none">0</span>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 border-t justify-center pt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    VET-GATE
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-green-500" />
                    ASISTENCIA EL ACEBIÑAL
                </div>
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-yellow-500" />
                    ASISTENCIA PUNTO DE ENCUENTRO
                </div>
            </div>
        </div>
    );
}
