import { useNavigate } from "react-router-dom";
import HorseCard from "../../components/HorseCard";

type Horse = {
  id: number;
  name: string;
  countryFlag: string;
  breed: string;
  age: number;
  sex: "Stallion" | "Mare" | "Gelding" | "Filly" | "Colt";
  club: string;
  imageUrl?: string;
};

export const mockHorses: Horse[] = [
  {
    id: 1,
    name: "Thunderbolt",
    countryFlag: "🇬🇧",
    breed: "Thoroughbred",
    age: 7,
    sex: "Stallion",
    club: "Athlanta",
    imageUrl:
      "https://luksblog.com.tr/wp-content/uploads/2024/12/en-pahali-arap-atinin-fiyati-ne-kadardi-1160x770.jpeg",
  },
  {
    id: 2,
    name: "Golden Breeze",
    countryFlag: "🇫🇷",
    breed: "Arabian",
    age: 9,
    sex: "Mare",
    club: "Izmir Binicilik",

    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTnjHxh8rw4Y9wUdheciuUFHS7BUdw5xHfRvlHK3OT_M9p4_GLHkJ2YWREnzOBAwiDmk7eMV2FA9aTSawymel-OYrFuXtbFyxU7bot48Oc",
  },
  {
    id: 3,
    name: "Shadow Runner",
    countryFlag: "🇺🇸",
    breed: "Quarter Horse",
    age: 5,
    sex: "Gelding",
    club: "Kayseri Binicilik",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV2yHPLVlo21vgeEqnJBS5cBXjkHRI0MITobhiXq7xYtmceDUyKxXtWeY9GjhEPshEL3FnHpW-3E_iAnkKfmIFDw",
  },
  {
    id: 4,
    name: "Silver Mist",
    countryFlag: "🇩🇪",
    breed: "Hanoverian",
    age: 3,
    sex: "Filly",
    club: "Istanbul Binicilik",

    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPL7SPHYn1r8YCTAFsLad_LtLYBXrW0pk2A&s",
  },
  {
    id: 5,
    name: "Wildfire",
    countryFlag: "🇹🇷",
    breed: "Akhal-Teke",
    age: 2,
    sex: "Colt",
    club: "Kayseri Binicilik",

    imageUrl: "",
  },
];

export default function AllHorses() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-center m-8 text-base md:text-lg text-[#118e6f] font-semibold uppercase">
        Tüm Atletler
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        {mockHorses.map((horse) => (
          <HorseCard
            key={horse.id}
            horse={{
              name: horse.name,
              countryFlag: "🇹🇷",
              imageUrl: horse.imageUrl,
              breed: horse.breed,
              age: horse.age,
              sex: horse.sex,
            }}
            onClick={() => navigate(`/horse-detail/${horse.id}`)}
            />
        ))}
      </div>
    </div>
  );
}
