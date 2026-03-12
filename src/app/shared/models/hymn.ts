export interface HymnLanguage {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  hymns_count?: number;
  hymns?: Hymn[];
}

export interface Hymn {
  id: number;
  hymn_number: number;
  title: string;
  author?: string;
  lyrics: string;
  language?: HymnLanguage;
  is_favorite?: boolean;
}
