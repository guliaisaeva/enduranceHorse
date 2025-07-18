import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import LiveMapPage from "./pages/LiveMapPage";
import EnduranceCardTable from "./pages/EventResultList";
import LiveEventList from "./pages/LiveEventList";
import EventDetail from "./pages/EventDetail";
import UpcomingEventList from "./pages/UpcomingEventList";
import AllEvents from "./pages/AllEvents";
import ResultRiderList from "./pages/ResultRiderList";
import AllEventTable from "./pages/AllEventTable";

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
        </Routes>
      </Layout>
    </>
  );
}

export default App;
