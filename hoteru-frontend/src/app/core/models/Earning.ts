export interface Earning {
  date: any;
  total: number;
}

export interface EarningReport {
  earnings: Earning[];
  total: number;
}
