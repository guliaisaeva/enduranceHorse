import { useLocation, useNavigate } from "react-router-dom";
import BaseCard from "../../components/BaseCard";
import { mockHorses } from "../horses/AllHorses";

const mockResults = [
  {
    position: "2",
    competition: "CEI1* 100",
    horse: "ASALAH-MEDAYA",
    athlete: "Valeria PÉREZ LEE",
    event: "Raid Tadasport 25",
    date: "21/06/2025",
    status: "Qualified",
  },
  {
    position: "Q 6",
    competition: "CEA-P 60",
    horse: "KAMIL AA 50%",
    athlete: "Ruymán PÉREZ PÉREZ",
    event: "XXVII Raid La Corona",
    date: "10/05/2025",
    status: "Qualified",
  },
];

export default function ClubDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const club = location.state;
  const clubHorses = mockHorses.filter((horse) => horse.club === club.name);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          {club.name} {club.countryFlag}
        </h2>
        <img
          src={club.imageUrl}
          alt={club.name}
          className="mx-auto w-48 mt-4"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
        {clubHorses.length > 0 ? (
          clubHorses.map((horse) => (
            <BaseCard
              key={horse.id}
              imageUrl={
                horse.imageUrl ||
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAAPFBMVEX///+rq6unp6fMzMykpKTp6enx8fHU1NS0tLS6urr6+vqwsLDHx8fPz8/w8PD19fXa2trh4eHl5eXAwMAzrysnAAADpklEQVR4nO2c2ZKDIBAAE6KJmsPr//91c69yKKREHav7dctl6YVhGJTdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZqE5LMU1XbrvVupELUe9dO9t5PsFyZfuvY1FjWRL994GRnQeRs5NOj+rNpIVCzSMER2M6GBEByM6GNHBiI4cI+mhbdtLE12SFCO3XKnH36ryJnLDQoxU/xm2usZtWIaRWu1nUyLCSNnfh6moE0eEkYvqK4lavpBgpNA368ktYsMSjKSJbqSK2LAEI7VuRB0iNizBSGUYuURsWIIRc4zEXH8lGDkacSTm6YEEI7tMX2zKiA2LMFL185HAMJJWdcj2UIQRfZCEDJEyT5JkH7BcyzBSnrujJORY9r0BSPzXaxlGHv/pz5TJQoQUn4Mw5T1KhBi5x5LseUadnYJKRlcVPLLEGNkVt7qq0rASWtOZa7nno3KM/EB5/mGF2rSRvLdqe+Z1WzZy0Moq6ujz1IaNNJoQz1CyXSO9IPIeJD5ZyXaN6KXIJx6hZLNGKpuQ/Xl8A7BVI6nNx+MAbPTJjRopjAKCdyjZqJHWOmeeSsay+W0asQcRv1CySSM3t4/7IGmHH96ikW8JwKHkNPj0Fo3o2bvBYCiRayRt84u1a/WYkOHfK9bISam92lvW0qOZvRvzZqgwINXI+5zP0rd8dIgMHxwLNdI4+zYaRF643y6QaaT4nxlaxtXo538O3LJlGmk7fetlXKW9/ybuUCLSSC8l7WZchTt7N5S4QolEI1pK2sm4Tt5C7mPLEUoEGjH3tZ++OUoAjkHiKAwINGIWx86vHxTjmUhPib0wIM+IZV/7DpOhn/bZjyvEGbHOjGffQoLIG1thQJoRV3HsFhZEXqjWolyaEUdKqvLyl89hbYUBYUbcKWlYVP1i7p5lGfFOSb05G9JlGfHZ14ZhZiWijFwnF2IJJZKM1NP7eKCFEkFGLEfbk5D1sxJBRvz3tWFohQE5Rk6etaAflPQKA2KMpJFGyJNuYUCKkdJ1tD0JXfVSjFjfj5mMbigRYmToaHsSJf+FARlGftjXhvJ9j1GEEef7MdOhvu8xijASN4i8lXy+dJNgxPhOLw7vL80FGDnO4uN7FCbAyGx3xb0KA+s3cpntysnkGUpWb6Q8zcjjP7B6I7ODEZ1VGznfjrNzW7WRfbIA6zayFBjRWeWtxhU3X+vUi92Ofoh9CR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMA2+AN7/TZH3Ls1kQAAAABJRU5ErkJggg=="
              }
              title={`${horse.name} ${horse.countryFlag}`}
              subtitle={`${horse.age} yaş / ${horse.breed} / ${horse.sex}`}
              tagText={horse.sex}
              tagColor="bg-blue-600"
              bottomText={horse.countryFlag}
              onClick={() =>
                navigate(`/horse-detail/${horse.id}`, { state: horse })
              }
            />
          ))
        ) : (
          <p className="col-span-5 text-center text-gray-500">
            Bu kulübe ait at bulunamadı.
          </p>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2 text-center">
        ENDURANCE RESULTS
      </h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Position</th>
            <th className="p-2">Competition</th>
            <th className="p-2">Horse</th>
            <th className="p-2">Athlete</th>
            <th className="p-2">Endurance Event</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockResults.map((result, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{result.position}</td>
              <td className="p-2">{result.competition}</td>
              <td className="p-2">{result.horse}</td>
              <td className="p-2">{result.athlete}</td>
              <td className="p-2">
                {result.event} <br /> {result.date}
              </td>
              <td className="p-2">{result.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
