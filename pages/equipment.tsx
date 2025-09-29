import EquipmentGrid from 'views/EquipmentPage/EquipmentGrid';
import { equipmentItems } from 'data/equipment';

export default function EquipmentPage() {
  return <EquipmentGrid items={equipmentItems} />;
}