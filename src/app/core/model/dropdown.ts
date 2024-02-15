export type DropdownItem = {
  id: string;
  name: string;
};

export type Dropdown = {
  label: string;
  label_form: string;
  label_upper: string;
  label_upper_choice: string;
  isOpen: boolean;
  items: DropdownItem[];
};

export const dropdowns: Dropdown[] = [
  {
    label: 'Public Service',
    label_form: 'publicService',
    label_upper: 'PUBLIC_SERVICE',
    label_upper_choice: 'PUBLIC_SERVICE_CHOICE.',
    isOpen: false,
    items: [
      { id: '1', name: 'Elevator' },
      { id: '2', name: 'Interphone' },
      { id: '3', name: 'Puce Port' },
      { id: '4', name: 'Gardien' },
      { id: '5', name: 'Parking' },
      { id: '6', name: 'Internet' },
      { id: '7', name: 'Parabole Collectif' },
    ],
  },
  {
    label: 'Public Utility',
    label_form: 'publicUtility',
    label_upper: 'PUBLIC_UTILITY',
    label_upper_choice: 'PUBLIC_UTILITY_CHOICE.',
    isOpen: false,
    items: [
      { id: '1', name: 'Public Garden' },
      { id: '2', name: 'Courthouse' },
      { id: '3', name: 'Elementary school' },
      { id: '4', name: 'Secondary School' },
      { id: '5', name: 'High school' },
      { id: '6', name: 'Bank' },
      { id: '7', name: 'Mosque' },
      { id: '8', name: 'University' },
      { id: '9', name: 'Transport' },
      { id: '10', name: 'Hospital' },
      { id: '11', name: 'Clinic' },
      { id: '12', name: 'Shops' },
    ],
  },
  {
    label: 'Hygiene',
    label_form: 'hygiene',
    label_upper: 'HYGIENE',
    label_upper_choice: 'HYGIENE_CHOICE.',
    isOpen: false,
    items: [
      { id: '1', name: "Water Tank" },
      { id: '2', name: 'Water Pump' },
      { id: '3', name: 'Separate Toilets' },
      { id: '4', name: 'Non Separate Toilet' },
      { id: '5', name: 'Bathroom' },
      { id: '6', name: 'Water Heater' },
    ],
  },
  {
    label: 'Cadre et situation',
    label_form: 'cadreSituation',
    label_upper: 'SETTING_LOCATION',
    label_upper_choice: 'SETTING_LOCATION_CHOICE.',
    isOpen: false,
    items: [
      { id: '1', name: 'Calme' },
      { id: '2', name: 'jardin' },
    ],
  },
];
