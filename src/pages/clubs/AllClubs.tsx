import { useTranslation } from "react-i18next";
import ClubCard from "../../components/ClubCard";
import { useNavigate } from "react-router-dom";

const mockClubs = [
  {
    id: 1,
    name: "Kayseri Binicilik",
    imageUrl:
      "https://www.scottishendurance.com/Client/Images/Cms/SERCroundelforapp.jpg",
    countryFlag: "TR",
  },
  {
    id: 2,
    name: "Athlanta",
    imageUrl:
      "https://i.etsystatic.com/25829418/r/il/d71d77/3021005771/il_fullxfull.3021005771_2xuo.jpg",
    countryFlag: "TR",
  },
  {
    id: 3,
    name: "Golden Breeze",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPTZWgpuxb6SR-EuDqxZYvvWFdGfRH5dbcdzg_lZW7uVqSdoPZea7hVdJ4oG0CAzQ1Scw&usqp=CAU",
    countryFlag: "FR",
  },
  {
    id: 4,
    name: "Shadow Runner",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8F2zbhWLS_39CTVvkqFBU17gu-hlmGmH_C61HVLegebNk84ZScCKgV5ccr_SCbjR_q10&usqp=CAU",
    countryFlag: "TR",
  },
  {
    id: 5,
    name: "Silver Mist",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtz0iodOpV451zyDlzvqCbYWdCeS8f4oaePRwXoEdO05JBFmJZZVMaW7Byi2C1LSN6bsU&usqp=CAU",
    countryFlag: "🇪🇸",
  },
  {
    id: 6,
    name: "Wildfire",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtz0iodOpV451zyDlzvqCbYWdCeS8f4oaePRwXoEdO05JBFmJZZVMaW7Byi2C1LSN6bsU&usqp=CAU",
    countryFlag: "🇪🇸",
  },
  {
    id: 7,
    name: "Kayseri Binicilik",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtz0iodOpV451zyDlzvqCbYWdCeS8f4oaePRwXoEdO05JBFmJZZVMaW7Byi2C1LSN6bsU&usqp=CAU",
    countryFlag: "TR",
  },
];

export default function AllClubs() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        {t("allClubs")}{" "}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        {mockClubs.map((club) => (
          <ClubCard
            key={club.id}
            club={club}
            onClick={() => navigate(`/club-detail/${club.id}`, { state: club })}
          />
        ))}
      </div>
    </div>
  );
}
