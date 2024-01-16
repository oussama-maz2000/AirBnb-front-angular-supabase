export interface AnnounceImmo {
  prpType: string;
  annType: string;
  jrcType: string;
  etatType: string;
  address: string;
  willaya: string;
  etage?: number;
  facade?: number;
  price?: number;
  surface?: number;
  imagesLink?: string[];
  service?: string[];
  hygiene?: string[];
  piece?: string;
  servicePublic?: string[];
  climatisation?: string;
  chauffage?: string;
  cuisin?: string;
  disponible?: string;
  description?: string;
  meublee?: string;
  avances?: string;
  etatCity?: string;
  negociable?: string;
}
