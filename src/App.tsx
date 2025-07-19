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
        </Routes>
      </Layout>
    </>
  );
}

export default App;
