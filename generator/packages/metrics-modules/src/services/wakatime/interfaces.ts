export interface WakatimeLanguageMetadata {
  id: string;
  name: string;
  color: string;
}

export interface WakatimeLanguages {
  name: string;
  totalSeconds: number;
  percent: number;
  text: string;
  hours: number;
  minutes: number;
  metadata?: WakatimeLanguageMetadata;
}

export interface WakatimeEditor {
  totalSeconds: number;
  name: string;
  percent: number;
  text: string;
  hours: number;
  minutes: number;
}

export interface WakatimeStats {
  status: string;
  totalText: string;
  avarengeText: string;
  totalInSeconds: number;
  editors: WakatimeEditor[];
  languages: WakatimeLanguages[];
}

export interface WakatimeAllTimeMetrics {
  totalSeconds: number;
  text: string;
}
