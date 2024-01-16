export type DropdownItem = {
  id: number;
  name: string;
};

export type Dropdown = {
  label: string;
  label_form: string;
  label_upper: string;
  isOpen: boolean;
  items: DropdownItem[];
};

export const dropdowns: Dropdown[] = [
  {
    label: 'Public Service',
    label_form: 'publicService',
    label_upper: 'PUBLIC_SERVICE',
    isOpen: false,
    items: [
      { id: 1, name: 'Ascenseur' },
      { id: 2, name: 'Interphone' },
      { id: 3, name: 'Puce Port' },
      { id: 4, name: 'Gardien' },
      { id: 5, name: 'Parking' },
      { id: 6, name: 'Internet' },
      { id: 7, name: 'Parabole Collectif' },
    ],
  },
  {
    label: 'Public Utility',
    label_form: 'publicUtility',
    label_upper: 'PUBLIC_UTILITY',
    isOpen: false,
    items: [
      { id: 1, name: 'Jardin Public' },
      { id: 2, name: 'Tribunal' },
      { id: 3, name: 'École Primaire' },
      { id: 4, name: 'École secondaire' },
      { id: 5, name: 'Lycée' },
      { id: 6, name: 'Banque' },
      { id: 7, name: 'Mosquée' },
      { id: 8, name: 'Université' },
      { id: 9, name: 'Transport' },
      { id: 10, name: 'Hospitalier' },
      { id: 11, name: 'Clinique' },
      { id: 12, name: 'Commerces' },
    ],
  },
  {
    label: 'Hygiene',
    label_form: 'hygiene',
    label_upper: 'HYGIENE',
    isOpen: false,
    items: [
      { id: 1, name: "Réservoir D'eau" },
      { id: 2, name: 'Pompe A Eau' },
      { id: 3, name: 'Toilettes Séparées' },
      { id: 4, name: 'Toilettes Non Séparées' },
      { id: 5, name: 'Salle De Bain' },
      { id: 6, name: 'chauffe eau' },
    ],
  },
  {
    label: 'Cadre et situation',
    label_form: 'cadreSituation',
    label_upper: 'SETTING_LOCATION',
    isOpen: false,
    items: [
      { id: 1, name: 'Calme' },
      { id: 2, name: 'jardin' },
    ],
  },
];
