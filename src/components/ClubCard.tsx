import BaseCard from "./BaseCard";

interface Club {
  name: string;
  imageUrl?: string;
  countryFlag: string;
}

const placeholderImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoId6-Sw74IMOWpb4Qnd5dTFSOX_yIxKDWwDv6s9u1D4RwVKunYZ6dW34&s";

const ClubCard = ({ club, onClick }: { club: Club; onClick: () => void }) => {
  return (
    <BaseCard
      imageUrl={club.imageUrl || placeholderImage}
      title={club.name}
      subtitle=""
      description=""
      tagText="CLUB"
      tagColor="bg-blue-700"
      bottomText={club.countryFlag}
      onClick={onClick}
    />
  );
};

export default ClubCard;
