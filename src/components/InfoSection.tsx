const mockData = [
  {
    phase: "1 🔴",
    km: 39.8,
    name: "RED",
    hr: 64,
    recTime: "15:00",
    presentations: 2,
    holdTime: "00:40:00",
    maxRideTime: "03:58:47",
    closing: "10:28:47",
  },
  {
    phase: "2 🟢",
    km: 35.7,
    name: "GREEN",
    hr: 64,
    recTime: "15:00",
    presentations: 2,
    holdTime: "00:40:00",
    maxRideTime: "07:32:59",
    closing: "14:42:59",
  },
  {
    phase: "3 ⚪",
    km: 24.6,
    name: "WHITE",
    hr: 64,
    recTime: "20:00",
    presentations: 1,
    holdTime: "-",
    maxRideTime: "10:00:35",
    closing: "17:50:35",
  },
];

function InfoSection() {
  const totalKm = mockData.reduce((sum, item) => sum + item.km, 0);

  return (
    <div className="text-center m-6">
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Phase</th>
              <th className="border px-3 py-2">Km</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">H.R.</th>
              <th className="border px-3 py-2">Rec Time</th>
              <th className="border px-3 py-2">Presentations</th>
              <th className="border px-3 py-2">Hold Time</th>
              <th className="border px-3 py-2">Max Ride Time</th>
              <th className="border px-3 py-2">Closing</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-3 py-2">{row.phase}</td>
                <td className="border px-3 py-2">{row.km}</td>
                <td className="border px-3 py-2">{row.name}</td>
                <td className="border px-3 py-2">{row.hr}</td>
                <td className="border px-3 py-2">{row.recTime}</td>
                <td className="border px-3 py-2">{row.presentations}</td>
                <td className="border px-3 py-2">{row.holdTime}</td>
                <td className="border px-3 py-2">{row.maxRideTime}</td>
                <td className="border px-3 py-2">{row.closing}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="border px-3 py-2 text-right">Total</td>
              <td className="border px-3 py-2">{totalKm.toFixed(1)}</td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2"></td>
              <td className="border px-3 py-2">10:00:35</td>
              <td className="border px-3 py-2"></td>
            </tr>
          </tbody>
        </table>

        <p className="mt-2 text-xs text-gray-600 italic text-left">
          Entry Fee: €180.00; Weight: 60 kg; Final: Arrival; Min Ride Speed: 10
          km/h;
        </p>
      </div>
    </div>
  );
}

export default InfoSection;
