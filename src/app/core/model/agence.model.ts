export interface Agence {
  agenceID?: number;
  agenceName: string;
  agenceEmail: string;
  agenceDetails: AgenceDetails;
}

export interface AgenceDetails {
  agencePhone: string;
  agenceType: number;
  agenceWillaya: string;
  agenceAddress: string;
  agencePageUrl?: string;
  agenceLink?: string;
  agenceImg?: string;
}
