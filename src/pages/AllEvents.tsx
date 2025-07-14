import UpcomingEventList from './UpcomingEventList'
import EventResultList from './EventResultList'
import LiveEventList from './LiveEventList'

function AllEvents() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
            <LiveEventList/>
            <UpcomingEventList />
            <EventResultList />
        </div>
    )
}

export default AllEvents