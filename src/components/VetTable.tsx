import VetTableRow from "./VetTableRow";
import { mockVetData } from "./mockData";

const VetTable = () => (
    <table className="min-w-full border border-gray-300 rounded-md text-sm">
        <thead className="bg-gray-100 text-black">
            <tr>
                <th className="p-2 border border-gray-300">Phase</th>
                <th className="p-2 border border-gray-300">Rec Time</th>
                <th className="p-2 border border-gray-300">Heart Rate</th>
                <th className="p-2 border border-gray-300">
                    Mucous Membranes
                </th>
                <th className="p-2 border border-gray-300">Capillary Refill</th>
                <th className="p-2 border border-gray-300">Skin Turgor</th>
                <th className="p-2 border border-gray-300">Gut Sounds</th>
                <th className="p-2 border border-gray-300">Girth Back Withers</th>
                <th className="p-2 border border-gray-300">muscleTone</th>
                <th className="p-2 border border-gray-300">Gait</th>
                <th className="p-2 border border-gray-300">Vet</th>

            </tr>
        </thead>
        <tbody>
            {mockVetData.map((row, idx) =>

                <VetTableRow key={idx} row={row} />
            )}
        </tbody>
    </table>
);


export default VetTable;