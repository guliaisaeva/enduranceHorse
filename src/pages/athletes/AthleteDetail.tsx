import { useLocation } from "react-router-dom";

export default function AthleteDetail() {
  const location = useLocation();
  const event = location.state;

  if (!event) return <div>Atlet bulunamadı.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-gray-600">Kulüp: {event.club}</p>
      <p className="text-gray-600">At: {event.horse}</p>
      <p className="text-gray-600">Kategori: {event.category}</p>
      <p className="text-gray-600">KM: {event.km}</p>
      {event.athletImageUrl && (
        <img
          src={event.athletImageUrl}
          alt={event.name}
          className="w-40 h-40 rounded-full mt-4"
        />
      )}
    </div>
  );
}
