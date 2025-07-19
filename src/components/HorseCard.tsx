import BaseCard from "./BaseCard";


interface Horse {
    name: string;
    breed: string;
    age: number;
    feiId: string;
    imageUrl: string;
  }

const HorseCard = ({
  horse,
  onClick,
}: {
  horse: Horse;
  onClick: () => void;
}) => {
  return (
    <BaseCard
      imageUrl={horse.imageUrl}
      title={horse.name}
      subtitle={`Irk: ${horse.breed}`}
      description={`Yaş: ${horse.age} | FEI ID: ${horse.feiId}`}
      tagText="HORSE"
      tagColor="bg-orange-600"
      bottomText="🐎"
      onClick={onClick}
    />
  );
};

export default HorseCard;
