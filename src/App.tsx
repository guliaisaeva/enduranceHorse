
import { Route, Routes } from 'react-router-dom'

import Layout from './Layout'
import Homepage from './pages/Homepage'
import LiveMapPage from './pages/LiveMapPage'

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/live" element={<LiveMapPage />} />
          {/* other routes */}
        </Routes>
      </Layout>
    </>

  )
}

export default App
