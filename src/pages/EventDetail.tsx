import { useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();
  const event = location.state;

  if (!event)
    return <div className="p-6 text-red-500">No event data provided.</div>;
  const rawDate = event.date.split(" - ")[0];
  const [day, month, year] = rawDate.split("/");
  const isoDateStr = `${year}-${month}-${day}`;
  const dateObj = new Date(isoDateStr);
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const dayNum = dateObj.getDate();
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-center text-base md:text-lg text-[#118e6f] font-semibold uppercase">
          {event.title}
        </h1>
        <p className="text-sm text-gray-500">{event.date}</p>
        <p className="text-sm text-gray-600">{event.location}</p>
        <button
          onClick={() =>
            event.status === "UPCOMING"
              ? navigate("/upcoming-event")
              : navigate("/events")
          }
          className="mt-2 bg-[#0da27e] hover:bg-[#428173] text-white px-4 py-1 rounded text-xs"
        >
          {event.status}
        </button>
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
            <FaCalendarAlt color="#0e9978" /> {dayName} {dayNum}{" "}
            <span className="text-[#0e9978] text-sm">
              {event.status === "RESULT" &&
                `(${categories.reduce((sum, c) => sum + c.count, 0)})`}
            </span>
          </div>

          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => {
                if (event.status === "RESULT") {
                  navigate("/riders", {
                    state: {
                      ...event,
                      category: categories.map((c) => c.name),
                      selectedCategory: cat.name,
                    },
                  });
                }
              }}
              className={`flex items-center justify-between p-3 mb-3 rounded text-white ${cat.statusColor} ${cat.hoverColor} hover:text-white `}
            >
              <span className="font-medium">
                {cat.name}

                {event.status === "RESULT" && <span>({cat.count})</span>}
              </span>

              {event.status === "RESULT" && (
                <div className="flex items-center gap-2">
                  <button className="bg-white text-xs text-gray-700 px-2 py-1 rounded">
                    RESULTS
                  </button>
                  <span className="bg-[#0e9978] text-xs px-2 py-1 rounded-full">
                    {cat.finished}
                  </span>

                  {cat.eliminated !== 0 ? (
                    <span className="bg-red-600 text-xs px-2 py-1 rounded-full">
                      {cat.eliminated}
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full opacity-0 pointer-events-none">
                      0
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
