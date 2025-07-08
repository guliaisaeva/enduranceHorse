import type { TimingCheckpoint } from "./mockData";

interface Props {
  data: TimingCheckpoint;
}

const TimingTableRow = ({ data }: Props) => (
  <tr className="hover:bg-gray-50 text-black">
    <td className="p-2 border border-gray-300"> <div className="flex items-center justify-between gap-2">
      {data.phase}
      <span
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: data.color }}
      ></span>
    </div></td>
    <td className="p-2 border border-gray-300">{data.recTime}</td>
    <td className="p-2 border border-gray-300">{data.pos}</td>
    <td className="p-2 border border-gray-300">{data.start}</td>
    <td className="p-2 border border-gray-300">{data.arrived}</td>
    <td className="p-2 border border-gray-300">{data.inspection}</td>
    <td className="p-2 border border-gray-300">{data.recTime2}</td>
    <td className="p-2 border border-gray-300">{data.loopSpeed}</td>
    <td className="p-2 border border-gray-300">{data.loopTime}</td>
    <td className="p-2 border border-gray-300">{data.phaseSpeed}</td>
    <td className="p-2 border border-gray-300">{data.phaseTime}</td>
    <td className="p-2 border border-gray-300">{data.rideLoop}</td>
    <td className="p-2 border border-gray-300">{data.avgRideTime}</td>
    <td className="p-2 border border-gray-300">{data.rideSpeed}</td>
    <td className="p-2 border border-gray-300">{data.rideTime}</td>
    <td className="p-2 border border-gray-300">{data.toFirst}</td>
  </tr>
);

export default TimingTableRow;