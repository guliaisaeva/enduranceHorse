import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import LiveMapPage from "./pages/events/LiveMapPage";
import EnduranceCardTable from "./pages/events/EventResultList";
import LiveEventList from "./pages/events/LiveEventList";
import EventDetail from "./pages/events/EventDetail";
import UpcomingEventList from "./pages/events/UpcomingEventList";
import AllEvents from "./pages/events/AllEvents";
import ResultRiderList from "./pages/events/ResultRiderList";
import AllEventTable from "./pages/events/AllEventTable";
import AllAthletesPage from "./pages/athletes/AllAthletes";
import AthleteDetail from "./pages/athletes/AthleteDetail";
import AllHorses from "./pages/horses/AllHorses";
import HorseDetail from "./pages/horses/HorseDetail";
import AllClubs from "./pages/clubs/AllClubs";
import ClubDetail from "./pages/clubs/ClubDetail";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/live" element={<LiveMapPage />} />
          <Route path="/events" element={<EnduranceCardTable />} />
          <Route path="/live-events" element={<LiveEventList />} />
          <Route path="/event-detail" element={<EventDetail />} />
          <Route path="/upcoming-event" element={<UpcomingEventList />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/all-events-table" element={<AllEventTable />} />
          <Route path="/riders" element={<ResultRiderList />} />
          <Route path="/all-athlets" element={<AllAthletesPage />} />
          <Route path="/athlet-detail/:id" element={<AthleteDetail />} />
          <Route path="/all-horses" element={<AllHorses />} />
          <Route path="/horse-detail/:id" element={<HorseDetail />} />
          <Route path="/all-clubs" element={<AllClubs />} />
          <Route path="/club-detail/:id" element={<ClubDetail />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
