
import { Route, Routes } from 'react-router-dom'

import Layout from './Layout'
import Homepage from './pages/Homepage'
import LiveMapPage from './pages/LiveMapPage'
import EnduranceCardTable from './pages/EnduranceCardTable'
import LiveEventList from './pages/LiveEventList'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/live" element={<LiveMapPage  />} />
          <Route path="/events" element={<EnduranceCardTable />} />
          <Route path="/live-events" element={<LiveEventList />} />
        </Routes>
      </Layout>
    </>

  )
}

export default App
