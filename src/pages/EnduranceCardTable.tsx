
const events = [
    {
        status: "UPCOMING",
        daysLeft: 4,
        title: "II Raid Social CH del Norte y AERAC",
        date: "13/07/2025",
        description: "3 days from now",
        location: "Ravelo, Tenerife 🇪🇸",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiC0Ox5754kr8XTyNp2t0QZZvEHa1JG_E_wg&s", // kendi resminle değiştir
    },
    {
        status: "UPCOMING",
        daysLeft: 17,
        title: "Raid Las Cumbres",
        date: "26/07/2025",
        description: "2 weeks from now",
        location: "Ravelo, Tenerife 🇪🇸",
        imageUrl: "https://www.equus-journeys.com/photos/1800x1200/rider-getting-ready-for-an-endurance-race-6601.jpg",
    },
    {
        status: "UPCOMING",
        daysLeft: 80,
        title: "VI Raid Chanajiga Campeonato de Canarias 2025",
        date: "27/09/2025",
        description: "2 months from now",
        location: "Los Realejos, Tenerife 🇪🇸",
        imageUrl: "https://i.ytimg.com/vi/3xRylAPanLE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLComvJcW7e0H3e4EciBu9O8kn8z3g",
    },
    {
        status: "UPCOMING",
        daysLeft: 121,
        title: "XXIV Raid Ademuz",
        date: "07/11/2025 - 09/11/2025",
        description: "3 months from now",
        location: "Ademuz, Valencia 🇪🇸",
        imageUrl: "https://cypresstrailsranch.com/wp-content/uploads/sites/7432/2024/07/AboutEndurance2.png?w=400&zoom=2",
    },
];

export default function EnduranceCardTable() {
    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Başlık */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Endurance Horse Turkiye</h1>
                <p className="text-sm uppercase tracking-widest text-gray-600">
                    TURKISH EQUESTRIAN FEDERATION
                </p>
                <p className="text-xs text-gray-400 mt-1">FEI CERTIFIED SERVICE PROVIDER</p>
                <div className="flex justify-center space-x-8 mt-4 text-sm text-[#118e6f] font-semibold uppercase cursor-pointer">
                    <span>ATHLETES</span>
                    <span>HORSES</span>
                    <span>CLUBS</span>
                    <span className="material-icons">calendar_today</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {events.map((event, idx) => (
                    <div
                        key={idx}
                        className="border border-blue-400 rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
                    >
                        <div className="relative">
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-40 object-cover"
                            />
                            {/* Sol üst status ve gün bilgisi */}
                            <div className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-2 rounded">
                                {event.status} - {event.daysLeft}d
                            </div>
                            {/* Tarih kutucuğu */}
                            <div className="absolute bottom-2 left-2 bg-green-900 text-white text-xs px-2 py-0.5 rounded">
                                {event.date}
                            </div>
                        </div>

                        <div className="p-3 text-center">
                            <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                            <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                            <button className="bg-[#0DA27E] text-white py-1 px-6 rounded hover:bg-blue-800 transition">
                                View
                            </button>
                            <p className="text-xs text-gray-400 mt-2">{event.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between text-sm text-blue-700 font-semibold">
                <button className="hover:underline">&laquo; Previous</button>
                <button className="hover:underline">Next &raquo;</button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {events.map((event, idx) => (
                    <div
                        key={idx}
                        className="border border-blue-400 rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
                    >
                        <div className="relative">
                            <img
                                src={event.imageUrl}
                                alt={event.title}
                                className="w-full h-40 object-cover"
                            />
                            {/* Sol üst status ve gün bilgisi */}
                            <div className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-2 rounded">
                                {event.status} - {event.daysLeft}d
                            </div>
                            {/* Tarih kutucuğu */}
                            <div className="absolute bottom-2 left-2 bg-green-900 text-white text-xs px-2 py-0.5 rounded">
                                {event.date}
                            </div>
                        </div>

                        <div className="p-3 text-center">
                            <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                            <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                            <button className="bg-[#0DA27E] text-white py-1 px-6 rounded hover:bg-blue-800 transition">
                                View
                            </button>
                            <p className="text-xs text-gray-400 mt-2">{event.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
