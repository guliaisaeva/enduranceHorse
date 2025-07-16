import { CiStreamOn } from "react-icons/ci";
import CustomButton from "./CustomButton";

interface EventCardProps {
    event: {
        status: string;
        title: string;
        date: string;
        description: string;
        location: string;
        imageUrl: string;
        flagImageUrL?: string;
        daysLeft?: number;
    };
    type?: "live" | "upcoming" | "result";
    onClick?: () => void;
    buttonLabel?: string;
    className?: string;
}

export default function EventCard({ event, type = "live", onClick, buttonLabel }: EventCardProps) {
    const statusColor =
        type === "live"
            ? "bg-red-600"
            : type === "upcoming"
                ? "bg-green-700"
                : "bg-amber-600";

    const defaultLabel = type === "live" ? "Canlı İzle" : "View";
    const statusText =
        type === "live"
            ? event.status
            : `${event.status}${event.daysLeft ? ` - ${event.daysLeft}d` : ""}`;

    return (
        <div onClick={onClick}
            className="rounded overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white flex flex-col h-[340px]">
            <div className="relative">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-40 object-cover filter brightness-50"
                />
                <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 rounded ${statusColor}`}>
                    {statusText}
                </div>
                <div className="absolute bottom-2 left-2 bg-green-900 text-white text-xs px-2 py-0.5 rounded">
                    {event.date}
                </div>
            </div>

            <div className="p-3 flex flex-col justify-between flex-grow text-center">
                <div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{event.title}</h3>
                    <p className="text-xs text-gray-400 my-2 truncate">{event.location}</p>
                    <p className="text-xs text-gray-500 mb-2">{event.description}</p>
                </div>

                <div className="mt-2 w-full">
                    {type === "live" ? (
                        <CustomButton onClick={onClick} className="bg-red-600 w-full hover:bg-red-700 text-white transition">
                            <CiStreamOn size={20} />
                            {buttonLabel || defaultLabel}
                        </CustomButton>
                    ) : (
                        <button onClick={onClick} className="bg-[#0DA27E] text-white py-1 px-6 rounded w-full hover:bg-amber-600 transition">
                            {buttonLabel || defaultLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
