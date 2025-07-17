import { useTranslation } from "react-i18next";
import EventCard from "../components/EventCard";
import { useNavigate } from "react-router-dom";

const categories = [
  "CEA0* 80",
  "CEN1* 80",
  "CENYJ1* 80",
  "CEA-P 60",
  "CEA-P 40",
  "CEA-I 20",
];
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

export const events = [
  {
    status: "LIVE",
    title: "II Raid Social CH del Norte y AERAC",
    date: "13/07/2025",
    description: "00:04:00",
    location: "Ravelo, Tenerife 🇪🇸",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiC0Ox5754kr8XTyNp2t0QZZvEHa1JG_E_wg&s",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    category: [...categories],
  },
  {
    status: "LIVE",
    title: "Raid Las Cumbres",
    date: "26/07/2025",
    description: "2 weeks from now",
    location: "Ravelo, Tenerife 🇪🇸",
    imageUrl:
      "https://www.equus-journeys.com/photos/1800x1200/rider-getting-ready-for-an-endurance-race-6601.jpg",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    category: [...categories],
  },
  {
    status: "LIVE",
    title: "VI Raid Chanajiga Campeonato de Canarias 2025",
    date: "27/09/2025",
    description: "2 months from now",
    location: "Los Realejos, Tenerife 🇪🇸",
    imageUrl:
      "https://i.ytimg.com/vi/3xRylAPanLE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLComvJcW7e0H3e4EciBu9O8kn8z3g",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    category: [...categories],
  },
  {
    status: "LIVE",
    title: "XXIV Raid Ademuz",
    date: "07/11/2025 - 09/11/2025",
    description: "3 months from now",
    location: "Turkiye, Ankara tr",
    imageUrl:
      "https://cypresstrailsranch.com/wp-content/uploads/sites/7432/2024/07/AboutEndurance2.png?w=400&zoom=2",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    category: [...categories],
  },
  {
    status: "RESULT",
    daysLeft: 4,
    title: "II Raid Social CH del Norte y AERAC",
    date: "13/07/2025",
    description: "3 days from now",
    location: "Ravelo, Tenerife 🇪🇸",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiC0Ox5754kr8XTyNp2t0QZZvEHa1JG_E_wg&s",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
  {
    status: "RESULT",
    daysLeft: 17,
    title: "Raid Las Cumbres",
    date: "26/07/2025",
    description: "2 weeks from now",
    location: "Ravelo, Tenerife 🇪🇸",
    imageUrl:
      "https://www.equus-journeys.com/photos/1800x1200/rider-getting-ready-for-an-endurance-race-6601.jpg",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
  {
    status: "RESULT",
    daysLeft: 80,
    title: "VI Raid Chanajiga Campeonato de Canarias 2025",
    date: "27/09/2025",
    description: "2 months from now",
    location: "Los Realejos, Tenerife 🇪🇸",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    imageUrl:
      "https://i.ytimg.com/vi/3xRylAPanLE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLComvJcW7e0H3e4EciBu9O8kn8z3g",
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
  {
    status: "RESULT",
    daysLeft: 121,
    title: "XXIV Raid Ademuz",
    date: "07/11/2025 - 09/11/2025",
    description: "3 months from now",
    location: "Ademuz, Valencia 🇪🇸",
    flagImageUrL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/250px-Flag_of_Turkey.svg.png",
    imageUrl:
      "https://cypresstrailsranch.com/wp-content/uploads/sites/7432/2024/07/AboutEndurance2.png?w=400&zoom=2",
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
  {
    status: "UPCOMING",
    daysLeft: 4,
    title: "II Raid Social CH del Norte y AERAC",
    date: "13/07/2025",
    description: "3 days from now",
    location: "Ravelo, Tenerife 🇪🇸",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiC0Ox5754kr8XTyNp2t0QZZvEHa1JG_E_wg&s", // kendi resminle değiştir
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
  {
    status: "UPCOMING",
    daysLeft: 17,
    title: "Raid Las Cumbres",
    date: "26/07/2025",
    description: "2 weeks from now",
    location: "Ravelo, Tenerife 🇪🇸",
    imageUrl:
      "https://www.equus-journeys.com/photos/1800x1200/rider-getting-ready-for-an-endurance-race-6601.jpg",
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
  {
    status: "UPCOMING",
    daysLeft: 80,
    title: "VI Raid Chanajiga Campeonato de Canarias 2025",
    date: "27/09/2025",
    description: "2 months from now",
    location: "Los Realejos, Tenerife 🇪🇸",
    imageUrl:
      "https://i.ytimg.com/vi/3xRylAPanLE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLComvJcW7e0H3e4EciBu9O8kn8z3g",
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
  {
    status: "UPCOMING",
    daysLeft: 121,
    title: "XXIV Raid Ademuz",
    date: "07/11/2025 - 09/11/2025",
    description: "3 months from now",
    location: "Ademuz, Valencia 🇪🇸",
    imageUrl:
      "https://cypresstrailsranch.com/wp-content/uploads/sites/7432/2024/07/AboutEndurance2.png?w=400&zoom=2",
    categories: baseCategories.map((cat) => ({ name: cat.name })),
  },
];

function AllEvents() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        {t("allRaces")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {events.map((event, idx) => (
          <EventCard
            key={idx}
            event={event}
            type={event.status.toLowerCase() as "live" | "upcoming" | "result"}
            onClick={() => navigate("/event-detail", { state: event })}
          />
        ))}
      </div>
    </div>
  );
}

export default AllEvents;
