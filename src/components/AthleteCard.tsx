import BaseCard from "./BaseCard";
import { useTranslation } from "react-i18next";

interface Athlete {
  name: string;
  countryFlag: string;
  imageUrl?: string;
  club: string;
  horse: string;
}

const placeholderImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoId6-Sw74IMOWpb4Qnd5dTFSOX_yIxKDWwDv6s9u1D4RwVKunYZ6dW34&s";

const AthleteCard = ({
  athlete,
  onClick,
}: {
  athlete: Athlete;
  onClick: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <BaseCard
      imageUrl={athlete.imageUrl || placeholderImage}
      title={`${athlete.name} ${athlete.countryFlag}`}
      subtitle={`${t("club")}: ${athlete.club}`}
      description={`${t("horse")}: ${athlete.horse}`}
      tagText={t("tag")}
      tagColor="bg-green-700"
      bottomText={athlete.countryFlag}
      onClick={onClick}
    />
  );
};

export default AthleteCard;
