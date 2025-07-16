import { FaCalendarAlt } from "react-icons/fa";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";
const baseCategories = [
    {
        name: "CEN1* 80",
        count: 8,
        finished: 7,
        eliminated: 2,
        statusColor: "bg-red-500",
    },
    {
        name: "CEAO* 80",
        count: 5,
        finished: 5,
        eliminated: 0,
        statusColor: "bg-yellow-400",
    },
    {
        name: "CEA-P 60",
        count: 4,
        finished: 4,
        eliminated: 1,
        statusColor: "bg-green-400",
    },
    {
        name: "CEA-P 40",
        count: 6,
        finished: 6,
        eliminated: 0,
        statusColor: "bg-blue-300",
    },
];


const events = [
    {
        status: "RESULT",
        daysLeft: 4,
        title: "II Raid Social CH del Norte y AERAC",
        date: "13/07/2025",
        description: "3 days from now",
        location: "Ravelo, Tenerife 🇪🇸",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiC0Ox5754kr8XTyNp2t0QZZvEHa1JG_E_wg&s", // kendi resminle değiştir
        categories: baseCategories.map(cat => ({ name: cat.name })),

    },
    {
        status: "RESULT",
        daysLeft: 17,
        title: "Raid Las Cumbres",
        date: "26/07/2025",
        description: "2 weeks from now",
        location: "Ravelo, Tenerife 🇪🇸",
        imageUrl: "https://www.equus-journeys.com/photos/1800x1200/rider-getting-ready-for-an-endurance-race-6601.jpg",
        categories: baseCategories.map(cat => ({ name: cat.name })),

    },
    {
        status: "RESULT",
        daysLeft: 80,
        title: "VI Raid Chanajiga Campeonato de Canarias 2025",
        date: "27/09/2025",
        description: "2 months from now",
        location: "Los Realejos, Tenerife 🇪🇸",
        imageUrl: "https://i.ytimg.com/vi/3xRylAPanLE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLComvJcW7e0H3e4EciBu9O8kn8z3g",
        categories: baseCategories.map(cat => ({ name: cat.name })),

    },
    {
        status: "RESULT",
        daysLeft: 121,
        title: "XXIV Raid Ademuz",
        date: "07/11/2025 - 09/11/2025",
        description: "3 months from now",
        location: "Ademuz, Valencia 🇪🇸",
        imageUrl: "https://cypresstrailsranch.com/wp-content/uploads/sites/7432/2024/07/AboutEndurance2.png?w=400&zoom=2",
        categories: baseCategories.map(cat => ({ name: cat.name })),

    },
];

export default function EnduranceCardTable() {
    const navigate = useNavigate();
    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="text-center mb-8">

                <div className="flex justify-center space-x-8 mt-4 text-sm md:text-base text-[#118e6f] font-semibold uppercase cursor-pointer">
                    {["ATHLETES", "HORSES", "CLUBS"].map((item, index) => (
                        <span
                            key={index}
                            className="relative group"
                        >
                            <span className="group-hover:border-b-2 border-[#FEA91D] transition-all duration-300">
                                {item}
                            </span>
                        </span>
                    ))}
                    <span className="relative group">
                        <FaCalendarAlt className="group-hover:text-[#FEA91D] transition-colors duration-300" />
                        <span className="sr-only">Calendar</span>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">


                {events.map((event, idx) => (
                    <EventCard
                        key={idx}
                        event={{ ...event, status: "RESULT" }}
                        type="result"
                        onClick={() => navigate("/event-detail", { state: event })}

                    />
                ))}
            </div>


        </div>
    );
}
