import AthleteCard from "../../components/AthleteCard";
import { mockRiders } from "../events/LiveMapPage";
import { useNavigate } from "react-router-dom";

export default function AllAthletes() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        Tüm Atletler
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        {mockRiders.map((rider) => (
          <AthleteCard
            key={rider.id}
            athlete={{
              name: rider.name,
              countryFlag: "🇹🇷",
              imageUrl: rider.athletImageUrl,
              club: rider.club,
              horse: rider.horse,
            }}
            onClick={() => navigate(`/athlet-detail/${rider.id}`, { state: rider })}
          />
        ))}
      </div>
    </div>
  );
}
