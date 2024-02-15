 
export interface DropdownModel {
  id: string;
  name: string;
  value: string;
}

export type AgenceMetaData = {
  agencePhone: string;
  agenceAddress: string;
  agenceType: number;
  agenceWillaya: string;
};

export type AgenceLocal = {
  agence_id: number;
  agence_name: string;
  agence_email: string;
  agence_metadata: AgenceMetaData;
  agence_status: number;
};

export interface Annonce {
  agence_id?: number;
  id?: number;
  estate: string;
  type: string;
  price: number;
  piece: string;
  surface: number;
  willaya: string;
  codePostal: string;
  images: string[] | File[];
  details?: AnnonceDetails;
}

export interface AnnonceDetails {
  address?: string;
  juridical?: string;
  description?: string;
  publicService?: DropdownModel[];
  publicUtility?: DropdownModel[];
  hygiene?: DropdownModel[];
  cadreSituation?: DropdownModel[];
  airContioning?: string;
  heating?: string;
  city?: string;
  kitchen?: string;
  facade?: number;
  stateProperty?: string;
  furnished?: string;
  negotiable?: string;
}
