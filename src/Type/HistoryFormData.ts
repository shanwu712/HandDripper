enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}

export interface HistoryFormData {
  id: string;
  date: string;
  bean: string;
  roaster: string;
  dripper: string;
  grinder: string;
  scale: string;
  hotOrIced: HotOrIced;
  temp: number;
  beanWeight: string;
  waterRatio: string;
  waterWeight: number | null;
  iceRatio?: string;
  iceWeight?: number | null;
  sec: number;
  rating: number | string;
  method: string;
  comment: string;
}
