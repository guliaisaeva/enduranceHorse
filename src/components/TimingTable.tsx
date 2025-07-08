import { timingData } from "./mockData";
import TimingTableRow from "./TimingTableRow";
import type { TimingCheckpoint } from "./mockData";

const TimingTable = () => (
  <div>
    <table className="min-w-full border border-gray-300 rounded-md text-sm">
      <thead className="bg-gray-100 text-black">
        <tr>
          <th className="p-2 border border-gray-300">Phase</th>
          <th className="p-2 border border-gray-300">Rec Time</th>
          <th className="p-2 border border-gray-300">Pos</th>
          <th className="p-2 border border-gray-300">Start</th>
          <th className="p-2 border border-gray-300">Arrived</th>
          <th className="p-2 border border-gray-300">Inspection</th>
          <th className="p-2 border border-gray-300">Rec Time</th>
          <th className="p-2 border border-gray-300">Loop Speed</th>
          <th className="p-2 border border-gray-300">Loop Time</th>
          <th className="p-2 border border-gray-300">Phase Speed</th>
          <th className="p-2 border border-gray-300">Phase Time</th>
          <th className="p-2 border border-gray-300">Ride Loop</th>
          <th className="p-2 border border-gray-300">Avg Ride Time</th>
          <th className="p-2 border border-gray-300">Ride Speed</th>
          <th className="p-2 border border-gray-300">Ride Time</th>
          <th className="p-2 border border-gray-300">To First</th>
        </tr>
      </thead>
      <tbody>
        {timingData.checkpoints.map((checkpoint: TimingCheckpoint, index: number) => (
          <TimingTableRow key={index} data={checkpoint} />
        ))}
      </tbody>
    </table>
  </div>
);

export default TimingTable;
