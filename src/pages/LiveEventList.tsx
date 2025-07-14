import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

const categories = ["CEA0* 80", "CEN1* 80", "CENYJ1* 80", "CEA-P 60", "CEA-P 40", "CEA-I 20"];

const events = [
    {
        status: "LIVE",
        title: "II Raid Social CH del Norte y AERAC",
        date: "13/07/2025",
        description: "00:04:00",
        location: "Ravelo, Tenerife 🇪🇸",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiC0Ox5754kr8XTyNp2t0QZZvEHa1JG_E_wg&s",
        flagImageUrL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
        category: [...categories]

    },
    {
        status: "RESULT",
        title: "Raid Las Cumbres",
        date: "26/07/2025",
        description: "2 weeks from now",
        location: "Ravelo, Tenerife 🇪🇸",
        imageUrl: "https://www.equus-journeys.com/photos/1800x1200/rider-getting-ready-for-an-endurance-race-6601.jpg",
        flagImageUrL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
        category: [...categories]


    },
    {
        status: "RESULT",
        title: "VI Raid Chanajiga Campeonato de Canarias 2025",
        date: "27/09/2025",
        description: "2 months from now",
        location: "Los Realejos, Tenerife 🇪🇸",
        imageUrl: "https://i.ytimg.com/vi/3xRylAPanLE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLComvJcW7e0H3e4EciBu9O8kn8z3g",
        flagImageUrL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
        category: [...categories]


    },
    {
        status: "RESULT",
        title: "XXIV Raid Ademuz",
        date: "07/11/2025 - 09/11/2025",
        description: "3 months from now",
        location: "Turkiye, Ankara tr",
        imageUrl: "https://cypresstrailsranch.com/wp-content/uploads/sites/7432/2024/07/AboutEndurance2.png?w=400&zoom=2",
        flagImageUrL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
        category: [...categories]

    },
];





export default function LiveEventList() {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto p-4">
            <p className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
                Live Events
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                {events.map((event, idx) => (
                    <EventCard
                        key={idx}
                        event={event}
                        type="live"
                        onClick={() => navigate("/live", { state: event })}
                    />
                ))}
            </div>
        </div>
    );
}
