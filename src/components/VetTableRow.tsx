import { type VetRow } from './mockData';

interface VetTableRowProps {
    row: VetRow;
}

const VetTableRow = ({ row }: VetTableRowProps) => (
    <tr className="hover:bg-gray-50 text-black">
        <td className="p-2 border">{row.phase}</td>
        <td className="p-2 border">{row.recTime}</td>
        <td className="p-2 border">{row.heartRate}</td>
        <td className="p-2 border">{row.mucousMembranes}</td>
        <td className="p-2 border">{row.capillaryRefill}</td>
        <td className="p-2 border">{row.skinTurgor}</td>
        <td className="p-2 border">{row.gutSounds}</td>
        <td className="p-2 border">{row.girthBackWithers}</td>
        <td className="p-2 border">{row.muscleTone}</td>
        <td className="p-2 border">{row.gait}</td>
        <td className="p-2 border">{row.vet}</td>
    </tr>
);

export default VetTableRow;
